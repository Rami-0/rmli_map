'use client';

import React, { useEffect, useRef, useState } from 'react';
import Map from '@/components/ui/map';
import useWindowDimensions from '@/hooks/useDimensions';

const MapPage: React.FC = () => {
  const { width } = useWindowDimensions();
  const containerRef = useRef<HTMLDivElement>(null);

  const initialMaps = Array(5)
    .fill(null)
    .map((_, index) => <Map key={`map-${index}`} />);

  const [maps, setMaps] = useState<Array<JSX.Element>>([...initialMaps]);

  const handleInfiniteScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const containerWidth = container.offsetWidth;

    if (scrollLeft < 100) {
      setMaps(prev => {
        const newMaps = Array(3)
          .fill(null)
          .map((_, idx) => <Map key={`left-${Date.now() + idx}`} />);
        return [...newMaps, ...prev];
      });
      container.scrollLeft += 300;
    }

    if (scrollLeft + containerWidth >= scrollWidth - 100) {
      setMaps(prev => {
        const newMaps = Array(3)
          .fill(null)
          .map((_, idx) => <Map key={`right-${Date.now() + idx}`} />);
        return [...prev, ...newMaps];
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleInfiniteScroll);
    return () => {
      container.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        width: `${width}px`,
        whiteSpace: 'nowrap',
        scrollBehavior: 'smooth',
      }}
    >
      {maps}
    </section>
  );
};

export default MapPage;
