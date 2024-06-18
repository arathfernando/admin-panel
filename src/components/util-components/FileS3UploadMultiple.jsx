/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import useTranslation from '../../helpers/useTranslation';

const FileS3UploadMultiple = ({
  children,
  onChange,
  value,
  accept = '*',
  maxSize = 200,
  ...props
}) => {
  const [files, setFiles] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    setFiles(() =>
      !isEmpty(value)
        ? value?.map?.((value) => ({
            uid: Math.random(),
            name: value?.slice?.(value?.lastIndexOf?.('/') + 1),
            status: 'done',
            url: value,
            thumbUrl: value,
          }))
        : []
    );
  }, [value]);

  const beforeHandle = (file) => {
    const isLt2M = file.size / 1024 / 1024 < maxSize;
    if (!isLt2M) {
      message.error(`File must smaller than ${maxSize}MB!`);
    }

    const uid = Math.random();
    const uploadFile = (file) => {
      const params = {
        Body: file,
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: file.name,
      };

      setFiles((state) => [
        ...state,
        {
          uid,
          name: file.name,
          status: 'uploading',
        },
      ]);

      // awsBucket.putObject(params).on('success', () => {
      //   console.log('success', file.name);
      setTimeout(() => {
        onChange?.([
          ...files?.map(({ url }) => url),
          file.uid
            ? `https://hubbers-assets.s3.eu-central-1.amazonaws.com/${file.name}`
            : '',
        ]);
      }, 0);
      // });
    };
    uploadFile(file);

    return file;
  };

  return (
    <>
      <Upload
        accept={accept}
        customRequest={() => null}
        listType="picture"
        className="file-s3-upload"
        beforeUpload={beforeHandle}
        multiple
        fileList={[...files]}
        onRemove={() => onChange?.('')}
        {...props}
      >
        {children || <Button icon={<UploadOutlined />}>{t('Upload')}</Button>}
      </Upload>
    </>
  );
};

export default FileS3UploadMultiple;
