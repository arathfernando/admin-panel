/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import { Button, Divider, Form, Modal, Radio } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col } from 'reactstrap';
import Loading from '../../../../../components/util-components/Loading';
import useTranslation from '../../../../../helpers/useTranslation';
import {
  getProjectWorkspaces,
  getWorkspaceCategories,
} from '../../../../../redux/actions';

const SelectWorkSpace = ({ open, onSelected, form, onClose }) => {
  const { data: workspaces } = useSelector(
    ({ workspaceCategory }) => workspaceCategory.workspaceCategories
  );
  const { data: projectWorkspaces, loading } = useSelector(
    ({ product }) => product.projectWorkspaces
  );

  const [restWorkspaceCategories, setRestWorkspaceCategories] = useState([]);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { productId } = useParams();

  const workspace_type = useWatch('workspace_type', form);

  useEffect(() => {
    setRestWorkspaceCategories(
      workspaces?.filter?.(
        (data) =>
          !projectWorkspaces?.find?.(
            ({ workspace_type }) => workspace_type?.id === data?.id
          )?.id
      )
    );
  }, [workspaces, projectWorkspaces]);

  useEffect(() => {
    dispatch(getWorkspaceCategories());
  }, [dispatch]);

  useEffect(() => {
    if (productId) dispatch(getProjectWorkspaces(productId));
  }, [dispatch, productId]);

  return (
    <Modal
      footer={null}
      open={open}
      closable={false}
      width={1062}
      zIndex={1001}
      className="custom_styles"
    >
      <div className="px-2 py-3 product-launcher-container bg-white">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="h5 h5-lg text-black">
            {t('Start by selecting the workspace you want to create')}
          </h6>
          <img
            src="/assets/img/icons/close-icon.svg"
            alt=""
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <Divider
          className="my-0"
          style={{ borderBottom: '1px solid #C4C4C4' }}
        />

        <div className="position-relative">
          <Loading loading={loading} />
          <Form.Item noStyle name="workspace_type">
            <Radio.Group className="row radio-nostyle option-container mt-4 pt-2">
              {restWorkspaceCategories.map((workSpace) => (
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  xl={3}
                  className="mb-4"
                  key={workSpace.id}
                >
                  <Radio
                    value={workSpace.id}
                    className="w-100 h-100 align-items-stretch"
                  >
                    <div
                      className={`d-flex flex-column align-items-center justify-content-between px-3 py-4 h-100 cursor-pointer br-5 ${
                        workspace_type === workSpace.id ? ' active-option' : ''
                      }`}
                      style={{
                        boxShadow: '1px 1px 10px rgba(205, 205, 205, 0.51)',
                        margin: '0px 2px',
                      }}
                    >
                      <img
                        src={workSpace.icon}
                        style={{ height: 35, width: 34, objectFit: 'contain' }}
                        alt=""
                        className="mb-2"
                      />
                      <div
                        style={{
                          gap: '5px 10px',
                        }}
                        className="d-flex flex-grow-1 mb-2 flex-wrap justify-content-center align-items-center"
                      >
                        <h5 className="h5-lg text-center mb-0">
                          {workSpace.title}
                        </h5>
                        {workSpace.label === 'BETA' ? (
                          <p
                            className="fs-10 fw-5 mb-0"
                            style={{
                              padding: '3px 13px',
                              background: '#E8F3D9',
                              color: '#537626',
                              borderRadius: 16,
                            }}
                          >
                            {t('BETA')}
                          </p>
                        ) : (
                          workSpace.label === 'CO_CREATING' && (
                            <p
                              className="fs-10 fw-5 mb-0"
                              style={{
                                padding: '3px 13px',
                                background: 'rgba(0, 119, 181, 0.15)',
                                color: '#0083C8',
                                borderRadius: 16,
                              }}
                            >
                              {t('CO-CREATING')}
                            </p>
                          )
                        )}
                      </div>
                      <p className="p-sm text-center text-grey-light flex-grow-1 d-flex align-items-center">
                        {workSpace.short_description}
                      </p>
                      <h6 className="h6-sm mb-2">Co-created with:</h6>
                      <img
                        src={workSpace.co_created_with}
                        style={{ height: 28 }}
                        alt=""
                      />
                    </div>
                  </Radio>
                </Col>
              ))}
            </Radio.Group>
          </Form.Item>
        </div>

        <div className="d-flex w-100 justify-content-end">
          <Button
            style={{ height: 40 }}
            type="primary btn-text-md px-5 "
            size="large"
            onClick={onSelected}
            disabled={!workspace_type}
          >
            {t('OK')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SelectWorkSpace;
