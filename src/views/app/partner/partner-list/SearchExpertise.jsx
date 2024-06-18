/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */

import { Avatar, Button, Divider, Form, Input, Modal } from 'antd';
import React, { useEffect, useRef } from 'react';
import SimpleBar from 'simplebar-react';

import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import Loading from '../../../../components/util-components/Loading';
import HBsPagination from '../../../../components/util-components/Pagination';
import SingleRating from '../../../../components/util-components/SingleRating';
import { rolesObj } from '../../../../constants/commonData';
import useTranslation from '../../../../helpers/useTranslation';
import { getMarketplacesBySearchFilterSortby } from '../../../../redux/actions';

const SearchExpertise = ({
  open,
  onClose,
  selectedExpertises,
  setSelectedExpertises,
  onNext,
}) => {
  const {
    data: expertises,
    loading,
    page = 1,
    limit = 20,
    count = 0,
  } = useSelector(({ partner }) => partner.marketplaces);

  const containerEl = useRef(null);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleSearchExpertises = (param = {}) => {
    dispatch(
      getMarketplacesBySearchFilterSortby({
        market_filter: 'ALL',
        sort_by: 'PRICE_ASCENDING',
        search: param?.search || undefined,
        page,
        limit,
        ...param,
      })
    );
  };

  const handleSelectDeselct = (expertise) => {
    const targetedExpertiseindex = selectedExpertises?.findIndex?.(
      (data) => data?.id === expertise?.id
    );
    if (targetedExpertiseindex >= 0) {
      const newExpertises = [...selectedExpertises];
      newExpertises?.splice(targetedExpertiseindex, 1);
      setSelectedExpertises(newExpertises);
    } else {
      setSelectedExpertises((state) => [...state, expertise]);
    }
  };

  useEffect(() => {
    handleSearchExpertises();
  }, []);

  useEffect(() => {
    containerEl?.current?.scrollTo?.(0, 0);
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={662}
      footer={null}
      closable={false}
      bodyStyle={{ padding: 0, maxHeight: '100vh' }}
    >
      <div style={{ padding: '33px 36px 8px' }}>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="h5-sm text-black">{t('Search for an expertise')}</h5>
          <img
            src="/assets/img/icons/close-bold.svg"
            alt=""
            style={{ height: 20 }}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
      </div>
      <Divider className="my-0" style={{ borderTop: '1px solid #C4C4C4' }} />
      <SimpleBar
        scrollableNodeProps={{ ref: containerEl }}
        style={{ padding: '34px 36px', maxHeight: 'calc(100vh - 70px)' }}
      >
        <Form className="custom-form-style">
          <Form.Item>
            <Input
              style={{ height: 36 }}
              className="br-6"
              // placeholder={t("e.g. Hubbers contest 1")}
              onChange={({ target }) =>
                handleSearchExpertises({ search: target.value, page: 1 })
              }
            />
          </Form.Item>
        </Form>

        <div className="h6.h6-sm.text-black" style={{ margin: '23px 0px' }}>
          Expertises selected ({selectedExpertises?.length || 0})
        </div>

        <div
          className="mx-auto mb-4"
          style={{
            maxWidth: 456,
          }}
        >
          <Row
            className="mb-3 position-relativ mx-n1 position-relative"
            style={{ minHeight: 300 }}
          >
            <Loading loading={loading} />
            {expertises?.map?.((expertise) => (
              <Col
                xs={12}
                md={6}
                className="pb-3"
                style={{ padding: '0px 7px' }}
              >
                <div
                  key={expertise.id}
                  className="h-100 d-flex flex-column cursor-pointer"
                  style={{
                    filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1)',
                    borderRadius: 5,
                    border:
                      selectedExpertises?.find?.(
                        (data) => data?.id === expertise.id
                      )?.id && '2px solid #8BC53F',
                  }}
                  onClick={() => handleSelectDeselct(expertise)}
                >
                  <img
                    alt=""
                    src={expertise.gallery_images?.[0]?.image_url}
                    style={{
                      aspectRatio: '1.6/1',
                      borderRadius: '5px 5px 0px 0px',
                    }}
                    className="w-100"
                  />
                  <div
                    className="flex-grow-1"
                    style={{
                      padding: '5px 10px',
                      background: selectedExpertises?.find?.(
                        (data) => data?.id === expertise.id
                      )?.id
                        ? '#F6FBEF'
                        : 'white',
                    }}
                  >
                    <div className="flex-grow-1">
                      <div className="d-flex" style={{ marginBottom: 6 }}>
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <Avatar
                          src={expertise.created_by?.general_profile?.avatar}
                          alt="profile"
                          style={{
                            width: 29,
                            height: 29,
                            border: '2px solid #8BC53F',
                          }}
                        />
                        <div className="ml-3">
                          <h6 className="fs-12 fw-5 text-black mb-0">
                            {expertise.created_by?.general_profile?.first_name}{' '}
                            {expertise.created_by?.general_profile?.last_name}
                          </h6>
                          <p className="fs-10 fw-5 text-grey-light mb-0">
                            {
                              rolesObj[
                                expertise.created_by?.general_profile?.role
                              ]?.label
                            }
                          </p>
                        </div>
                      </div>

                      <p
                        className="fs-12 fw-3 text-black"
                        style={{ marginBottom: 5 }}
                      >
                        {expertise.expertise_title}
                      </p>
                    </div>

                    <Divider className="my-0 py-1" />
                    <div className="d-flex align-items-end justify-content-between">
                      <div>
                        {expertise.packages?.[0]?.package_price && (
                          <>
                            <p
                              className="fs-10 fw-5 text-black"
                              style={{ marginBottom: 3 }}
                            >
                              STARTING AT
                            </p>
                            <h4 className="fs-12 fw-5 text-black mb-1">
                              {expertise.packages?.[0]?.how_get_paid === 'HBB'
                                ? 'HBB '
                                : '€ '}
                              {expertise.packages?.[0]?.package_price}
                            </h4>
                          </>
                        )}
                      </div>
                      <div
                        className="d-flex align-items-end"
                        style={{ color: '#FFCC21', marginBottom: 10 }}
                      >
                        <SingleRating
                          ratingCount={expertise?.review_count || 0}
                        />
                        <h6
                          className="fs-12 fw-5 mb-0 mx-1"
                          style={{ color: '#FFCC21' }}
                        >
                          {expertise?.review_count}
                        </h6>
                        <h6 className="fs-12 fw-3 text-grey-light mb-0">
                          ({expertise?.reviewer_count || 0})
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center">
            <HBsPagination
              total={count || 0}
              current={page}
              hideOnSinglePage
              defaultPageSize={20}
              onChange={(page, limit) => {
                handleSearchExpertises({ page, limit });
                containerEl?.current?.scrollTo?.(0, 0);
              }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end" style={{ height: 31 }}>
          <Button type="primary btn-text-md px-4" onClick={onNext}>
            Next
          </Button>
        </div>
      </SimpleBar>
    </Modal>
  );
};

export default SearchExpertise;
