/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Badge, Image as Img, Upload, message } from 'antd';
import React, { useState } from 'react';
import useTranslation from '../helpers/useTranslation';
import ImgCropper from './ImgCropper';

const ImageCrop = ({
  name,
  onChange,
  onUrlChange,
  value,
  disabled = false,
  preview = false,
  propsToUpload,
  children,
  imgUrl,
  center,
  className,
  aspect = 1,
  style = {},
  maxSizeMB = 2,
  ...props
}) => {
  const [url, setUrl] = React.useState('');
  const { t } = useTranslation();

  const [openCropperWithImageDataUrl, setOpenCropperWithImageDataUrl] =
    useState('');
  const [fileName, setFileName] = useState('');

  React.useEffect(() => {
    setUrl(value);
  }, [value]);

  React.useEffect(() => {
    imgUrl && setUrl(imgUrl);
  }, [imgUrl]);

  const beforeHandle = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/webp' ||
      file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error(t('You can only upload JPG/PNG/WEBP file!'));
    }
    const isLtmaxSizeMB = file.size / 1024 / 1024 < maxSizeMB;
    if (!isLtmaxSizeMB) {
      message.error(`Image must be smaller than ${maxSizeMB}MB!`);
      return;
    }
    if (isJpgOrPng && isLtmaxSizeMB) {
      setFileName(file?.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          onUrlChange?.(reader.result);
          setOpenCropperWithImageDataUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
    return isJpgOrPng && isLtmaxSizeMB;
  };

  const onCloseCropper = () => {
    setOpenCropperWithImageDataUrl(null);
    setFileName('');
  };

  return (
    <>
      <div
        className={`img-crop${center ? ' center' : ''}${
          className ? ` ${className}` : ''
        }`}
        style={{ aspectRatio: `${aspect}/1`, minHeight: 80, ...style }}
      >
        <Upload
          name={name || 'image'}
          listType="picture-card"
          multiple={false}
          disabled={disabled}
          showUploadList={false}
          beforeUpload={beforeHandle}
          style={{ width: '100%' }}
          {...propsToUpload}
        >
          {url ? (
            <Badge
              count={
                <CloseOutlined
                  color="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUrl('');
                    onChange?.('');
                  }}
                />
              }
            >
              <Img preview={preview} src={url} />
            </Badge>
          ) : (
            <div>{children || <PlusOutlined />}</div>
          )}
        </Upload>
      </div>

      <ImgCropper
        src={openCropperWithImageDataUrl}
        open={openCropperWithImageDataUrl}
        fileName={fileName}
        onClose={onCloseCropper}
        onUrlChange={(url) => {
          onCloseCropper();
          setTimeout(() => {
            setUrl(url);
            onUrlChange?.(url);
          }, 0);
        }}
        onCroped={(file) => {
          onCloseCropper();
          onChange(file);
        }}
        aspect={aspect}
        {...props}
      />
    </>
  );
};

export default ImageCrop;
