/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import { Button, Divider, Form, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import UserSelect from '../../../../../components/util-components/selector/UserSelect';
import useTranslation from '../../../../../helpers/useTranslation';
import {
  addProductMember,
  addWorkspaceMember,
  getProductMembers,
  getProjectWorkspaces,
} from '../../../../../redux/actions';

const AddTemplate = ({ open, onAdd }) => {
  const { status } = useSelector(
    ({ product }) => product.addProductMemberAction
  );
  const { data: projectWorkspaces } = useSelector(
    ({ product }) => product.projectWorkspaces
  );

  const [selectedMemberType, setSelectedMemberType] = useState('core');

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getProjectWorkspaces(productId));
  }, [dispatch, productId]);

  const onFinish = ({ workspace_id, ...values }) => {
    const payload = {
      ...values,
    };
    if (selectedMemberType === 'workspace') {
      dispatch(
        addWorkspaceMember({
          workspace_id,
          status: 'ACCEPTED',
          member_type: 'MEMBER',
          onSuccess: () => {
            form.resetFields();
            dispatch(getProductMembers(productId));
            onAdd();
          },
        })
      );
    } else {
      dispatch(
        addProductMember({
          ...payload,
          project_id: productId,
          onSuccess: () => {
            form.resetFields();
            onAdd();
          },
        })
      );
    }
  };

  return (
    <Modal
      footer={null}
      open={open}
      closable={false}
      width={698}
      zIndex={1001}
      className="custom_styles"
    >
      <div className="px-2 py-3 product-launcher-container bg-white">
        <div className="h5 h5-lg text-black mb-3">
          {t('Invite a teammate to your project')}
        </div>
        <Divider
          className="my-0"
          style={{ borderBottom: '1px solid #C4C4C4' }}
        />

        <Row
          className="option-container w-100 my-5 mx-auto"
          style={{ maxWidth: 470 }}
        >
          <Col xs={12} md={6} className="mb-4">
            <div
              className={`d-flex flex-column align-items-center px-3 py-5 h-100 cursor-pointer br-5 ${
                selectedMemberType === 'core' ? ' active-option' : ''
              }`}
              style={{
                boxShadow: '1px 1px 20px rgba(205, 205, 205, 0.51)',
              }}
              onClick={() => setSelectedMemberType('core')}
            >
              <h5 className="h5-lg mb-3 text-center">
                {t('As a core member')}
              </h5>
              <p className="p-sm text-center text-grey-light mb-3">
                {t('Give access to all workspace & edit/invite permissions')}
              </p>
            </div>
          </Col>
          <Col xs={12} md={6} className="mb-4 ">
            <div
              className={`d-flex flex-column align-items-center px-3 py-5 h-100 br-5 cursor-pointer${
                selectedMemberType === 'workspace' ? ' active-option' : ''
              }`}
              style={{
                boxShadow: '1px 1px 20px rgba(205, 205, 205, 0.51)',
              }}
              onClick={() => setSelectedMemberType('workspace')}
            >
              <h5 className="h5-lg mb-3 text-center">
                {t('As a workspace member')}
              </h5>
              <p className="p-sm text-center text-grey-light mb-3">
                {t('Give access to a specific workspace')}
              </p>
            </div>
          </Col>
        </Row>

        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          className="custom-form-style"
          onFinish={onFinish}
        >
          <Form.Item
            name="user_id"
            label={
              <h4 className="h6-lg text-black mb-0">{t('Teammate name')}</h4>
            }
            className="mb-4 pb-2"
          >
            <UserSelect
              optionValue="email"
              mode="tags"
              placeholder="e.g. Project 1"
              className="mt-2"
            />
          </Form.Item>

          {selectedMemberType === 'workspace' && (
            <Form.Item
              name="workspace_id"
              label={
                <h4 className="h6-lg text-black mb-0 pb-2">
                  {t('Choose the workspace you want to add the member to')}
                </h4>
              }
              className="mb-4 pb-2"
            >
              <Select
                placeholder="e.g. Project 1"
                optionFilterProp="label"
                options={projectWorkspaces?.map?.(
                  ({ id: value, name: label }) => ({ value, label })
                )}
              />
            </Form.Item>
          )}

          <div className="d-flex w-100 justify-content-end">
            <Button
              htmlType="submit"
              style={{ height: 40 }}
              type="primary btn-text-md px-5 mt-3"
              size="large"
              loading={status === 'submitting'}
            >
              {t('OK')}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddTemplate;
