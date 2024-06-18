import React from 'react';
import SingleRating from './SingleRating';

const RatingViewer = ({ ratingCount }) => {
  return (
    <div className="d-flex align-items-center" style={{ gap: 8 }}>
      <SingleRating ratingCount={(ratingCount - 0) * 5} />
      <SingleRating ratingCount={(ratingCount - 1) * 5} />
      <SingleRating ratingCount={(ratingCount - 2) * 5} />
      <SingleRating ratingCount={(ratingCount - 3) * 5} />
      <SingleRating ratingCount={(ratingCount - 4) * 5} />
    </div>
  );
};

export default RatingViewer;
