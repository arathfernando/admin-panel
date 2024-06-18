import { useLayoutEffect, useState } from 'react';

const useMediaQuery = () => {
  const [mediaQueries, setMediaQueries] = useState({
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    xxl: null,
  });

  useLayoutEffect(() => {
    function handleResize() {
      const width = document.documentElement.clientWidth;
      setMediaQueries({
        xs: width < 576,
        sm: width >= 576,
        md: width >= 768,
        lg: width >= 992,
        xl: width >= 1200,
        xxl: width >= 1400,
        xxxl: width >= 1600,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return mediaQueries;
};

export default useMediaQuery;
