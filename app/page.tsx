'use client';

import frame from '@/assets/png/frame-white-desktop.png';
import frame_mobile from '@/assets/png/frame-white-mobile.png';
import Image from 'next/image';
import useWindowDimensions from '@/hooks/useDimensions';

export default function Home() {
  const { width = 0 } = useWindowDimensions();
  return (
    <main className='h-[100vh] w-full bg-black'>
      {width < 800 ? (
        <Image src={frame_mobile} objectFit='contain' alt='frame' className='h-[100vh] w-full' />
      ) : (
        <Image src={frame} objectFit='contain' alt='frame' className='h-[100vh] w-full' />
      )}
    </main>
  );
}
