import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Switch,
  Upload,
  message,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Col, Row } from 'reactstrap';
import ImgCropper from '../../../../../components/ImgCropper';
import Loading from '../../../../../components/util-components/Loading';
import SearchLocation from '../../../../../helpers/SearchLocation';
import {
  getNationalities,
  updateUserGeneral,
} from '../../../../../redux/actions';

const GeneralProfile = () => {
  const { data: nationalities, loading: loadingNationalities } = useSelector(
    ({ nationality }) => nationality.nationalities
  );
  const { status } = useSelector(({ users }) => users.userGeneralAction);
  const { isRefetching, loading, error } = useSelector(
    ({ users }) => users,
    shallowEqual
  );
  const genarelProfile = useSelector(
    ({ users }) => users.singleUser || {},
    shallowEqual
  );

  const [openCropperWithImageDataUrl, setOpenCropperWithImageDataUrl] =
    useState('');
  const [fileName, setFileName] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [imgFile, setImgFile] = useState();

  const [address, setAddress] = useState({});

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams();

  // set user data
  useEffect(() => {
    if (!isEmpty(genarelProfile)) {
      form.setFieldsValue({
        ...genarelProfile,
        is_hubber_team: genarelProfile.user?.is_hubber_team === 'TRUE',
        status: genarelProfile.user?.status,
        email: genarelProfile.user?.email,
        birth_date:
          genarelProfile.birth_date &&
          moment(genarelProfile.birth_date, 'YYYY-MM-DD'),
      });
      setAddress({
        ...(genarelProfile.location
          ? { location: genarelProfile.location }
          : {}),
      });
    } else {
      form.resetFields();
      setAddress({});
    }
  }, [genarelProfile]);

  useEffect(() => {
    if (genarelProfile.avatar) {
      setImgUrl(genarelProfile.avatar);
    }
  }, [genarelProfile.avatar]);

  useEffect(() => {
    dispatch(getNationalities());
  }, []);

  const onFinish = ({ birth_date, is_hubber_team, ...values }) => {
    if (isEmpty(address)) {
      form.setFieldValue('location');
      return;
    }
    dispatch(
      updateUserGeneral({
        ...values,
        ...address,
        is_hubber_team: is_hubber_team ? 'TRUE' : 'FALSE',
        avatar: imgFile || genarelProfile.avatar,
        birth_date: moment(birth_date).format('YYYY-MM-DD'),
        id,
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
      message.error('You can only upload JPG/PNG/WEBP file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
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
    <div className="bg-white mb=0 mb-sm-2">
      <div
        className="p-4 p-md-5 position-relative mx-auto w-100"
        style={{ maxWidth: 1000 }}
      >
        <Loading loading={loading && !isRefetching} />
        <Form
          form={form}
          onFinish={onFinish}
          className="custom-form-style"
          layout="vertical"
        >
          <Row>
            <Col xs={12} sm={5} md={4} lg={3}>
              <div
                className="d-flex flex-column align-items-center"
                style={{ gap: 25 }}
              >
                <div
                  style={{
                    height: 115,
                    width: 115,
                  }}
                  className="overflow-hidden"
                >
                  <Avatar
                    src={imgUrl || '/assets/img/icons/user.svg'}
                    className="w-100 h-100"
                    alt=""
                  />
                </div>

                <div className="overflow-hidden">
                  <Upload
                    multiple={false}
                    beforeUpload={beforeHandle}
                    fileList={[]}
                  >
                    <h6
                      className="h6-lg mb-0 cursor-pointer"
                      style={{ color: '#0083C8' }}
                    >
                      Change picture
                    </h6>
                  </Upload>
                </div>

                <div className="d-flex align-items-center" style={{ gap: 8 }}>
                  <b>hubbers team</b>
                  <Form.Item
                    name="is_hubber_team"
                    valuePropName="checked"
                    noStyle
                  >
                    <Switch />
                  </Form.Item>
                </div>
              </div>
            </Col>

            <Col xs={12} sm={7} md={8} lg={9}>
              <div className="d-flex flex-column" style={{ gap: 34 }}>
                <Form.Item
                  name="status"
                  label={<span className="fs-16 fw-6">Status</span>}
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <Select
                    className="mt-2"
                    options={[
                      {
                        value: 'ACTIVE',
                        label: 'ACTIVE',
                      },
                      {
                        value: 'INACTIVE',
                        label: 'INACTIVE',
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  name="first_name"
                  label={<span className="fs-16 fw-6">First name</span>}
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <Input className="mt-2" placeholder="First name" />
                </Form.Item>

                <Form.Item
                  name="last_name"
                  label={<span className="fs-16 fw-6">Last name</span>}
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <Input className="mt-2" placeholder="Last name" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label={<span className="fs-16 fw-6">Email</span>}
                  style={{ marginBottom: 0 }}
                  rules={[
                    {
                      required: true,
                      message: 'This field is required',
                    },
                    { type: 'email', message: 'This is not a valid email' },
                  ]}
                >
                  <Input
                    className="mt-2"
                    type="email"
                    placeholder="admin@hubbe.rs"
                  />
                </Form.Item>

                <Form.Item
                  name="nationality"
                  label={<span className="fs-16 fw-6">Nationality</span>}
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <Select
                    className="mt-2"
                    placeholder="Costa RIca"
                    showSearch
                    optionFilterProp="label"
                    options={nationalities?.map(
                      ({ nationality: value, nationality: label }) => ({
                        value,
                        label,
                      })
                    )}
                    loading={loadingNationalities}
                  />
                </Form.Item>

                <Form.Item
                  name="location"
                  label={<span className="fs-16 fw-6">Where do you live?</span>}
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <SearchLocation
                    initialValue={form.getFieldValue('location')}
                    onLocationSelect={(data, location) => {
                      setAddress({
                        location: `${data.name} ${
                          data.address_components.find(
                            // eslint-disable-next-line no-shadow
                            (data) => data.types[0] === 'country'
                          )?.long_name || ''
                        }`,
                        longitude: location.lng,
                        latitude: location.lat,
                      });
                    }}
                    placeholder="France"
                    className="w-100 mt-2 br-6"
                    style={{
                      border: '1px solid #d1d5db',
                      minHeight: 36,
                      padding: '4px 11px',
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="birth_date"
                  label={<span className="fs-16 fw-6">Date of birth</span>}
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <DatePicker className="mt-2 w-100" placeholder="03/03/1996" />
                </Form.Item>

                <Form.Item
                  name="bio"
                  label={<span className="fs-16 fw-6">Bio</span>}
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <TextArea
                    className="mt-2"
                    placeholder="Write your bio here"
                    autoSize
                    style={{ minHeight: 144 }}
                  />
                </Form.Item>

                <div className="d-flex justify-content-end">
                  <Button
                    type="primary btn-text-md px-4"
                    size="large"
                    htmlType="submit"
                    style={{ height: 49 }}
                    onClick={() => {}}
                    disabled={(loading && !isRefetching) || error}
                    loading={status === 'submitting'}
                  >
                    <span className="px-3">Save changes</span>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
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

export default GeneralProfile;
