/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Divider, Drawer } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FAQs from '../../../../../components/common/FAQ';
import Reviews from '../../../../../components/common/Reviews';
import Loading from '../../../../../components/util-components/Loading';
import { rolesObj } from '../../../../../constants/commonData';
import useTranslation from '../../../../../helpers/useTranslation';
import { getMarketplace } from '../../../../../redux/actions';
import AboutExpert from './AboutExpert';
import AboutGig from './AboutGig';
import RelatedTags from './RelatedTags';

const ViewExpertise = ({ open, onClose, onInvite, onBack, gig_id }) => {
  const { data: marketplace, loading } = useSelector(
    ({ marketplace }) => marketplace.marketplace
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMarketplace(gig_id));
  }, [dispatch, gig_id]);

  return (
    <Drawer
      zIndex={1000}
      open={open}
      footer={null}
      closable={false}
      width={625}
      contentWrapperStyle={{ maxWidth: '100vw' }}
      className="custom_styles"
    >
      <div className="p-1 p-md-2 plg-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src="/assets/img/icons/arrow-back.svg"
              alt=""
              className="cursor-pointer"
              onClick={onBack}
            />
            <h5 className="h5 h5-sm text-black mb-0 ml-2">{t('Experts')}</h5>
          </div>
          <img
            src="/assets/img/icons/close-icon.svg"
            alt=""
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <Divider
          className="my-3 mx-n5"
          style={{
            borderBottom: '1px solid #C4C4C4',
            width: 'calc(100% + 48px)',
          }}
        />

        <div className="my-4">
          <div className="position-relative" style={{ background: 'white' }}>
            <Loading loading={loading} />
            <div className="px-2">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <h3 className="h3-lg text-black mb-0">
                  {marketplace?.expertise_title}
                </h3>
              </div>
              <div className="d-flex align-items-center flex-wrap my-3">
                <img
                  src={marketplace?.created_by?.general_profile?.avatar}
                  alt=""
                  style={{
                    width: 31,
                    height: 31,
                    border: '2px solid #8BC53F',
                    borderRadius: '50%',
                  }}
                  className="mr-2"
                />
                <h6 className="h6-sm text-black my-1 mr-2">
                  {' '}
                  {marketplace?.created_by?.general_profile?.first_name}{' '}
                  {marketplace?.created_by?.general_profile?.last_name}
                </h6>
                <p className="btn-text-sm text-grey-light my-1 mr-3">
                  {
                    rolesObj[marketplace?.created_by?.general_profile?.role]
                      ?.label
                  }
                </p>
                <div className="my-1">
                  <img
                    src="/images/expert-marketplace/ratting-mark.svg"
                    alt=""
                    className="mr-1"
                  />
                  <img
                    src="/images/expert-marketplace/ratting-mark.svg"
                    alt=""
                    className="mr-1"
                  />
                  <img
                    src="/images/expert-marketplace/ratting-mark.svg"
                    alt=""
                    className="mr-1"
                  />
                  <img
                    src="/images/expert-marketplace/ratting-mark.svg"
                    alt=""
                    className="mr-1"
                  />
                  <img
                    src="/images/expert-marketplace/ratting-mark.svg"
                    alt=""
                    className="mr-1"
                  />
                </div>
                <div className="d-flex ">
                  <p className="p-sm text-grey-light mb-0">(20)</p>
                </div>
              </div>

              <img
                src={marketplace?.gallery_images?.[0]?.image_url}
                alt=""
                className="mb-5 w-100"
                style={{ maxWidth: '100%', aspectRatio: '2.5/1' }}
              />

              <AboutGig about={marketplace?.description} />
              <AboutExpert marketplace={marketplace} />
              <FAQs faq={marketplace?.faqs} title="FAQ" />
              <Reviews review={[]} />
              <RelatedTags marketplace={marketplace} />
            </div>
          </div>
          <Button
            style={{ height: 38 }}
            type="primary mt-3 btn-text-md w-100"
            onClick={() => onInvite(marketplace)}
          >
            {t('Invite this expert')}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default ViewExpertise;
