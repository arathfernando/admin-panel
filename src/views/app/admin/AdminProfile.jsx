/* eslint-disable camelcase */
import { Avatar, Button, Form, Input, Select, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ImgCropper from '../../../components/ImgCropper';
import countries from '../../../constants/countries';
import useTranslation from '../../../helpers/useTranslation';
import { getPermissions, updateAdmin } from '../../../redux/actions';

const AdminProfile = () => {
  const { data: permissions, loading } = useSelector(
    ({ permission }) => permission.permissions
  );

  const currentAdmin = useSelector(
    ({ admins }) => admins.currentAdmin.data,
    shallowEqual
  );

  const { loading: submitting } = useSelector((state) => state.admins);

  const [imgUrl, setImgUrl] = useState('');
  const [imgFile, setImgFile] = useState();

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [openCropperWithImageDataUrl, setOpenCropperWithImageDataUrl] =
    useState('');
  const [fileName, setFileName] = useState('');

  const { t } = useTranslation();

  useEffect(() => {
    form.setFieldsValue({
      ...currentAdmin,
      password: '',
      admin_role: currentAdmin.admin_role?.map(({ id }) => id),
    });
  }, [currentAdmin, form]);

  useEffect(() => {
    if (currentAdmin?.profile_image) {
      setImgUrl(currentAdmin.profile_image);
    }
  }, [currentAdmin.profile_image]);

  useEffect(() => {
    dispatch(getPermissions());
  }, [dispatch]);

  const onFinish = ({ admin_role, ...values }) => {
    dispatch(
      updateAdmin({
        adminData: {
          ...values,
          admin_role: admin_role.toString(),
          profile_image: imgFile,
        },
        id: currentAdmin?.id,
      })
    );
  };

  const beforeHandle = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/webp' ||
      file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error(t('You can only upload JPG/PNG/WEBP file!'));
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(t('Image must be smaller than 2MB!'));
      return;
    }
    if (isJpgOrPng && isLt2M) {
      setFileName(file?.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setOpenCropperWithImageDataUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
    return isJpgOrPng && isLt2M;
  };

  const onCloseCropper = () => {
    setOpenCropperWithImageDataUrl(null);
    setFileName('');
    setImgFile(null);
  };

  return (
    <div className="bg-white" style={{ minHeight: '100vh', padding: 56 }}>
      <div className="mx-auto custom_styles" style={{ maxWidth: 664 }}>
        <Form
          hideRequiredMark
          form={form}
          onFinish={onFinish}
          className="custom-form-style"
          layout="vertical"
        >
          <h3 className="h3-lg" style={{ marginBottom: 23 }}>
            Admin profile
          </h3>

          <div
            style={{
              height: 115,
              width: 115,
              marginBottom: 25,
            }}
            className="overflow-hidden"
          >
            <Avatar
              src={imgUrl || '/assets/img/icons/user.svg'}
              className="w-100 h-100"
              alt=""
            />
          </div>

          <div style={{ marginBottom: 51 }} className="overflow-hidden">
            <Upload multiple={false} beforeUpload={beforeHandle} fileList={[]}>
              {' '}
              <h6
                className="h6-lg mb-0 cursor-pointer"
                style={{ color: '#0083C8' }}
              >
                Change picture
              </h6>
            </Upload>
          </div>

          <Form.Item
            name="first_name"
            requiredMark
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h5 className="h5-lg required-mark">First name</h5>}
            style={{ marginBottom: 54 }}
          >
            <Input placeholder="Benjamin" style={{ height: 37 }} />
          </Form.Item>

          <Form.Item
            name="last_name"
            requiredMark
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h5 className="h5-lg required-mark">Last name</h5>}
            style={{ marginBottom: 54 }}
          >
            <Input placeholder="Vignon" style={{ height: 37 }} />
          </Form.Item>

          <Form.Item
            name="email"
            requiredMark
            rules={[
              { required: true, message: 'This field is required' },
              { type: 'email', message: 'This is not a valid email' },
            ]}
            label={<h5 className="h5-lg required-mark">Email</h5>}
            style={{ marginBottom: 54 }}
          >
            <Input
              placeholder="admin@hubbe.rs"
              type="email"
              style={{ height: 37 }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            requiredMark
            rules={[{ required: true, message: 'This field is required' }]}
            label={
              <div
                className="d-flex justify-content-between"
                style={{ width: 664, maxWidth: '100%' }}
              >
                <h5 className="h5-lg required-mark">Password</h5>
                <Link to="/app/admin/change-password">
                  <h6 className="h6-lg" style={{ color: '#0083C8' }}>
                    Change password
                  </h6>
                </Link>
              </div>
            }
            style={{ marginBottom: 54 }}
          >
            <Input
              placeholder="*********"
              type="password"
              style={{ height: 37 }}
            />
          </Form.Item>

          <Form.Item
            name="mobile_number"
            requiredMark
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h5 className="h5-lg required-mark">Mobile number</h5>}
            style={{ marginBottom: 54 }}
          >
            <Input
              placeholder="6 74 37 90 54"
              style={{ height: 37 }}
              addonBefore={
                <Form.Item
                  noStyle
                  name="country_code"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <Select
                    style={{ minWidth: 100 }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="+33"
                    options={countries.map(({ label, phone }) => ({
                      value: `+${phone}`,
                      label: `+${phone}`,
                      search: `+${phone} ${label}`,
                    }))}
                    showSearch
                    optionFilterProp="search"
                  />
                </Form.Item>
              }
            />
          </Form.Item>

          <Form.Item
            name="admin_role"
            requiredMark
            rules={[{ required: true, message: 'This field is required' }]}
            label={<h5 className="h5-lg required-mark">Admin role</h5>}
            style={{ marginBottom: 54 }}
          >
            <Select
              mode="multiple"
              placeholder="Admin"
              options={permissions.map(({ id: value, role_name: label }) => ({
                label,
                value,
              }))}
              optionFilterProp="label"
              loading={loading}
            />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <Button
              type="primary btn-text-md px-4"
              size="large"
              style={{ height: 49 }}
              htmlType="submit"
              loading={submitting}
            >
              <span className="px-2">Save changes</span>
            </Button>
          </div>
        </Form>
      </div>

      <ImgCropper
        src={openCropperWithImageDataUrl}
        open={openCropperWithImageDataUrl}
        onClose={onCloseCropper}
        onUrlChange={(url) => {
          onCloseCropper();
          setTimeout(() => {
            setImgUrl(url);
          }, 0);
        }}
        onCroped={(file) => {
          onCloseCropper();
          setImgFile(file);
        }}
        fileName={fileName}
        aspect={1}
      />
    </div>
  );
};

export default AdminProfile;
