import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import Hammer from 'hammerjs';
import MAP_IMG from '../../../assets/png/map.png';
import './style.scss';
import PointDialog from '@/components/shared/popup-window';
import ZoomBackSVG from '../../../assets/svg/full.svg';
import ZoomInSVG from '../../../assets/svg/zoomin.svg';
import ZoomOutSVG from '../../../assets/svg/zoomout.svg';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

import "./styles.module.css"

function MapMobile() {
  const [zoom, setZoom] = useState(1);
  const [openPopUp, setOpenPopUp] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleClickPoint = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenPopUp(true);
  };


  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.5, 1));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  useEffect(() => {
    const handler = (e: Event) => e.preventDefault()
    document.addEventListener('gesturestart', handler)
    document.addEventListener('gesturechange', handler)
    document.addEventListener('gestureend', handler)
    return () => {
      document.removeEventListener('gesturestart', handler)
      document.removeEventListener('gesturechange', handler)
      document.removeEventListener('gestureend', handler)
    }
  }, [])

  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rotateZ: 0,
  }))
  const ref = React.useRef<HTMLDivElement>(null)

  useGesture(
    {
      // onHover: ({ active, event }) => console.log('hover', event, active),
      // onMove: ({ event }) => console.log('move', event),
      onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
        if (pinching) return cancel()
        api.start({ x, y })
      },
      onPinch: ({ origin: [ox, oy], first, movement: [ms], offset: [s, a], memo }) => {
        if (first) {
          const { width, height, x, y } = ref.current!.getBoundingClientRect()
          const tx = ox - (x + width / 2)
          const ty = oy - (y + height / 2)
          memo = [style.x.get(), style.y.get(), tx, ty]
        }

        const x = memo[0] - (ms - 1) * memo[2]
        const y = memo[1] - (ms - 1) * memo[3]
        api.start({ scale: s, rotateZ: a, x, y })
        return memo
      },
    },
    {
      target: ref,
      drag: { from: () => [style.x.get(), style.y.get()] },
      pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
    }
  )


  return (
    <>
      <nav>
        <div onClick={handleZoomIn} className="btn">
          <Image src={ZoomInSVG} alt="zoomin" />
        </div>
        <div onClick={handleZoomOut} className="btn">
          <Image src={ZoomOutSVG} alt="zoomout" />
        </div>
        <div onClick={handleResetZoom} className="btn">
          <Image src={ZoomBackSVG} alt="zoomback" />
        </div>
      </nav>
      <div
        className="wrapper"
        ref={ref}
      >
        <animated.div
        >
          <Image
            src={MAP_IMG}
            alt="map"
            style={{
              transform: `scale(${zoom})`,
              transition: 'transform 0.3s ease',
              transformOrigin: 'center center'
            }}
          />
          {/* <div onClick={handleClickPoint} className="point"></div> */}
        </animated.div>
      </div>
      <PointDialog
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
        title="Point information"
        description="Some information"
      />
    </>
  );
}

export default MapMobile;