import { Divider } from 'antd';
import React from 'react';

const AboutGig = ({ about }) => {
  return (
    <div>
      <h3 className="h3-md mb-4 text-black">About this gig</h3>
      <p className="p-sm">{about}</p>

      <Divider className="pb-2" />
    </div>
  );
};

export default AboutGig;
