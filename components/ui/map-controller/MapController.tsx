import React from 'react';
import ZoomInSVG from "../../../assets/svg/zoomin.svg";
import ZoomOutSVG from "../../../assets/svg/zoomout.svg";
import ZoomBackSVG from "../../../assets/svg/full.svg";
import Image from 'next/image';

interface MapControllerProps {
    zoomIn: () => void;
    zoomOut: () => void;
    resetTransform: () => void;
}

function MapController({ zoomIn, zoomOut, resetTransform }: MapControllerProps) {
    return (
        <div className='fixed z-10 top-10 left-10 flex flex-col gap-5'>
            <button
                onClick={() => zoomIn()}
                className='bg-bone text-black p-3 rounded-full border-2 border-black hover:bg-bone-dark hover:bg-gray-200 hover:scale-105 transition-all duration-200'
            >
                <Image src={ZoomInSVG} alt='zoomin' width={24} height={24} />
            </button>
            <button
                onClick={() => zoomOut()}
                className='bg-bone text-black p-3 rounded-full border-2 border-black hover:bg-bone-dark hover:bg-gray-200 hover:scale-105 transition-all duration-200'
            >
                <Image src={ZoomOutSVG} alt='zoomout' width={24} height={24} />
            </button>
            <button
                onClick={() => resetTransform()}
                className='bg-bone text-black p-3 rounded-full border-2 border-black hover:bg-gray-200 hover:text-white hover:scale-105 transition-all duration-200'
            >
                <Image src={ZoomBackSVG} alt='reset' width={24} height={24} />
            </button>
        </div>
    );
}

export default MapController;
