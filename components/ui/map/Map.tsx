import React from 'react';
import MAPIMG from "../../../assets/png/map.png";
import Image from "next/image";
import "./styles.scss";
import useWindowDimensions from "../../../hooks/useDimensions";

function Map() {
    const { height, width } = useWindowDimensions(); // Get both width and height

    return (
        <div className="map-container"
            style={{
                height: `${height}px`,  // Set height dynamically based on viewport
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
