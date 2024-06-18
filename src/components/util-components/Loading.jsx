import React from 'react';
import useTranslation from '../../helpers/useTranslation';

const Loading = ({ size = '5%', loading, className, ...props }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`hbs-loading${loading ? ' is-loading' : ''}${
        className ? ` ${className}` : ''
      }`}
      {...props}
    >
      <img
        src="/assets/img/icons/loading-spinner.png"
        className="hbs-loading-spinner"
        alt={t('Loading...')}
        style={{ width: size, height: 'auto' }}
        {...props}
      />
    </div>
  );
};

export default Loading;
