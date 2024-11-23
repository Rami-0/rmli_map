"use client";
import React, { useRef, useState, useEffect } from "react";
import Map from "@/components/ui/map";
import useWindowDimensions from "@/hooks/useDimensions";
import MapController from "@/components/ui/map-controller/MapController";

import {
    TransformWrapper,
    TransformComponent,
} from "react-zoom-pan-pinch";
import MapMobile from "@/components/ui/map-mob/MapMobile";



const MapPage: React.FC = () => {
    const { width } = useWindowDimensions();

    console.log(width);


    if (width == undefined) return <p>loading</p>
    return (
        <>
            {
                width >= 700 ?
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
                    :
                    <MapMobile />
            }
        </>

    );
};

export default MapPage;
