/* eslint-disable no-nested-ternary */
import { Steps } from 'antd';
import React, { useMemo } from 'react';

const Steper = ({
  items = [],
  currentKey = '',
  onStepChange = () => console.error('no onStepChange props passed'),
  className,
  restrictPrevSteps = false,
  restrictNextSteps = false,
  ...props
}) => {
  const currentKeyIndex = useMemo(
    () => items?.findIndex(({ key }) => key === currentKey),
    [currentKey, items]
  );

  return (
    <Steps
      size="small"
      className={`steper${className ? ` ${className}` : ''}`}
      current={0}
      labelPlacement="vertical"
      items={items.map(({ title, key, ...rest }, indx) => ({
        title,
        icon: true,
        status:
          indx === currentKeyIndex
            ? 'current'
            : indx <= currentKeyIndex
            ? 'process'
            : 'wait',
        onClick: () => {
          // prev
          if (indx < currentKeyIndex && !restrictPrevSteps) {
            onStepChange(key, rest);
          }
          // next
          else if (indx > currentKeyIndex && !restrictNextSteps) {
            onStepChange(key, rest);
          }
        },
      }))}
      {...props}
    />
  );
};

export default Steper;
