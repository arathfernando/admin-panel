import io from 'socket.io-client';

const token = localStorage.getItem('accessToken');

const socket = token
  ? io.connect(process.env.REACT_APP_API_URL?.replace('/v1/api', ''), {
      query: {
        authorization: `Bearer ${token || ''}`,
      },
      secure: true,
      timeout: 10000,
    })
  : io.connect();

const useSocket = () => {
  return socket;
};

socket.on('connect', (data) => console.log('socket-connect', data));
socket.on('disconnect', (data) => console.log('socket-disconnect', data));

export default useSocket;
