import Image from 'next/image';
import React from 'react';
import ZoomBackSVG from '../../../assets/svg/full.svg';
import ZoomInSVG from '../../../assets/svg/zoomin.svg';
import ZoomOutSVG from '../../../assets/svg/zoomout.svg';

interface MapControllerProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
}

function MapController({ zoomIn, zoomOut, resetTransform }: MapControllerProps) {
  return (
    <div className='fixed right-6 top-6 z-10 flex flex-col gap-5 md:right-12 md:top-12'>
      <button
        onClick={() => zoomIn()}
        className='bg-bone rounded-full border-2 border-black p-3 text-black transition-all duration-200 md:hover:scale-105 md:hover:bg-gray-200'
      >
        <Image src={ZoomInSVG} alt='zoomin' width={24} height={24} />
      </button>
      <button
        onClick={() => zoomOut()}
        className='bg-bone rounded-full border-2 border-black p-3 text-black transition-all duration-200 md:hover:scale-105 md:hover:bg-gray-200'
      >
        <Image src={ZoomOutSVG} alt='zoomout' width={24} height={24} />
      </button>
      <button
        onClick={() => resetTransform()}
        className='bg-bone rounded-full border-2 border-black p-3 text-black transition-all duration-200 md:hover:scale-105 md:hover:bg-gray-200'
      >
        <Image src={ZoomBackSVG} alt='reset' width={24} height={24} />
      </button>
    </div>
  );
}

export default MapController;
