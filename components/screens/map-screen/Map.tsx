import image from '@/assets/png/map.png';
import { animated, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import React, { useEffect, useRef, useState } from 'react';
import MapController from '../../ui/map-controller/MapController';

const FixedMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [initialScale, setInitialScale] = useState(1);
  const [bounds, setBounds] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  const [{ scale }, scaleApi] = useSpring(() => ({
    scale: 1,
    config: { mass: 1, tension: 350, friction: 30 },
  }));

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1, tension: 350, friction: 30 },
  }));

  const calculateBounds = (currentScale: number) => {
    if (containerRef.current && imageRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const image = imageRef.current.getBoundingClientRect();

      // Calculate the scaled dimensions
      const scaledWidth = image.width * (currentScale / initialScale);
      const scaledHeight = image.height * (currentScale / initialScale);

      // Calculate maximum allowed movement in each direction
      const horizontalBound = Math.max(0, (scaledWidth - container.width) / 2);
      const verticalBound = Math.max(0, (scaledHeight - container.height) / 2);

      setBounds({
        left: -horizontalBound,
        right: horizontalBound,
        top: -verticalBound,
        bottom: verticalBound,
      });
    }
  };

  const zoomToPoint = (clientX: number, clientY: number, newScale: number) => {
    if (containerRef.current && imageRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const currentScale = scale.get();

      // Get the relative position within the container
      const relativeX = clientX - container.left;
      const relativeY = clientY - container.top;

      // Calculate the current center point
      const centerX = container.width / 2;
      const centerY = container.height / 2;

      // Calculate the distance from the click to the center
      const distanceX = relativeX - centerX;
      const distanceY = relativeY - centerY;

      // Calculate new position based on scale change
      const scaleFactor = newScale / currentScale;
      const newX = x.get() - distanceX * (scaleFactor - 1);
      const newY = y.get() - distanceY * (scaleFactor - 1);

      // Apply new scale and position
      scaleApi.start({ scale: newScale });
      api.start({ x: newX, y: newY });
      calculateBounds(newScale);
    }
  };

  const ensureVisibility = () => {
    const currentX = x.get();
    const currentY = y.get();
    const { left, right, top, bottom } = bounds;

    const boundedX = Math.max(left, Math.min(right, currentX));
    const boundedY = Math.max(top, Math.min(bottom, currentY));

    if (boundedX !== currentX || boundedY !== currentY) {
      api.start({ x: boundedX, y: boundedY });
    }
  };

  useEffect(() => {
    const calculateInitialScale = () => {
      if (containerRef.current && imageRef.current) {
        const container = containerRef.current.getBoundingClientRect();
        const image = imageRef.current.getBoundingClientRect();

        const scaleX = container.width / image.width;
        const scaleY = container.height / image.height;
        const newScale = Math.max(scaleX, scaleY);

        setInitialScale(newScale);
        scaleApi.start({ scale: newScale, immediate: true });
        calculateBounds(newScale);
      }
    };

    const img = imageRef.current;
    if (img && img.complete) {
      calculateInitialScale();
    } else if (img) {
      img.onload = calculateInitialScale;
    }

    // Prevent default touchpad gestures at the document level
    const preventDefaultGesture = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDefaultGesture, { passive: false });
    window.addEventListener('resize', calculateInitialScale);

    return () => {
      document.removeEventListener('touchmove', preventDefaultGesture);
      window.removeEventListener('resize', calculateInitialScale);
    };
  }, []);

  const bind = useGesture(
    {
      onDrag: ({ offset: [dx, dy], pinching }) => {
        if (!pinching) {
          const { left, right, top, bottom } = bounds;
          const boundedX = Math.max(left, Math.min(right, dx));
          const boundedY = Math.max(top, Math.min(bottom, dy));
          api.start({ x: boundedX, y: boundedY });
        }
      },
      onDragEnd: () => {
        ensureVisibility();
      },
      onPinch: ({ offset: [d], origin: [ox, oy], first }) => {
        console.log('pinch');
        const newScale = Math.min(Math.max(initialScale * 0.8, d), initialScale * 4);

        if (first) {
          zoomToPoint(ox, oy, newScale);
        } else {
          scaleApi.start({ scale: newScale });
          calculateBounds(newScale);
        }
      },
      onPinchEnd: () => {
        console.log('pinch end');
        // make sure that the image is visible within the container
        ensureVisibility();
      },
      onWheelEnd: () => {
        console.log('wheel end');
        // make sure that the image is visible within the container
        ensureVisibility();
      },
      onWheel: ({ event, delta: [, dy], ctrlKey }) => {
        event.preventDefault();

        console.log('wheel');

        // Handle touchpad pinch-to-zoom
        if (ctrlKey) {
          const currentScale = scale.get();
          const zoomFactor = -dy * 0.01;
          const newScale = Math.min(
            Math.max(currentScale * (1 + zoomFactor), initialScale * 0.8),
            initialScale * 4,
          );
          zoomToPoint(event.pageX, event.pageY, newScale);
        }
        // Handle regular mouse wheel/touchpad scroll
        else {
          const currentScale = scale.get();
          const zoomFactor = -dy * 0.002;
          const newScale = Math.min(
            Math.max(currentScale * (1 + zoomFactor), initialScale * 0.8),
            initialScale * 4,
          );
          zoomToPoint(event.pageX, event.pageY, newScale);
        }
      },
      onDoubleClick: ({ event }) => {
        event.preventDefault();
        console.log('double click');
        const currentScale = scale.get();
        const newScale = currentScale < initialScale * 2 ? initialScale * 2 : initialScale;
        zoomToPoint(event.clientX, event.clientY, newScale);
      },
    },
    {
      drag: {
        from: () => [x.get(), y.get()],
        rubberband: true,
        bounds,
        filterTaps: true,
        preventDefault: true,
      },
      pinch: {
        modifierKey: null,
        scaleBounds: { min: initialScale * 0.8, max: initialScale * 4 },
        rubberband: true,
        eventOptions: { passive: false },
        preventDefault: true,
      },
      wheel: {
        preventDefault: true,
        eventOptions: { passive: false },
      },
    },
  );

  const handleZoomIn = () => {
    const newScale = Math.min(scale.get() + initialScale * 0.5, initialScale * 4);
    scaleApi.start({ scale: newScale });
    calculateBounds(newScale);
  };

  const handleZoomOut = () => {
    const newScale = Math.max(scale.get() - initialScale * 0.5, initialScale * 0.8);
    scaleApi.start({ scale: newScale });
    calculateBounds(newScale);
  };

  const handleReset = () => {
    scaleApi.start({ scale: initialScale });
    api.start({ x: 0, y: 0 });
    calculateBounds(initialScale);
  };

  return (
    <div
      ref={containerRef}
      className='relative h-screen w-full overflow-hidden bg-white'
      style={{ touchAction: 'none' }}
    >
      <MapController zoomIn={handleZoomIn} zoomOut={handleZoomOut} resetTransform={handleReset} />

      {/* Map Container */}
      <div className='z-0 h-full w-full touch-none select-none'>
        <animated.div
          {...bind()}
          style={{
            x,
            y,
            scale,
            touchAction: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            transform: 'translate3d(0px, 0px, 0px)',
          }}
        >
          <div className='relative'>
            <img
              ref={imageRef}
              src={image.src}
              alt='Map'
              className='h-auto w-full max-w-none select-none object-contain'
              style={{
                transformOrigin: 'center center',
                willChange: 'transform',
              }}
              draggable='false'
            />
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export default FixedMap;
