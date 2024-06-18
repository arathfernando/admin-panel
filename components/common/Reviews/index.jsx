/* eslint-disable camelcase */
import { LikeOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import useTranslation from '../../../helpers/useTranslation';
import Loading from '../../util-components/Loading';
import SingleRating from '../../util-components/SingleRating';
import RatingViwer from './RatingViwer';

const Review = ({ review, onReactionOnReview }) => {
  const [isReactionSubmittiong, setIsReactionSubmittiong] = useState(false);

  const { t } = useTranslation();

  const [reactionStatus, setReactionStatus] = useState();
  useEffect(() => {
    setReactionStatus(review?.like_status === 'YES' ? 'YES' : 'NO');
  }, [review.like_status]);

  const handleReviewReaction = (is_helpfull) => {
    setReactionStatus(is_helpfull);
    setIsReactionSubmittiong(true);

    const onSuccess = () => {
      setReactionStatus(is_helpfull);
      setIsReactionSubmittiong(false);
    };
    const onError = () => {
      setReactionStatus(
        setReactionStatus(is_helpfull === 'YES' ? 'YES' : 'NO')
      );
      setIsReactionSubmittiong(false);
    };

    onReactionOnReview(is_helpfull, review, onSuccess, onError);
  };

  return (
    <>
      <div className="d-flex mt-4">
        <img
          src={review?.created_by?.general_profile?.avatar}
          alt=""
          style={{
            height: 49,
            width: 49,
            borderRadius: '50%',
            border: '3px solid #8bc53f',
          }}
        />
        <div className="ms-3">
          <div className="d-flex align-items-center">
            <h6 className="h5-lg text-black">
              {review?.created_by?.general_profile?.first_name}{' '}
              {review?.created_by?.general_profile?.last_name}
            </h6>
          </div>
          <div className="d-flex align-items-center mb-1">
            <img
              src="/images/expert-marketplace/flag-for-chile.svg"
              alt=""
              style={{ width: 18, height: 18 }}
            />
            <h6 className="h6-sm text-grey-light ml-1 mb-0">
              {review?.created_by?.general_profile?.location}
            </h6>
          </div>
          <div className="d-flex align-items-center">
            <div className="d-flex" style={{ gap: 8 }}>
              <SingleRating ratingCount={(review?.over_all_rating - 0) * 5} />
              <SingleRating ratingCount={(review?.over_all_rating - 1) * 5} />
              <SingleRating ratingCount={(review?.over_all_rating - 2) * 5} />
              <SingleRating ratingCount={(review?.over_all_rating - 3) * 5} />
              <SingleRating ratingCount={(review?.over_all_rating - 4) * 5} />
            </div>

            <p className="h6-sm text-black mb-0" style={{ marginLeft: 11 }}>
              {moment(review?.created_at).isValid &&
                moment(review?.created_at).fromNow()}
            </p>
          </div>

          <p className="p-sm mt-2">{review?.comment}</p>

          <Button
            type="text bw-2 br-5 px-5 d-flex align-items-center"
            onClick={(e) => {
              e.stopPropagation();
              handleReviewReaction(reactionStatus === 'YES' ? 'NO' : 'YES');
            }}
            ref={(node) => {
              if (node) {
                node.style.setProperty(
                  'border',
                  `1px solid ${
                    reactionStatus === 'YES' ? '#E8F3D9' : '#8BC53F'
                  }`,
                  'important'
                );
              }
            }}
            style={{
              height: 33,
              ...(reactionStatus === 'YES'
                ? {
                    background: '#E8F3D9',
                    color: '#6A9730',
                  }
                : {
                    background: '#FFFFFF',
                    color: '#8BC53F',
                  }),
            }}
            loading={isReactionSubmittiong}
          >
            <div
              className="d-flex"
              style={{
                color: '#8BC53F',
              }}
            >
              <p
                className="fs-13 fw-5 mb-0 mr-2"
                style={{
                  color: '#8BC53F',
                }}
              >
                {t('Helpful')}
              </p>
              <LikeOutlined style={{ fontSize: 13, marginTop: 2 }} />
            </div>
          </Button>
        </div>
      </div>

      <Divider
        style={{ border: '1px solid #C4C4C4' }}
        className="mb-2 border-top-0"
      />
    </>
  );
};

const Reviews = ({
  title = 'Reviews',
  review = {},
  loading = false,
  onGetReviews = () => null,
  onReactionOnReview = () => null,
}) => {
  const [form] = Form.useForm();

  const { t } = useTranslation();

  const [isGettingMoreReviews, setisGettingMoreReviews] = useState(false);

  useEffect(() => {
    setisGettingMoreReviews(false);
    onGetReviews({ page: 1, limit: 25, ...form.getFieldsValue() });
  }, [form, onGetReviews]);

  const handleGetReviews = () => {
    setisGettingMoreReviews(false);
    onGetReviews(form.getFieldsValue());
  };

  const handleGetMoreReviews = () => {
    setisGettingMoreReviews(true);
    onGetReviews({ ...form.getFieldsValue(), getMore: true });
  };

  return (
    <div className="position-relative">
      <Loading loading={loading} />
      <Form form={form} className="custom-form-style">
        <Row>
          <Col xs={12}>
            <div
              className="d-flex align-items-center flex-wrap justify-content-between"
              style={{ gap: 15, marginBottom: 25 }}
            >
              <h3 className="h3-lg text-black mb-0">{t(title)}</h3>
              <div className="d-flex align-items-center justify-content-end">
                <h4 className="h5-sm text-black mb-0 mr-2">{t('Sort by')}</h4>
                <Form.Item noStyle name="filter" initialValue="MOST_RECENT">
                  <Select
                    onChange={handleGetReviews}
                    style={{ height: 34 }}
                    options={[
                      { value: 'MOST_RECENT', label: t('Most recent') },
                      { value: 'MOST_RELEVANT', label: t('Most relevant') },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          </Col>
          <Col xs={12} md={5} lg={4}>
            <RatingViwer rating={review} />
          </Col>
          <Col xs={0} md={1} />

          <Col xs={12} md={6} lg={7}>
            <div className="overflow-auto">
              {review?.data?.map?.((data) => (
                <Review
                  review={data}
                  key={data?.id}
                  onReactionOnReview={onReactionOnReview}
                />
              ))}
              {review?.data?.length ? (
                <Button
                  loading={loading && isGettingMoreReviews}
                  type="text px-0"
                  style={{ color: '#8BC53F' }}
                  onClick={handleGetMoreReviews}
                >
                  + {t('See more')}
                </Button>
              ) : null}
            </div>
          </Col>
        </Row>

        <Divider className="pb-2" />
      </Form>
    </div>
  );
};

export default Reviews;
