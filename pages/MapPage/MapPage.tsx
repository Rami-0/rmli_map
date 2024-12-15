'use client';

import React from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import FixedMap from '@/components/screens/map-screen/Map';
import Map from '@/components/ui/map';
import MapController from '@/components/ui/map-controller/MapController';
import useWindowDimensions from '@/hooks/useDimensions';

const MapPage: React.FC = () => {
  const { width } = useWindowDimensions();

  console.log(width);

  if (width == undefined) return <p>loading</p>;
  return (
    <>
      {width >= 700 ? (
        <TransformWrapper initialScale={1}>
          {utils => (
            <React.Fragment>
              <MapController {...utils} />
              <TransformComponent>
                <Map />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      ) : (
        <FixedMap />
      )}
    </>
  );
};

export default MapPage;
