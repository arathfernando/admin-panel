import { useEffect } from 'react';
import useSocket from './hooks/useSocket';

const Middlwware = () => {
  const socket = useSocket();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket-connected');
    });
    socket.on('disconnect', () => {
      console.log('socket-dis-connected');
    });
    return () => {
      console.log('socket-dis-connected');
    };
  }, []);

  return null;
};

export default Middlwware;
