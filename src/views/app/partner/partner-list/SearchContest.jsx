/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
import {
  Avatar,
  Button,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  Tooltip,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import Loading from '../../../../components/util-components/Loading';
import HBsPagination from '../../../../components/util-components/Pagination';
import useTranslation from '../../../../helpers/useTranslation';
import { searchContests } from '../../../../redux/actions';

const SearchContest = ({
  open,
  onClose,
  selectedContests,
  setSelectedContests,
  onNext,
}) => {
  const {
    data: contests,
    loading,
    page = 1,
    limit = 20,
    count = 0,
  } = useSelector(({ partner }) => partner.contests);

  const containerEl = useRef(null);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handelGetContests = (params = {}) => {
    dispatch(
      searchContests({
        contest_filter: 'ALL',
        sort_by: 'DATE',
        page,
        limit,
        ...params,
      })
    );
  };

  const handleSelectDeselct = (contest) => {
    const targetedContestindex = selectedContests?.findIndex?.(
      (data) => data?.id === contest?.id
    );
    if (targetedContestindex >= 0) {
      const newContests = [...selectedContests];
      newContests?.splice(targetedContestindex, 1);
      setSelectedContests(newContests);
    } else {
      setSelectedContests((state) => [...state, contest]);
    }
  };

  useEffect(() => {
    handelGetContests();
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
          <h5 className="h5-sm text-black">{t('Search for an contest')}</h5>
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
              placeholder={t('e.g. Hubbers contest 1')}
              onChange={({ target }) =>
                handelGetContests({ name: target.value, page: 1 })
              }
            />
          </Form.Item>
        </Form>

        <div className="h6-sm text-black" style={{ margin: '23px 0px' }}>
          {t('Contests selected')} ({selectedContests?.length || 0})
        </div>

        <div
          className="mx-auto mb-4"
          style={{
            maxWidth: 500,
          }}
        >
          <Row
            className="mb-3 position-relativ mx-n1"
            style={{ minHeight: 300 }}
          >
            <Loading loading={loading} />
            {contests?.map?.((contest) => (
              <Col
                xs={12}
                md={6}
                className="pb-3"
                style={{ padding: '0px 7px' }}
              >
                <div
                  key={contest.id}
                  className="h-100 d-flex flex-column cursor-pointer"
                  style={{
                    filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1)',
                    borderRadius: '5px 5px 2px 2px',
                    border:
                      selectedContests?.find?.(
                        (data) => data?.id === contest.id
                      )?.id && '2px solid #8BC53F',
                  }}
                  onClick={() => handleSelectDeselct(contest)}
                >
                  <div className="br-5 overflow-hidden h-100">
                    <div className="position-relative">
                      <Image
                        preview={false}
                        src={contest?.contest_cover}
                        alt=""
                        style={{
                          aspectRatio: '1.6/1',
                          borderRadius: '5px 5px 0px 0px',
                        }}
                        rootClassName="w-100 cursor-pointer"
                      />
                      <div
                        className="shadow-layer cursor-pointer"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0) 100%)',
                        }}
                      />
                    </div>
                    <div style={{ background: 'white', padding: 10 }}>
                      <Tooltip title={contest?.title}>
                        <h5
                          className="fs-16 fw-6 text-elps"
                          style={{ lineHeight: '20px', marginBottom: 5 }}
                        >
                          {contest?.title}
                        </h5>
                      </Tooltip>
                      <h6 className="h6-sm text-grey-light">
                        {contest?.contestant_count || 0} {t('contestants')}
                      </h6>

                      <h6 className="h6-sm">
                        {t('Start date')}:{' '}
                        {moment(contest?.contest_start_date).isValid() &&
                          moment(contest?.contest_start_date).format(
                            'DD/MM/YYYY'
                          )}
                      </h6>
                      <h6 className="h6-sm">
                        {t('Due date')}:{' '}
                        {moment(contest?.contest_end_date).isValid() &&
                          moment(contest?.contest_end_date).format(
                            'DD/MM/YYYY'
                          )}
                      </h6>

                      <Divider className="my-2 pb-2" style={{ gap: 10 }} />

                      <div className="d-flex align-items-end flex-column">
                        <h6
                          className="fs-12 fw- text-grey-light"
                          style={{ marginBottom: 5 }}
                        >
                          {t('Organised by')} :
                        </h6>
                        <div
                          className="d-flex align-items-center align-items-center"
                          style={{ gap: 8 }}
                        >
                          <p className="fs-14 fw-5 mb-0">
                            {
                              contest?.contest_created_by?.general_profile
                                ?.first_name
                            }{' '}
                            {
                              contest?.contest_created_by?.general_profile
                                ?.last_name
                            }
                          </p>
                          <Avatar
                            size={32}
                            src={
                              contest?.contest_created_by?.general_profile
                                ?.avatar
                            }
                            alt=""
                          />
                        </div>
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
                handelGetContests({ page, limit });
                containerEl?.current?.scrollTo?.(0, 0);
              }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end" style={{ height: 31 }}>
          <Button type="primary btn-text-md px-4" onClick={onNext}>
            {t('Next')}
          </Button>
        </div>
      </SimpleBar>
    </Modal>
  );
};

export default SearchContest;
