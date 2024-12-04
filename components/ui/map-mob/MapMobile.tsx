import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import MAP_IMG from '../../../assets/png/map.png';
import './style.scss';
import PointDialog from '@/components/shared/popup-window';
import ZoomBackSVG from '../../../assets/svg/full.svg';
import ZoomInSVG from '../../../assets/svg/zoomin.svg';
import ZoomOutSVG from '../../../assets/svg/zoomout.svg';

function MapMobile() {
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState({ x: '50%', y: '50%' });
  const [openPopUp, setOpenPopUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialDistance = useRef<number | null>(null);

  const calculateDistance = (touch1: Touch, touch2: Touch) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      initialDistance.current = calculateDistance(e.touches[0], e.touches[1]);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2 && initialDistance.current) {
      const currentDistance = calculateDistance(e.touches[0], e.touches[1]);
      const zoomChange = currentDistance / initialDistance.current;

      setZoom(prevZoom => Math.min(Math.max(prevZoom * zoomChange, 1), 3));
      initialDistance.current = currentDistance;

      const rect = containerRef.current!.getBoundingClientRect();
      const offsetX =
        ((e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left) /
        rect.width;
      const offsetY =
        ((e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top) /
        rect.height;

      setOrigin({ x: `${offsetX * 100}%`, y: `${offsetY * 100}%` });
    }
  };

  const handleTouchEnd = () => {
    initialDistance.current = null;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove);
      container.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  const handleZoomBack = () => {
    setOrigin({ x: '50%', y: '50%' });
    setZoom(1);
  };

  const handleClickPoint = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenPopUp(true);
  };

  return (
    <>
      <nav>
        <div onClick={() => setZoom(prevZoom => Math.min(prevZoom + 0.5, 3))} className="btn">
          <Image src={ZoomInSVG} alt="zoomin" />
        </div>
        <div onClick={() => setZoom(prevZoom => Math.max(prevZoom - 0.5, 1))} className="btn">
          <Image src={ZoomOutSVG} alt="zoomout" />
        </div>
        <div onClick={handleZoomBack} className="btn">
          <Image src={ZoomBackSVG} alt="zoomback" />
        </div>
      </nav>
      <div
        ref={containerRef}
        className="wrapper"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: `${origin.x} ${origin.y}`,
          transition: 'transform 0.3s ease',
          touchAction: 'none',
        }}
      >
        <div>
          <Image src={MAP_IMG} alt="map" />
          <div onClick={handleClickPoint} className="point"></div>
        </div>
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
