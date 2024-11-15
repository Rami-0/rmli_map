'use client';

import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';
import Footer from './footer';
import Header from './header';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      <Header />
      <main className='w-full bg-[#f8f8f8]'>{children}</main>
      {pathname === '/' && <Footer />}
    </>
  );
};

export default Layout;
