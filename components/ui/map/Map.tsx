import React from 'react';
import MAPIMG from "../../../assets/png/map.png";
import Image from "next/image";
import "./styles.scss";
import useWindowDimensions from "../../../hooks/useDimensions"

function Map() {

    const { height } = useWindowDimensions();

    return (
        <div className="map-container"
            style={{
                height: `${height}px`
            }}
        >
            <Image
                src={MAPIMG}
                alt="map"
                className="map-image"
            />
        </div>
    );
}

export default Map;
