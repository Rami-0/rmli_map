import Image from 'next/image';
import React, { useState } from 'react';
import MAPIMG from '../../../assets/png/map.png';
import './styles.scss';
import PointDialog from '@/components/shared/popup-window';
import useWindowDimensions from '../../../hooks/useDimensions';

function Map() {
  const { height } = useWindowDimensions();
  const [openPopUp, setOpenPopUp] = useState(false);

  const handleClickPoint = (e: any) => {
    e.stopPropagation();
    setOpenPopUp(true);
  };

  return (
    <>
      <div
        className='map-container'
        style={{
          height: `${height}px`,
        }}
      >
        <Image src={MAPIMG} alt='map' className='map-image' />
        <div onClick={handleClickPoint} className='point'></div>
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

export default Map;
