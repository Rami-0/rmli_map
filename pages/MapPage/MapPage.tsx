"use client";
import React, { useRef, useState, useEffect } from "react";
import Map from "@/components/ui/map";
import useWindowDimensions from "@/hooks/useDimensions";
import MapController from "@/components/ui/map-controller/MapController";

import {
    TransformWrapper,
    TransformComponent,
    ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";



const MapPage: React.FC = () => {
    const { width } = useWindowDimensions();

    return (

        <TransformWrapper
            initialScale={1}
        >
            {(utils) => (
                <React.Fragment>
                    <MapController {...utils} />
                    <TransformComponent>
                        <Map />
                    </TransformComponent>
                </React.Fragment>
            )}
        </TransformWrapper>



    );
};

export default MapPage;
