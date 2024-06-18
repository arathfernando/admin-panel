/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { Avatar, Button, Divider, Form, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { rolesObj } from '../../../../constants/commonData';
import useTranslation from '../../../../helpers/useTranslation';
import * as Actions from '../../../../redux/actions';
import { addProductMember, getProductMembers } from '../../../../redux/actions';

const UserOption = ({ user, productId }) => {
  const { status, data } = useSelector(
    ({ product }) => product.addProductMemberAction
  );

  const { t } = useTranslation();

  const [isMember, setIsMember] = useState(user.is_member);

  const dispatch = useDispatch();

  const handleAddMember = (id) => {
    dispatch(
      addProductMember({
        project_id: productId,
        user_id: [id],
        onSuccess: () => setIsMember(true),
      })
    );
  };

  return (
    <div
      className="d-flex align-items-center w-100"
      style={{ gap: 16, padding: '10px 0px', cursor: 'default' }}
    >
      <Avatar size={47} src={user?.general_profile?.avatar} />
      <div className="flex-grow-1">
        <h6 className="fs-16 gw-6 text-elps">
          {user?.general_profile?.first_name} {user?.general_profile?.last_name}
        </h6>
        <p className="fs-14 fw-5 text-grey-light mb-0 btn-txt-light">
          {rolesObj[user?.general_profile?.role]?.label || ''}
        </p>
      </div>
      {isMember ? (
        <Button
          type="text br-3 px-4"
          style={{ height: 31, background: '#E8F3D9' }}
        >
          <span style={{ color: '#537626' }}>{t('Added')}</span>
        </Button>
      ) : (
        <Button
          type="ghost br-3 px-4"
          style={{ height: 31 }}
          loading={status === 'submitting' && user.id === data?.user_id?.[0]}
          onClick={() => handleAddMember(user.email)}
        >
          <span className="fw-8 pr-1">+</span> {t('Add')}
        </Button>
      )}
    </div>
  );
};

const AddProductMeber = ({ open, onClose }) => {
  const userss = useSelector((state) => state.users.users, shallowEqual);

  const { data: productMembers } = useSelector(
    ({ product }) => product.productMembers
  );

  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const { productId } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    productId && dispatch(getProductMembers(productId));
  }, [dispatch, productId]);

  React.useEffect(() => {
    dispatch(Actions.getAllUsers({ page: 1, limit: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    setUsers(
      userss?.map?.((user) => ({
        ...user,
        is_member: !!productMembers?.find?.((data) => data.id === user.id)?.id,
      })) || []
    );
  }, [productMembers, userss]);

  return (
    <Modal
      footer={null}
      open={open}
      width={888}
      closable={false}
      zIndex={1001}
      className="custom_styles "
    >
      <div className="px-2 py-3 product-launcher-container bg-white">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="h5 h5-lg text-black mb-0">Project members</h6>
          <img
            src="/assets/img/icons/close-icon.svg"
            alt=""
            onClick={onClose}
            className="cursor-pointer"
          />
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
        >
          <Form.Item
            name="ut"
            label={<h6 className="h6-lg text-black mb-0">Add members</h6>}
            className="mb-4 pb-2"
          >
            <Select
              mode="multiple"
              showSearch
              placeholder="@JohnMalik"
              optionFilterProp="usernailname"
              popupClassName="py-2"
              options={users.map((user) => ({
                disabled: true,
                value: user.email,
                usernailname: `${user.email} ${
                  user?.general_profile?.first_name || ''
                } ${user?.general_profile?.last_name || ''} ${
                  user?.email || ''
                }`,
                label: <UserOption user={user} productId={productId} />,
              }))}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddProductMeber;
