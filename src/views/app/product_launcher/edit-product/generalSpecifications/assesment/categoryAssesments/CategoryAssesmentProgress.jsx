import { isNaN } from 'lodash';
import React from 'react';

const CategoryAssesmentProgress = ({ percent }) => {
  return (
    <div className="progress-container">
      <div
        className="completed"
        style={{ width: `${percent > 100 ? 100 : percent || 0}%` }}
      />
      <div
        className="percent"
        style={{ left: `${percent > 100 ? 100 : percent || 0}%` }}
      >
        {isNaN(percent) ? 0 : percent}%
      </div>
    </div>
  );
};

export default CategoryAssesmentProgress;
