import { useRef } from 'react';

const useDebounce = () => {
  const timeout = useRef(null);

  return (callback, awaitTime) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      callback();
    }, awaitTime);
  };
};

export default useDebounce;
