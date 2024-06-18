import { GoogleApiWrapper } from 'google-maps-react';

const WithGoogleMap = (children) => {
  return GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ['places', 'visualization'],
  })(children);
};

export default WithGoogleMap;
