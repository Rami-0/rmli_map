'use client';

import frame from '@/assets/png/frame-white-desktop.png';
import frame_mobile from '@/assets/png/frame-white-mobile.png';
import MapPage from '@/pages/map-page';
import Image from 'next/image';
import useWindowDimensions from '@/hooks/useDimensions';

export default function Home() {
  const { width = 1200 } = useWindowDimensions();

  return (
    <main className={'map-container pointer-events-none relative h-screen w-full bg-black'}>
      <div className='relative h-full w-full'>
        {/* Map Container */}
        <div className='pointer-events-auto absolute inset-0 z-0'>
          <MapPage />
        </div>

        {/* Frame Overlay */}
        <div className='pointer-events-none absolute inset-0 z-10'>
          <Image
            src={width < 800 ? frame_mobile : frame}
            alt='frame'
            className='h-full w-full'
            objectFit='contain'
            priority
            sizes='100vw'
          />
        </div>
      </div>
    </main>
  );
}
