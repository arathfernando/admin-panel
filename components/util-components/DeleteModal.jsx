import { Button, Modal } from 'antd';
import React from 'react';

const DeleteModal = ({
  onDelete,
  status,
  loading = false,
  open,
  onClose,
  name = '',
  title = '',
  description = 'This action cannot be undone and you will have to start over to create a new one.',
  actionButtonText = '',
  ...props
}) => {
  return (
    <Modal
      open={open}
      width={535}
      footer={null}
      closeIcon={<></>}
      bodyStyle={{ minHeight: 250, display: 'flex' }}
      onCancel={onClose}
      {...props}
    >
      <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center px-3 px-md-4 py-3 py-md-4 my-2">
        <h4 className="h4-lg text-center" style={{ marginBottom: 20 }}>
          {title || `Are you sure you want to delete this ${name}?`}
        </h4>
        <p
          className="p-md text-center text-grey-light"
          style={{ marginBottom: 20 }}
        >
          {description}
        </p>
        <div
          className="d-flex justify-content-center align-items-center flex-wrap"
          style={{ gap: 20 }}
        >
          <Button
            type="text fw-6 btn-text-md px-4 br-4"
            size="large"
            onClick={onClose}
            style={{ height: 31 }}
          >
            Cancel
          </Button>
          <Button
            type="text btn-text-md px-4 br-4"
            size="large"
            style={{ borderColor: '#FF5A5F', color: '#FF5A5F', height: 31 }}
            onClick={onDelete}
            loading={loading || status === 'submitting'}
          >
            <span className="px-4">{actionButtonText || 'Delete'}</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
