import { Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { ImageSvg } from '../../../assets/svg/icon';
import CustomIcon from '../CustomIcon';

const { Dragger } = Upload;

const AvatarUpload = ({ statusChange, image }) => {
  const [uploadedImg, setImage] = useState('');

  useEffect(() => {
    setImage(image);
  }, [image]);

  const imageUploadProps = {
    name: 'avatar',
    multiple: false,
    listType: 'picture-card',
    showUploadList: false,
  };

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpg' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/webp';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    if (isJpgOrPng && isLt2M) {
      setImage(file);
      statusChange(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <Dragger {...imageUploadProps} beforeUpload={beforeUpload}>
      {uploadedImg ? (
        <img src={uploadedImg} alt="avatar" className="img-fluid" />
      ) : (
        <div>
          <div>
            <CustomIcon className="display-3" svg={ImageSvg} />
            <p>Click or drag file to upload</p>
          </div>
        </div>
      )}
    </Dragger>
  );
};

export default AvatarUpload;
