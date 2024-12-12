'use client';

// import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

// import Footer from './footer';
// import Header from './header';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  // const pathname = usePathname();
  return (
    <>
      {/* {pathname === '/' && <Header />} */}
      {children}
      {/* {pathname === '/' && <Footer />} */}
    </>
  );
};

export default Layout;
