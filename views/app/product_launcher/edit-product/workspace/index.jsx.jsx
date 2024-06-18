/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Form } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../../../../components/util-components/Loading';
import useTranslation from '../../../../../helpers/useTranslation';
import {
  addProjectWorkspace,
  getProjectWorkspaces,
} from '../../../../../redux/actions';
import SelectWorkSpace from './SelectWorkSpace';
import ViewWorkSpace from './ViewWorkSpace';
import WorkSpaceForm from './WorkSpaceForm';

const ProductWokspaces = () => {
  const { data: projectWorkspaces, loading } = useSelector(
    ({ product }) => product.projectWorkspaces
  );

  const [openSelectWorkSpase, setOpenSelectWorkSpase] = useState(false);
  const [openViewWorkSpace, setOpenViewWorkSpace] = useState(false);
  const [openWorkSpaceForm, setOpenWorkSpaceForm] = useState(false);
  const [form] = Form.useForm();
  const [workSpaceForm] = Form.useForm();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getProjectWorkspaces(productId));
  }, [dispatch, productId]);

  const handleAddWorkSpace = (values) => {
    const payload = { ...values, ...workSpaceForm.getFieldsValue() };

    dispatch(
      addProjectWorkspace({
        ...payload,
        onSuccess: () => {
          form.resetFields();
          setOpenWorkSpaceForm(false);
        },
      })
    );
  };

  return (
    <>
      <div
        className="d-flex flex-wrap pt-2 mx-auto position-relative"
        style={{ gap: 21 }}
      >
        <Loading loading={loading} />
        {projectWorkspaces?.map?.((workspace) => (
          <div
            className="d-flex justify-content-center align-items-center flex-column px-2 py-3"
            style={{
              width: 166,
              height: 166,
              boxShadow: '1px 1px 10px rgba(205, 205, 205, 0.51)',
              background: 'white',
            }}
          >
            <img
              src={workspace?.workspace_type?.icon}
              style={{ height: 35, width: 34 }}
              alt=""
            />
            <h6 className="h6-sm" style={{ margin: '5px 0px' }}>
              {workspace?.name}
            </h6>
            <p className="c-sm text-grey-light mb-0 text-center">
              {t('Created on')}:{' '}
              {moment(workspace?.created_at).isValid() &&
                moment(workspace?.created_at).format('DD/MM/YYYY')}
            </p>
          </div>
        ))}
        <div
          className="cursor-pointer d-flex justify-content-center align-items-center flex-column px-2 py-3 h-100"
          style={{
            width: 166,
            minHeight: 166,
            boxShadow: '1px 1px 10px rgba(205, 205, 205, 0.51)',
            background: 'white',
          }}
          onClick={() => setOpenSelectWorkSpase(true)}
        >
          <img
            src="/assets/img/product-launcher/add-workspace.svg"
            style={{ height: 35, width: 34 }}
            alt=""
          />
          <h6 className="h6-sm mt-3 text-center">{t('Add workspace')}</h6>
        </div>
      </div>

      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={handleAddWorkSpace}
        className="custom-form-style"
      >
        <SelectWorkSpace
          form={form}
          open={openSelectWorkSpase}
          onSelected={() => {
            setOpenSelectWorkSpase(false);
            setOpenViewWorkSpace(true);
          }}
          onClose={() => setOpenSelectWorkSpase(false)}
        />
        <ViewWorkSpace
          form={form}
          open={openViewWorkSpace}
          onClose={() => setOpenViewWorkSpace(false)}
          onNext={() => {
            setOpenViewWorkSpace(false);
            setOpenWorkSpaceForm(true);
          }}
        />
        <WorkSpaceForm
          form={form}
          workSpaceForm={workSpaceForm}
          open={openWorkSpaceForm}
          onStart={() => {
            form.submit();
          }}
          onClose={() => setOpenWorkSpaceForm(false)}
        />
      </Form>
    </>
  );
};

export default ProductWokspaces;
