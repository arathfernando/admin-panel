/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import { Divider } from 'antd';
import React, { useState } from 'react';
import useTranslation from '../../helpers/useTranslation';

const FAQ = ({ faq }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="w-100">
      <div
        className="d-flex justify-content-between cursor-pointer"
        style={{ gap: 10, paddingBottom: 12 }}
        onClick={() => setActive((state) => !state)}
      >
        <h4 className="h4-sm text-black mb-0">{faq.question}</h4>
        <i className={`bx bx-md bx-chevron-${active ? 'down' : 'up'}`} />
      </div>
      <p
        className="p-md mb-0 overflow-hidden"
        style={{
          height: active ? '100%' : 0,
        }}
      >
        {faq.answer}
      </p>
      <Divider className={!active ? 'mt-1' : ''} />
    </div>
  );
};

const FAQs = ({ faq = [], title }) => {
  const { t } = useTranslation();
  return (
    <div className="pb-4 pt-2">
      <h3 className="h3-md text-black mb-4">
        {t(title || 'Frequently Asked Questions')}
      </h3>

      {faq.map((faq) => (
        <FAQ faq={faq} key={faq.id} />
      ))}
    </div>
  );
};

export default FAQs;
