import { Button, Modal } from 'antd';
import React, { useEffect } from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContest } from '../../../../redux/actions';

const DeleteContest = ({ onCancel, contest: contestData, ...props }) => {
  const { status } = useSelector(({ contest }) => contest.contestDeleteAction);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'submitted') {
      onCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleDeleteContest = () => {
    dispatch(
      deleteContest({ id: contestData?.id, status: contestData?.contest_state })
    );
  };

  return (
    <Modal
      open={contestData?.id}
      width={598}
      footer={null}
      closeIcon={<CloseOutlined onClick={onCancel} />}
      {...props}
      className="contest-container"
    >
      <center className="p-2 p-lg-5">
        <h6 className="fs-20 fw-5 mb-3">
          Are you sure you want to delete this contest?
        </h6>
        <p className="fs-16 fw-3 text-grey-light">
          This action cannot be undone and you will have to start over to create
          a new one.
        </p>
        <div>
          <Button type="default border-0" size="large" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="primary br-5 ml-3"
            size="large"
            style={{ background: '#FF5A5F', borderColor: '#FF5A5F !important' }}
            onClick={handleDeleteContest}
            loading={status === 'submitting'}
          >
            Delete contest
          </Button>
        </div>
      </center>
    </Modal>
  );
};

export default DeleteContest;
