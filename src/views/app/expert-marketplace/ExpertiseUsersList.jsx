import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import usePermission from '../../../hooks/usePermission';
import { getExpertiseSubmissions } from '../../../redux/actions';
import ExpertiseCreateEdit from './ExpertMarketplaceCreateEdit.jsx';
import ExpertiseUsersTable from './ExpertiseUsersTable';

const ExpertiseUsersList = () => {
  const [openCreateExpertMarketplace, setOpenCreateExpertMarketplace] =
    useState(false);

  const { hasCreatePermission } = usePermission({
    path: '/app/expertise',
  });

  const { expertiseName, expertiseId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <Link to="/app/expert-marketplace/expetises">
          <div
            className="d-flex align-items-center mt-n2"
            style={{ marginBottom: 30 }}
          >
            <img src="/assets/img/icons/back.svg" alt="" className="mr-3" />
            <h6 className="fs-13 fw-6 mb-0">Back to expertise</h6>
          </div>
        </Link>
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="fs-36 fw-8 mb-0">{expertiseName}</h2>
          <Button
            type="primary mb-3"
            onClick={() => {
              setOpenCreateExpertMarketplace(true);
              history.push(`/app/expert-marketplace/expetises`);
            }}
            disabled={!hasCreatePermission}
          >
            + Create expertise
          </Button>
        </div>

        <Form layout="vertical" form={form} name="control-hooks">
          <Form.Item name="search">
            <Input
              size="small"
              style={{
                height: 38,
                marginTop: 18,
                maxWidth: 570,
                border: '1px solid #D1D5DB',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                borderRadius: 6,
              }}
              placeholder="Search for an user"
              prefix={<img src="/assets/img/icons/search.svg" alt="search" />}
              onChange={({ target }) =>
                dispatch(
                  getExpertiseSubmissions({
                    gig_id: expertiseId,
                    search: target.value || undefined,
                  })
                )
              }
            />
          </Form.Item>
        </Form>

        <ExpertiseUsersTable form={form} />
      </div>

      <ExpertiseCreateEdit
        open={openCreateExpertMarketplace}
        onClose={() => setOpenCreateExpertMarketplace(false)}
      />
    </>
  );
};

export default ExpertiseUsersList;
