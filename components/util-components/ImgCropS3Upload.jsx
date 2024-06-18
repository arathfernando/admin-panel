import {
  CloseOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Badge, Image as Img, Upload, message } from 'antd';
import React, { useState } from 'react';
import awsBucket from '../../helpers/aws_export';
import useTranslation from '../../helpers/useTranslation';
import ImgCropper from '../ImgCropper';

const ImgCropS3Upload = ({
  name,
  onChange,
  onUrlChange,
  value,
  disabled = false,
  preview = false,
  propsToUpload,
  noStyle = false,
  children,
  className,
  aspect = 1,
  style = {},
  maxSizeMB = 25,
  accept = '.jpeg, .jpg, .png, .webp',
  ...props
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [url, setUrl] = React.useState('');

  const [openCropperWithImageDataUrl, setOpenCropperWithImageDataUrl] =
    useState('');
  const [fileName, setFileName] = useState('');

  const { t } = useTranslation();

  React.useEffect(() => {
    setUrl(value);
  }, [value]);

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
      message.error(
        t('Image size must be smaller than {{maxSizeMB}}MB!', { maxSizeMB })
      );
      return;
    }

    if (isJpgOrPng && isLtmaxSizeMB) {
      setFileName(file?.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setOpenCropperWithImageDataUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }

    return isJpgOrPng && isLtmaxSizeMB;
  };

  const handleUploadToS3Bucket = (file) => {
    const timestamp = new Date().toISOString();
    const uploadFile = (file) => {
      const params = {
        Body: file,
        Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
        Key: `${timestamp}-${file.name}`,
      };

      awsBucket
        .putObject(params)
        .on('complete', () => {
          onChange?.(
            `https://hubbers-assets.s3.eu-central-1.amazonaws.com/${timestamp}-${file.name}`
          );
        })
        .send(() => null);
    };
    uploadFile(file);
  };

  const changeHandle = (info) => {
    if (info.file.status === 'uploading') {
      setIsLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const imageUrl = info.file.response.location;
      setUrl(imageUrl);
      onUrlChange?.(imageUrl);
      setIsLoading(false);
    }
  };

  const onCloseCropper = () => {
    setOpenCropperWithImageDataUrl(null);
    setFileName('');
  };

  return (
    <>
      <div
        className={`img-crop img-crop-s3${noStyle ? ' no-style' : ''}${
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
          onChange={changeHandle}
          style={{ width: '100%' }}
          accept={accept}
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
            <>
              {isLoading ? (
                <LoadingOutlined onClick={() => setIsLoading(false)} />
              ) : (
                children || <PlusOutlined />
              )}
            </>
          )}
        </Upload>
      </div>{' '}
      <ImgCropper
        src={openCropperWithImageDataUrl}
        open={openCropperWithImageDataUrl}
        fileName={fileName}
        onClose={onCloseCropper}
        onUrlChange={(url) => {
          onCloseCropper();
          setTimeout(() => {
            setUrl(url);
          }, 0);
        }}
        onCroped={(file) => {
          onCloseCropper();
          handleUploadToS3Bucket(file);
        }}
        aspect={aspect}
        {...props}
      />
    </>
  );
};

export default ImgCropS3Upload;
