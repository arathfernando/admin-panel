import React, { useMemo } from 'react';
import SingleRating from '../../util-components/SingleRating';

const RatingViwer = ({ rating = {} }) => {
  const oneStarData = useMemo(() => {
    const targetedData = rating?.individual?.find?.(
      (data) => Number(data.over_all_rating) === 1
    );
    const percentage = (targetedData?.total / rating.data?.length) * 100 || 0;
    return {
      reviewer_count: targetedData?.total || 0,
      review_count: targetedData?.over_all_rating || 0,
      percentage: percentage > 100 ? 100 : percentage,
    };
  }, [rating]);

  const twoStarData = useMemo(() => {
    const targetedData = rating?.individual?.find?.(
      (data) => Number(data.over_all_rating) === 2
    );
    const percentage = (targetedData?.total / rating.data?.length) * 100 || 0;
    return {
      reviewer_count: targetedData?.total || 0,
      review_count: targetedData?.over_all_rating || 0,
      percentage: percentage > 100 ? 100 : percentage,
    };
  }, [rating]);

  const threeStarData = useMemo(() => {
    const targetedData = rating?.individual?.find?.(
      (data) => Number(data.over_all_rating) === 3
    );
    const percentage = (targetedData?.total / rating.data?.length) * 100 || 0;
    return {
      reviewer_count: targetedData?.total || 0,
      review_count: targetedData?.over_all_rating || 0,
      percentage: percentage > 100 ? 100 : percentage,
    };
  }, [rating]);

  const fourStarData = useMemo(() => {
    const targetedData = rating?.individual?.find?.(
      (data) => Number(data.over_all_rating) === 4
    );
    const percentage = (targetedData?.total / rating.data?.length) * 100 || 0;
    return {
      reviewer_count: targetedData?.total || 0,
      review_count: targetedData?.over_all_rating || 0,
      percentage: percentage > 100 ? 100 : percentage,
    };
  }, [rating]);

  const fiveStarData = useMemo(() => {
    const targetedData = rating?.individual?.find?.(
      (data) => Number(data.over_all_rating) === 5
    );
    const percentage = (targetedData?.total / rating.data?.length) * 100 || 0;
    return {
      reviewer_count: targetedData?.total || 0,
      review_count: targetedData?.over_all_rating || 0,
      percentage: percentage > 100 ? 100 : percentage,
    };
  }, [rating]);

  return (
    <>
      <div className="d-flex mb-4 pb-2 align-items-center">
        <h4 className="h4-sm mr-2 mb-0 text-black">
          {rating.reviewer_count || 0} Reviews
        </h4>
        <div className="d-flex align-items-center" style={{ gap: 8 }}>
          <SingleRating ratingCount={(rating?.review_count - 0) * 5} />
          <SingleRating ratingCount={(rating?.review_count - 1) * 5} />
          <SingleRating ratingCount={(rating?.review_count - 2) * 5} />
          <SingleRating ratingCount={(rating?.review_count - 3) * 5} />
          <SingleRating ratingCount={(rating?.review_count - 4) * 5} />
        </div>
        <h4 className="h4-sm ml-2 mb-0" style={{ color: '#FFCC21' }}>
          {rating?.review_count}
        </h4>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '65px auto 20px' }}>
        <h6 className="h6-lg text-black mr-3 mb-3">5 stars</h6>
        <div
          className="br-5"
          style={{ background: '#D9D9D9', height: 6, marginTop: 6 }}
        >
          <div
            className="br-5"
            style={{
              background: '#FFCC21',
              height: 6,
              width: `${fiveStarData?.percentage}%`,
            }}
          />
        </div>
        <h6 className="h6-lg hb-text-primary ml-2 mb-3">
          {fiveStarData?.reviewer_count
            ? `(${fiveStarData?.reviewer_count})`
            : ''}
        </h6>

        <h6 className="h6-lg text-black mr-3 mb-3">4 stars</h6>
        <div
          className="br-5"
          style={{ background: '#D9D9D9', height: 6, marginTop: 6 }}
        >
          <div
            className="br-5"
            style={{
              background: '#FFCC21',
              height: 6,
              width: `${fourStarData?.percentage}%`,
            }}
          />
        </div>
        <h6 className="h6-lg hb-text-primary ml-2 mb-3">
          {fourStarData?.reviewer_count
            ? `(${fourStarData?.reviewer_count})`
            : ''}
        </h6>

        <h6 className="h6-lg text-black mr-3 mb-3">3 stars</h6>
        <div
          className="br-5"
          style={{ background: '#D9D9D9', height: 6, marginTop: 6 }}
        >
          <div
            className="br-5"
            style={{
              background: '#FFCC21',
              height: 6,
              width: `${threeStarData?.percentage}%`,
            }}
          />
        </div>
        <h6 className="h6-lg hb-text-primary ml-2 mb-3">
          {threeStarData?.reviewer_count
            ? `(${threeStarData?.reviewer_count})`
            : ''}
        </h6>

        <h6 className="h6-lg text-black mr-3 mb-3">2 stars</h6>
        <div
          className="br-5"
          style={{ background: '#D9D9D9', height: 6, marginTop: 6 }}
        >
          <div
            className="br-5"
            style={{
              background: '#FFCC21',
              height: 6,
              width: `${twoStarData?.percentage}%`,
            }}
          />
        </div>
        <h6 className="h6-lg hb-text-primary ml-2 mb-3">
          {twoStarData?.reviewer_count
            ? `(${twoStarData?.reviewer_count})`
            : ''}
        </h6>

        <h6 className="h6-lg text-black mr-3 mb-3">1 stars</h6>
        <div
          className="br-5"
          style={{ background: '#D9D9D9', height: 6, marginTop: 6 }}
        >
          <div
            className="br-5"
            style={{
              background: '#FFCC21',
              height: 6,
              width: `${oneStarData?.percentage}%`,
            }}
          />
        </div>
        <h6 className="h6-lg hb-text-primary ml-2 mb-3">
          {oneStarData?.reviewer_count
            ? `(${oneStarData?.reviewer_count})`
            : ''}
        </h6>
      </div>
    </>
  );
};

export default RatingViwer;
