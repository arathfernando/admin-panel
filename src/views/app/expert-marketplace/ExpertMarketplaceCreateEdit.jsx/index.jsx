/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import { Affix, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Steper from '../../../../components/util-components/Steper';
import FAQ from './FAQ';
import Gallery from './Gallery';
import Overview from './Overview';
import Pricing from './Pricing';

const items = [
  {
    title: 'Overview',
    key: 'overview',
  },
  {
    title: 'Pricing',
    key: 'pricing',
  },
  {
    title: 'FAQ',
    key: 'faq',
  },
  {
    title: 'Gallery',
    key: 'gallery',
  },
];

const ExpertiseCreateEdit = ({ open, onClose, data = {} }) => {
  const [currentKey, setCurrentKey] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (open) {
      setCurrentKey('overview');
    } else {
      setCurrentKey('');
    }
  }, [open]);

  const ExpertiseHeader = () => (
    <Affix offsetTop={1} style={{ background: 'white' }}>
      <div>
        <div
          className="d-flex align-items-center justify-content-between px-5 mx-1 pt-4 pt-3"
          style={{ gap: 10, paddingBlock: 14, background: 'white' }}
        >
          <h5 className="h5-sm text-black mb-0">New expertise</h5>
          <img
            src="/assets/img/icons/modal-close.svg"
            alt=""
            style={{ height: 24 }}
            className="cursor-pointer"
            onClick={() => {
              history.replace(`/app/expert-marketplace/expetises`);
              onClose();
            }}
          />
        </div>
        <Divider className="m-0" style={{ borderTop: '1px solid #C4C4C4' }} />

        <div
          className="overflow-auto scrollbar-hidden px-5 px-md-4 bg-white"
          style={{ marginBottom: 32 }}
        >
          <Steper
            style={{ marginTop: 22 }}
            items={items}
            currentKey={currentKey}
            onStepChange={(key) => setCurrentKey(key)}
          />
        </div>
      </div>
    </Affix>
  );

  return (
    <>
      <Overview
        marketplace={data}
        ExpertiseHeader={ExpertiseHeader}
        open={currentKey === 'overview'}
        onNext={() => setCurrentKey('pricing')}
      />
      <Pricing
        packages={data?.packages}
        ExpertiseHeader={ExpertiseHeader}
        open={currentKey === 'pricing'}
        onPrevious={() => setCurrentKey('overview')}
        onNext={() => setCurrentKey('faq')}
      />
      <FAQ
        faqs={data?.faqs}
        ExpertiseHeader={ExpertiseHeader}
        open={currentKey === 'faq'}
        onPrevious={() => setCurrentKey('pricing')}
        onNext={() => setCurrentKey('gallery')}
      />
      <Gallery
        gallery_images={data?.gallery_images}
        ExpertiseHeader={ExpertiseHeader}
        open={currentKey === 'gallery'}
        onPrevious={() => setCurrentKey('faq')}
        onNext={() => {
          history.push(`/app/expert-marketplace/expetises`);
          onClose();
        }}
      />
    </>
  );
};

export default ExpertiseCreateEdit;
