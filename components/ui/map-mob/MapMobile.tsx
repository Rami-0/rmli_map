import React, { useCallback, useRef, useState } from 'react'
import MAP_IMG from "../../../assets/png/map.png";
import Image from 'next/image';
import "./style.scss";
import ZoomInSVG from "../../../assets/svg/zoomin.svg";
import ZoomOutSVG from "../../../assets/svg/zoomout.svg";
import ZoomBackSVG from "../../../assets/svg/full.svg";


function MapMobile() {

    const [zoom, setZoom] = useState(1);
    const [origin, setOrigin] = useState({ x: '50%', y: '50%' });

    const handleZoomIn = (e: any) => {
        // Вычисление позиции клика относительно элемента
        const rect = e.target.getBoundingClientRect();
        const offsetX = ((e.clientX - rect.left) / rect.width) * 100;
        const offsetY = ((e.clientY - rect.top) / rect.height) * 100;

        setOrigin({ x: `${offsetX}%`, y: `${offsetY}%` });
        setZoom((prevZoom) => Math.min(prevZoom + 0.5, 3)); // Увеличение с лимитом до 3x
    };

    const handleZoomOut = () => {
        setZoom((prevZoom) => Math.max(prevZoom - 0.5, 1)); // Уменьшение с лимитом до 1x
    };

    const handleZoomBack = () => {
        setOrigin({ x: "50%", y: "50%" })
        setZoom(1);
    }



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
            <div className='wrapper'
                onClick={(e) => handleZoomIn(e)}
                style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: `${origin.x} ${origin.y}`,
                    transition: 'transform 0.3s ease',
                    cursor: 'zoom-in',
                }}
            >

                <div>
                    <Image src={MAP_IMG} alt='map' />
                </div>
            </div>
        </>


    )
}

export default MapMobile