import image from '@/assets/png/map.png';
import { animated, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { MaximizeIcon, MinusIcon, PlusIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const MapMobile = () => {
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

  useEffect(() => {
    const calculateInitialScale = () => {
      if (containerRef.current && imageRef.current) {
        const container = containerRef.current.getBoundingClientRect();
        const image = imageRef.current.getBoundingClientRect();

        const scaleX = container.width / image.width;
        const scaleY = container.height / image.height;
        const newScale = Math.max(scaleX, scaleY);

        setInitialScale(newScale);
        scaleApi.start({ scale: newScale });
        calculateBounds(newScale);
      }
    };

    const img = imageRef.current;
    if (img && img.complete) {
      calculateInitialScale();
    } else if (img) {
      img.onload = calculateInitialScale;
    }

    window.addEventListener('resize', calculateInitialScale);
    return () => window.removeEventListener('resize', calculateInitialScale);
  }, []);

  const bind = useGesture(
    {
      onDrag: ({ offset: [dx, dy], pinching }) => {
        if (!pinching) {
          api.start({ x: dx, y: dy });
        }
      },
      onPinch: ({ offset: [d] }) => {
        const newScale = Math.min(Math.max(initialScale * 0.8, d), initialScale * 4);
        scaleApi.start({ scale: newScale });
        calculateBounds(newScale);
      },
    },
    {
      drag: {
        from: () => [x.get(), y.get()],
        rubberband: true,
        bounds: bounds,
      },
      pinch: {
        modifierKey: null,
        scaleBounds: { min: initialScale * 0.8, max: initialScale * 4 },
        rubberband: true,
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
    <div ref={containerRef} className='relative h-screen w-full overflow-hidden bg-white'>
      {/* Controls */}
      <div className='absolute right-4 top-4 z-10 flex flex-col gap-2'>
        <button
          onClick={handleZoomIn}
          className='rounded-full bg-white p-2 shadow-lg hover:bg-gray-50'
        >
          <PlusIcon className='h-6 w-6' />
        </button>
        <button
          onClick={handleZoomOut}
          className='rounded-full bg-white p-2 shadow-lg hover:bg-gray-50'
        >
          <MinusIcon className='h-6 w-6' />
        </button>
        <button
          onClick={handleReset}
          className='rounded-full bg-white p-2 shadow-lg hover:bg-gray-50'
        >
          <MaximizeIcon className='h-6 w-6' />
        </button>
      </div>

      {/* Map Container */}
      <div className='h-full w-full touch-none'>
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
          <img
            ref={imageRef}
            src={image.src}
            alt='Map'
            className='h-auto w-full max-w-none object-contain'
            style={{
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
            draggable='false'
          />
        </animated.div>
      </div>
    </div>
  );
};

export default MapMobile;
