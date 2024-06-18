/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import { DeleteOutlined, StarFilled } from '@ant-design/icons';
import { Avatar, Button, Divider, Form, Input, Modal, Select } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import React, { useEffect, useMemo, useState } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../../../components/util-components/Loading';
import { rolesObj } from '../../../../constants/commonData';
import useTranslation from '../../../../helpers/useTranslation';
import {
  getProjectWorkspaces,
  getWorkspaceRecommendedExperts,
  inviteWorkspaceExperts,
} from '../../../../redux/actions';
import ViewExpertise from './ViewExpertise';

const InviteExpert = ({ open, onClose }) => {
  const { data: projectWorkspaces } = useSelector(
    ({ product }) => product.projectWorkspaces,
    shallowEqual
  );

  const { status } = useSelector(
    ({ product }) => product.inviteWorkspaceExpertAction
  );

  const { data: workspaceRecommendedExperts, loading } = useSelector(
    ({ product }) => product.workspaceRecommendedExperts
  );

  const dispatch = useDispatch();
  const { productId } = useParams();

  const { t } = useTranslation();

  const [form] = Form.useForm();
  const workspace_id = useWatch('workspace_id', form);
  const expert_name = useWatch('expert_name', form);

  const searchedRecommendedExperts = useMemo(
    () =>
      workspaceRecommendedExperts?.filter?.((expertise) =>
        `${expertise?.created_by?.general_profile?.first_name} ${expertise?.created_by?.general_profile?.last_name}`
          ?.toLowerCase()
          .includes(expert_name?.toLowerCase())
      ),
    [expert_name, workspaceRecommendedExperts]
  );

  const [openViewExpertsiseWithId, setOpenViewExpertsiseWithId] =
    useState(false);

  const [selectedExpertise, setSelectedExpertise] = useState();

  useEffect(() => {
    const selectedWorkspaceCategoryId = projectWorkspaces?.find(
      ({ id }) => id === workspace_id
    )?.workspace_type?.id;
    if (selectedWorkspaceCategoryId) {
      dispatch(getWorkspaceRecommendedExperts(selectedWorkspaceCategoryId));
    }
  }, [dispatch, projectWorkspaces, workspace_id]);

  useEffect(() => {
    dispatch(getProjectWorkspaces(productId));
  }, [dispatch, productId]);

  const onFinish = ({ expert_name, ...values }) => {
    if (selectedExpertise?.id) {
      dispatch(
        inviteWorkspaceExperts({
          ...values,
          gig_id: selectedExpertise?.id,
          invite_status: 'PENDING',
          onSuccess: () => {
            form.resetFields();
            onClose();
          },
        })
      );
    }
  };

  return (
    <>
      <Modal
        footer={null}
        open={open}
        width={698}
        closable={false}
        onCancel={onClose}
        zIndex={999}
        className="custom_styles"
      >
        <div className="px-2 py-3 product-launcher-container bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="h5 h5-lg text-black mb-0">
              Invite an expert to your project
            </h6>
          </div>
          <Divider
            className="mt-0"
            style={{ borderBottom: '1px solid #C4C4C4' }}
          />

          <Form
            layout="vertical"
            form={form}
            name="control-hooks"
            className="custom-form-style"
            onFinish={onFinish}
          >
            <Form.Item
              name="workspace_id"
              label={
                <h4 className="h6-lg text-black mb-0">
                  Choose your workspace you want to add this expert
                </h4>
              }
              className="mb-4 pb-2"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Select
                placeholder="e.g. Project 1"
                optionFilterProp="name"
                options={projectWorkspaces?.map?.(({ id: value, ...data }) => ({
                  value,
                  label: (
                    <div className="d-flex align-items-center mt-2">
                      <img
                        src={data?.workspace_type?.icon}
                        alt=""
                        style={{ height: 18 }}
                      />
                      <p className="ml-2 mb-0">{data?.workspace_type?.title}</p>
                    </div>
                  ),
                  name: data?.workspace_type?.title,
                }))}
              />
            </Form.Item>

            {selectedExpertise?.id ? null : (
              <Form.Item
                name="expert_name"
                label={
                  <h4 className="h6-lg text-black mb-0 pb-2">
                    {t('Expert name')}
                  </h4>
                }
                className="mb-4 pb-2"
              >
                <Input placeholder="e.g. Project 1" />
              </Form.Item>
            )}

            {selectedExpertise?.id && (
              <div
                style={{
                  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.09)',
                  borderRadius: 5,
                  padding: '12px 8px',
                  width: 247,
                }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{ gap: 11, marginBottom: 13 }}
                >
                  <Avatar
                    src={selectedExpertise?.created_by?.general_profile?.avatar}
                    size={44}
                    style={{
                      border: '2px solid #8BC53F',
                      flexGrow: 0,
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="h6-sm text-black mb-0">
                      {
                        selectedExpertise?.created_by?.general_profile
                          ?.first_name
                      }{' '}
                      {
                        selectedExpertise?.created_by?.general_profile
                          ?.last_name
                      }
                    </h6>
                    <h6 className="btn-text-sm text-grey-light mb-0">
                      {
                        rolesObj[
                          selectedExpertise?.created_by?.general_profile?.role
                        ]?.label
                      }
                    </h6>
                  </div>

                  <DeleteOutlined
                    className="cursor-pointer"
                    onClick={() => setSelectedExpertise({})}
                  />
                </div>
              </div>
            )}

            {selectedExpertise?.id ? null : (
              <>
                <h6 className="h6-sm mb-0">Suggestions</h6>
                <div className="overflow-auto">
                  <div
                    className="d-flex position-relative m-2"
                    style={{ gap: 12, minHeight: 50 }}
                  >
                    <Loading loading={loading} />
                    {searchedRecommendedExperts?.map?.((expertise) => (
                      <div
                        style={{
                          flexShrink: 0,
                          padding: '12px 10px',
                          boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.07)',
                          width: 233,
                        }}
                        key={expertise?.id}
                        className="cursor-pointer"
                        onClick={() =>
                          setOpenViewExpertsiseWithId(expertise?.id)
                        }
                      >
                        <div
                          className="d-flex align-items-center"
                          style={{ gap: 11, marginBottom: 13 }}
                        >
                          <Avatar
                            src={expertise?.created_by?.general_profile?.avatar}
                            size={53}
                            style={{
                              border: '2px solid #8BC53F',
                              flexGrow: 0,
                            }}
                          />
                          <div>
                            <h6 className="h6-sm text-black mb-0">
                              {
                                expertise?.created_by?.general_profile
                                  ?.first_name
                              }{' '}
                              {
                                expertise?.created_by?.general_profile
                                  ?.last_name
                              }
                            </h6>
                            <h6 className="btn-text-sm text-grey-light mb-0">
                              {
                                rolesObj[
                                  expertise?.created_by?.general_profile?.role
                                ]?.label
                              }
                            </h6>
                          </div>
                        </div>
                        <p
                          className="p-sm text-black"
                          style={{ marginBottom: 13 }}
                        >
                          {expertise?.expertise_title}
                        </p>
                        <div className="d-flex align-items-center">
                          <StarFilled style={{ color: '#FFCC21' }} />
                          <h6
                            className="fs-12 fw-5 mb-0 mx-1"
                            style={{ color: '#FFCC21' }}
                          >
                            4.7
                          </h6>
                          <p className="fs-12 fw-3 text-grey-light mb-0">
                            (20)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="d-flex w-100 justify-content-end">
              <Button
                htmlType="submit"
                style={{ height: 40 }}
                type="primary btn-text-md px-5 mt-3"
                size="large"
                loading={status === 'submitting'}
              >
                {t('Send invite')}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>

      <ViewExpertise
        open={openViewExpertsiseWithId}
        gig_id={openViewExpertsiseWithId}
        onClose={() => setOpenViewExpertsiseWithId(0)}
        onInvite={(erpertise) => {
          setOpenViewExpertsiseWithId(0);
          setSelectedExpertise(erpertise);
        }}
      />
    </>
  );
};

export default InviteExpert;
