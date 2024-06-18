import { Button, Form, Tabs } from 'antd';
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addProjectWorkspace } from '../../../../redux/actions';
import SelectWorkSpace from '../edit-product/workspace/SelectWorkSpace';
import ViewWorkSpace from '../edit-product/workspace/ViewWorkSpace';
import WorkSpaceForm from '../edit-product/workspace/WorkSpaceForm';
import AddProductMeber from './AddProductMeber';
import InviteExpert from './InviteExpert';
import Teammates from './Teammates';
import Workspaces from './Workspaces';

const TeammateAndWorkspaces = () => {
  const [openAddProductMeber, setOpenAddProductMeber] = useState(false);
  const [openInviteWorkspaceExpert, setOpenInviteWorkspaceExpert] =
    useState(false);

  const [activeKey, setActiveKey] = useState('Teammates');

  const { productName } = useParams();

  const [openSelectWorkSpase, setOpenSelectWorkSpase] = useState(false);
  const [openViewWorkSpace, setOpenViewWorkSpace] = useState(false);
  const [openWorkSpaceForm, setOpenWorkSpaceForm] = useState(false);
  const [form] = Form.useForm();
  const [workSpaceForm] = Form.useForm();

  const dispatch = useDispatch();

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
        style={{ padding: '50px 3%', background: 'white', minHeight: '80vh' }}
        className="custom_styles"
      >
        <Link to="/app/product-launcher">
          <div
            className="d-flex align-items-center mt-n2"
            style={{ marginBottom: 30 }}
          >
            <img src="/assets/img/icons/back.svg" alt="" className="mr-3" />
            <h6 className="fs-13 fw-6 mb-0">Back to projects</h6>
          </div>
        </Link>
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="fs-36 fw-8 mb-4">{productName}</h2>

          {activeKey === 'Teammates' ? (
            <div className="d-flex" style={{ gap: 20 }}>
              <Button
                size="large"
                style={{ height: 38 }}
                type="ghost mb-3 br-5"
                onClick={() => setOpenInviteWorkspaceExpert(true)}
              >
                + <span className="pl-1">Invite expert</span>
              </Button>

              <Button
                size="large"
                style={{ height: 38 }}
                type="primary mb-3"
                onClick={() => setOpenAddProductMeber(true)}
              >
                + <span className="pl-1">Add teammmate</span>
              </Button>
            </div>
          ) : (
            <Button
              size="large"
              style={{ height: 38 }}
              type="primary mb-3"
              onClick={() => setOpenSelectWorkSpase(true)}
            >
              + <span className="pl-1">Add workspace</span>
            </Button>
          )}
        </div>

        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          className="tab-bordered-style"
          items={[
            {
              label: `Teammates`,
              key: 'Teammates',
              children: <Teammates />,
            },
            {
              label: `Workspaces`,
              key: 'Workspaces',
              children: <Workspaces />,
            },
          ]}
        />
      </div>
      <InviteExpert
        open={openInviteWorkspaceExpert}
        onClose={() => setOpenInviteWorkspaceExpert(false)}
      />

      <AddProductMeber
        open={openAddProductMeber}
        onClose={() => setOpenAddProductMeber(false)}
      />

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

export default TeammateAndWorkspaces;
