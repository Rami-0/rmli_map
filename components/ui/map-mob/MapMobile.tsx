import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import Hammer from 'hammerjs';
import MAP_IMG from '../../../assets/png/map.png';
import './style.scss';
import PointDialog from '@/components/shared/popup-window';
import ZoomBackSVG from '../../../assets/svg/full.svg';
import ZoomInSVG from '../../../assets/svg/zoomin.svg';
import ZoomOutSVG from '../../../assets/svg/zoomout.svg';

function MapMobile() {
  const [zoom, setZoom] = useState(1);
  const [openPopUp, setOpenPopUp] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleClickPoint = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenPopUp(true);
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const image = imageRef.current;

    if (wrapper && image) {
      const hammer = new Hammer(wrapper);

      // Настройка жестов
      hammer.get('pinch').set({ enable: true });
      hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
      hammer.get('doubletap').set({ enable: true });

      let initialScale = 1;
      let currentScale = 1;

      // Пинч-зум
      hammer.on('pinchstart', () => {
        initialScale = currentScale;
      });

      hammer.on('pinch', (e) => {
        currentScale = Math.max(1, Math.min(initialScale * e.scale, 3));
        setZoom(currentScale);
      });

      // Двойной клик
      hammer.on('doubletap', () => {
        setZoom(prevZoom => prevZoom === 1 ? 2 : 1);
      });
    }
  }, []);

  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.5, 1));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

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
        ref={wrapperRef}
        className="wrapper"
      >
        <div>
          <Image
            ref={imageRef}
            src={MAP_IMG}
            alt="map"
            style={{
              transform: `scale(${zoom})`,
              transition: 'transform 0.3s ease',
              transformOrigin: 'center center'
            }}
          />
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