import { Radio } from 'antd';
import React from 'react';

const Rating = ({ ...props }) => {
  return (
    <Radio.Group className="rating" {...props}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Radio value={value} key={value}>
          <img
            src={
              props.value + 1 > value
                ? '/assets/img/icons/rating-star-filled.svg'
                : '/assets/img/icons/rating-star.svg'
            }
            alt=""
            style={{ height: 20, width: 20 }}
          />
        </Radio>
      ))}
    </Radio.Group>
  );
};

export default Rating;
