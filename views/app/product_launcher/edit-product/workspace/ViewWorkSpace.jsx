/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import { Button, Divider, Modal } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ViewWorkSpace = ({ open, onNext, form, onClose }) => {
  const { data: workspaces } = useSelector(
    ({ workspaceCategory }) => workspaceCategory.workspaceCategories
  );

  const workspace_type = useWatch('workspace_type', form);

  const [selectedWorkspaceType, setSelectedWorkspaceType] = useState(null);

  useEffect(() => {
    setSelectedWorkspaceType(
      workspaces?.find?.(({ id }) => id === workspace_type)
    );
  }, [workspaces, workspace_type]);

  return (
    <Modal
      footer={null}
      open={open}
      closable={false}
      width={646}
      zIndex={1001}
      className="custom_styles"
    >
      <div className="px-2 py-3 product-launcher-container bg-white">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="h5 h5-lg text-black text-elps">
            {selectedWorkspaceType?.title}
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

        <div
          className="d-flex flex-column flex-md-row my-4 py-2"
          style={{ gap: '7%' }}
        >
          <img
            src={selectedWorkspaceType?.icon}
            alt=""
            style={{ height: 112, width: 109 }}
          />
          <div>
            <h6 className="h6-lg mb-3">{selectedWorkspaceType?.description}</h6>
            {/* <p className="p-sm text-grey-light">
              {selectedWorkspaceType?.description}
            </p> */}
          </div>
        </div>

        <Divider
          className="my-0"
          style={{ borderBottom: '1px solid #C4C4C4' }}
        />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-end mt-3">
          <div>
            <h6 className="h6-sm">Co-created with:</h6>
            <img
              src={selectedWorkspaceType?.co_created_with}
              alt=""
              style={{ height: 40 }}
            />
          </div>
          <Button
            style={{ height: 40 }}
            type="primary btn-text-md px-5 "
            size="large"
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewWorkSpace;
