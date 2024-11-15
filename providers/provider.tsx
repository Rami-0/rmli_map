'use client';

import { FC, Fragment, PropsWithChildren } from 'react';

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export default Provider;
