import Image from 'next/image';
import React, { useState } from 'react';
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

  const handleZoomIn = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const offsetX = ((e.clientX - rect.left) / rect.width) * 100;
    const offsetY = ((e.clientY - rect.top) / rect.height) * 100;

    setOrigin({ x: `${offsetX}%`, y: `${offsetY}%` });
    setZoom(prevZoom => Math.min(prevZoom + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.5, 1));
  };

  const handleZoomBack = () => {
    setOrigin({ x: '50%', y: '50%' });
    setZoom(1);
  };

  const handleClickPoint = (e: any) => {
    e.stopPropagation();
    setOpenPopUp(true);
  };

  return (
    <>
      <nav>
        <div onClick={handleZoomIn} className='btn'>
          <Image src={ZoomInSVG} alt='zoomin' />
        </div>
        <div onClick={handleZoomOut} className='btn'>
          <Image src={ZoomOutSVG} alt='zoomin' />
        </div>
        <div onClick={handleZoomBack} className='btn'>
          <Image src={ZoomBackSVG} alt='zoomin' />
        </div>
      </nav>
      <div
        className='wrapper'
        onClick={e => handleZoomIn(e)}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: `${origin.x} ${origin.y}`,
          transition: 'transform 0.3s ease',
          cursor: 'zoom-in',
        }}
      >
        <div>
          <Image src={MAP_IMG} alt='map' />
          <div onClick={handleClickPoint} className='point'></div>
        </div>
      </div>
      <PointDialog
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
        title='Point information'
        description='Some information '
      />
    </>
  );
}

export default MapMobile;
