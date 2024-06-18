import React from 'react';
import Education from './Education';
import GeneralProfile from './GeneralProfile';
import SDGGoals from './SDGGoals';
import SocialMedia from './SocialMedia';
import WorkExperience from './WorkExperience';

const basicinfo = () => {
  return (
    <div className="d-flex flex-column" style={{ gap: 21 }}>
      <GeneralProfile />
      <WorkExperience />
      <Education />
      <SocialMedia />
      <SDGGoals />
    </div>
  );
};

export default basicinfo;
