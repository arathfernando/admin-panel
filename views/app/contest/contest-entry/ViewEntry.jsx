/* eslint-disable jsx-a11y/alt-text */
import { Button, Modal } from 'antd';
import { isEmpty } from "lodash";
import React from 'react';
import SimpleBar from "simplebar-react";
import { FileViewer } from '../../../../components/util-components/FilesViewer';
import useMediaQuery from '../../../../hooks/useMediaQuery';

const ViewEntry = ({ open, entryData, onClose }) => {
  const { md } = useMediaQuery()

  return (
    <Modal
      open={open}
      title={<h5 className="text-black fs-16 fw-6">Contest Entry files</h5>}
      footer={null}
      width={741}
      onCancel={onClose}
    >
      {!isEmpty(entryData?.contestant_submission_upload) ? entryData?.contestant_submission_upload?.map(
        ({ file_url, id }, index) => (
          <div className="d-flex flex-column" key={`${index}-${id}`} style={{ gap: 24 }}>
            <div
              className="w-100 d-flex flex-column justify-content-between"
              style={{
                minHeight: 400,
                gap: 18,
              }}
            >
              <div>
                <SimpleBar className="position-relative" style={{ maxHeight: md ? 'calc(100vh - 157px)' : '50vh' }}>
                  <FileViewer filePath={file_url} className="h-100" key={`${index}-${id}`} />
                </SimpleBar>
              </div>

              <div className="d-flex justify-content-end flex-shrink-0">
                <Button
                  type="ghost px-5 br-4"
                  style={{ borderWidth: 2 }}
                  size="large"
                  icon={
                    <img
                      alt="download"
                      src="/assets/img/icons/download-2.svg"
                      className="me-1"
                    />
                  }
                  onClick={() => window.location.assign(file_url)}
                >
                  Download file
                </Button>
              </div>
            </div>
          </div>
        )
      ) : <div className='d-flex justify-content-center align-items-center' style={{ minHeight: 300 }}><h5 className='h6-lg'>No files uploaded</h5></div>}

    </Modal>
  );
};

export default ViewEntry;
