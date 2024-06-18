/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Button, Divider, Modal, Tooltip } from 'antd';
import 'cropperjs/dist/cropper.css';
import React, { useState } from 'react';
import Cropper from 'react-cropper';
import useTranslation from '../helpers/useTranslation';

const imageDataUrlToFile = (dataUrl, filename) => {
  const blob = dataUrlToBlob(dataUrl);
  return new File([blob], filename, { type: 'image/webp' });
};

const dataUrlToBlob = (dataUrl) => {
  const base64Data = dataUrl.split(',')[1];
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }

  const byteArray = new Uint8Array(byteArrays);
  return new Blob([byteArray], { type: 'image/webp' });
};

function ImgCropper({
  src,
  fileName,
  open,
  onCroped,
  onUrlChange,
  onClose,
  aspect,
  ...props
}) {
  const cropperRef = React.createRef();
  const { t } = useTranslation();

  const getCropData = () => {
    const croppedImage = cropperRef.current.cropper
      .getCroppedCanvas()
      .toDataURL('image/webp');
    onUrlChange?.(croppedImage);
    const imageFile = imageDataUrlToFile(croppedImage, fileName);
    onCroped?.(imageFile);
  };

  // zoom handlers
  const handleZoomIn = () => {
    cropperRef.current?.cropper?.zoom?.(0.1);
  };
  const handleZoomOut = () => {
    cropperRef.current?.cropper?.zoom?.(-0.1);
  };

  // move handlers
  const handleMoveLeft = () => {
    cropperRef.current?.cropper?.move?.(-10, 0);
  };
  const handleMoveRight = () => {
    cropperRef.current?.cropper?.move?.(10, 0);
  };
  const handleMoveUp = () => {
    cropperRef.current?.cropper?.move?.(0, -10);
  };
  const handleMoveDown = () => {
    cropperRef.current?.cropper?.move?.(0, 10);
  };

  // rotate handlers
  const handleRotateLeft = () => {
    cropperRef.current?.cropper?.rotate?.(-18);
  };
  const handleRotateRight = () => {
    cropperRef.current?.cropper?.rotate?.(18);
  };

  // scale handlers
  const [scaleX, setScaleX] = useState(-1);
  const handleScaleLeftRight = () => {
    setScaleX((scaleX) => (scaleX === 1 ? -1 : 1));
    cropperRef.current?.cropper?.scaleX?.(scaleX);
  };
  const [scaleY, setScaleY] = useState(-1);
  const handleScaleUpDown = () => {
    setScaleY((scaleY) => (scaleY === 1 ? -1 : 1));
    cropperRef.current?.cropper?.scaleY?.(scaleY);
  };

  // reset handler
  const handleReset = () => {
    cropperRef.current?.cropper?.reset?.();
  };

  // close handler
  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal
      open={open}
      footer={null}
      bodyStyle={{ padding: '25px 0px' }}
      title={t('Edit Image')}
      width={600}
      onCancel={handleClose}
      zIndex={1010}
    >
      <div className="px-4 w-100">
        <Cropper
          aspectRatio={aspect}
          style={{ height: 400, width: '100%' }}
          initialAspectRatio={aspect}
          preview=".img-preview"
          src={src}
          ref={cropperRef}
          {...props}
        />

        <div
          className="d-flex align-items-center mt-3 flex-wrap justify-content-center"
          style={{ gap: 8 }}
        >
          <div className="d-flex">
            <Tooltip title={t('Zoom In')}>
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: '4px 0px 0px 4px' }}
                icon={<ZoomInOutlined />}
                onClick={handleZoomIn}
              />
            </Tooltip>
            <Tooltip title={t('Zoom Out')}>
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: '0px 4px 4px 0px' }}
                icon={<ZoomOutOutlined />}
                onClick={handleZoomOut}
              />
            </Tooltip>
          </div>
          <div className="d-flex">
            <Tooltip title={t('Move Left')}>
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: '4px 0px 0px 4px' }}
                icon={<ArrowLeftOutlined />}
                onClick={handleMoveLeft}
              />
            </Tooltip>
            <Tooltip title={t('Move Right')}>
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: 0 }}
                icon={<ArrowRightOutlined />}
                onClick={handleMoveRight}
              />
            </Tooltip>
            <Tooltip title={t('Move Up')}>
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: 0 }}
                icon={<ArrowUpOutlined />}
                onClick={handleMoveUp}
              />
            </Tooltip>
            <Tooltip title={t('Move Down')}>
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: '0px 4px 4px 0px' }}
                icon={<ArrowDownOutlined />}
                onClick={handleMoveDown}
              />
            </Tooltip>
          </div>
          <div className="d-flex">
            <Tooltip title={t('Rotate Left')}>
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: '4px 0px 0px 4px' }}
                icon={<RotateLeftOutlined />}
                onClick={handleRotateLeft}
              />
            </Tooltip>
            <Tooltip title={t('Rotate Right')}>
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: '0px 4px 4px 0px' }}
                icon={<RotateRightOutlined />}
                onClick={handleRotateRight}
              />
            </Tooltip>
          </div>
          <div className="d-flex">
            <Tooltip title={t('Scale Left-Right')}>
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: '4px 0px 0px 4px' }}
                icon={<SwapOutlined />}
                onClick={handleScaleLeftRight}
              />
            </Tooltip>
            <Tooltip title={t('Scale Up-Down')}>
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: '0px 4px 4px 0px' }}
                icon={<SwapOutlined style={{ transform: 'rotate(90deg)' }} />}
                onClick={handleScaleUpDown}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip title={t('Reset')}>
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: '4px 0px 0px 4px' }}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="23 4 23 10 17 10" />
                    <polyline points="1 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                }
                onClick={handleReset}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <Divider className="mb-3" />
      <div
        className="d-flex justify-content-end align-items-center px-4 mb-n2"
        style={{ gap: 10 }}
      >
        <Button
          type="text btn-text-md text-black px-4"
          size="large"
          onClick={handleClose}
        >
          {t('Cancel')}
        </Button>
        <Button
          type="primary btn-text-md px-4"
          size="large"
          onClick={getCropData}
        >
          <span className="px-3">{t('Save')}</span>
        </Button>
      </div>
    </Modal>
  );
}

export default ImgCropper;
