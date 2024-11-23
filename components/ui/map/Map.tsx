import React, { useState } from 'react';
import MAPIMG from "../../../assets/png/map.png";
import Image from "next/image";
import "./styles.scss";
import useWindowDimensions from "../../../hooks/useDimensions";
import PointDialog from '@/components/shared/popup-window';

function Map() {
    const { height, width } = useWindowDimensions(); 
    const [openPopUp, setOpenPopUp] = useState(false);


    const handleClickPoint = (e: any) => {
        e.stopPropagation();
        setOpenPopUp(true);
    };

    return (
        <>
            <div className="map-container"
                style={{
                    height: `${height}px`,
                }}
            >
                <Image
                    src={MAPIMG}
                    alt="map"
                    className="map-image"
                />
                <div onClick={handleClickPoint} className='point'>
                </div>
            </div>

            <PointDialog
                open={openPopUp}
                onClose={() => setOpenPopUp(false)}
                title="Point information"
                description="Some information "
            />
        </>
    );
}

export default Map;
