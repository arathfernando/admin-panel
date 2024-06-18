/* eslint-disable no-unused-expressions */
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { isArray, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import useTranslation from '../../helpers/useTranslation';

const FileUploadMultiple = ({
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
    if (!value?.find?.((file) => file instanceof File)?.name) {
      setFiles(() =>
        !isEmpty(value)
          ? value?.map?.((fileUrl) => ({
              uid: Math.random(),
              name: fileUrl?.slice?.(value?.lastIndexOf?.('/') + 1),
              status: 'done',
              url: fileUrl,
              thumbUrl: fileUrl,
            }))
          : []
      );
    }
  }, [value]);

  const beforeHandle = (file) => {
    const isLt2M = file.size / 1024 / 1024 < maxSize;
    if (!isLt2M) {
      message.error(`File must smaller than ${maxSize}MB!`);
    }
    const uid = Math.random();

    onChange?.([...(isArray(value) ? value : []), file]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFiles((state) => [
          ...state,
          {
            uid,
            name: file.name,
            status: 'done',
            url: reader.result,
            thumbUrl: reader.result,
          },
        ]);
      }
    };
    reader.readAsDataURL(file);

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
        onRemove={() => onChange?.([])}
        {...props}
      >
        {children || <Button icon={<UploadOutlined />}>{t('Upload')}</Button>}
      </Upload>
    </>
  );
};

export default FileUploadMultiple;
