/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Tooltip } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import UploadImage from '../../../../components/UploadImage';
import CKEditor5 from '../../../../components/util-components/CkEditor';
import CountrySelect from '../../../../components/util-components/selector/CountrySelect';
import LanguageSelect from '../../../../components/util-components/selector/LanguageSelect';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import SearchLocation from '../../../../helpers/SearchLocation';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';

const { Option } = Select;
const { TextArea } = Input;
const EditCommunity = ({ id, data }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [address, setAddress] = useState({});

  const { hasEditPermission } = usePermission({ path: '/app/community/all' });

  const { communityId } = useParams();

  useEffect(() => {
    if (communityId) {
      showDrawer();
    }
  }, [communityId]);

  useEffect(() => {
    dispatch(Actions.getAllUsers());
  }, [dispatch]);

  const showDrawer = () => {
    const filterData = data.filter((item) => item.id === id);
    const reData = filterData[0];
    if (filterData.length > 0) {
      form.setFieldsValue({
        ...reData,
      });
      form.setFieldsValue({
        country: reData.country.id,
        created_by: reData.community_created_by.id,
        language: reData?.language?.id,
      });
      reData.city && setAddress({ city: reData.city });
    }
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    values.id = id;
    if (isEmpty(address)) {
      form.setFieldValue('city');
      return;
    }
    if (typeof values.avatar === 'string') {
      delete values.avatar;
    }
    /* eslint-enable */
    dispatch(Actions.updateCommunity({ ...values, ...address }));
    onClose();
  };
  return (
    <>
      <>
        <Tooltip title="View/Edit">
          <Button
            disabled={!hasEditPermission}
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={showDrawer}
          />
        </Tooltip>
        <Drawer
          title="View/Edit Community"
          width={500}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 10 }}
        >
          <Form
            layout="vertical"
            form={form}
            hideRequiredMark
            onFinish={onSubmit}
            className="px-4 pb-4"
            // initialValues={{
            //   name: editData.name,
            //   slug: editData.slug,
            //   country: editData.country,
            //   state: editData.state,
            //   city: editData.city,
            //   createdBy: editData.createdBy,
            // }}
          >
            <Row>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Community Name"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="mr-1"
                >
                  <Input placeholder="e.g. Lisboa" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="country"
                  label="Country"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="ml-1"
                >
                  <CountrySelect />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="state"
                  label="State"
                  className="mr-1"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <Input placeholder="Please enter State" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="city"
                  label="City"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  style={{ position: 'relative' }}
                  className="ml-1"
                >
                  <SearchLocation
                    defaultValue={form.getFieldValue('city')}
                    // options={{ types: ["(cities)"] }}
                    // eslint-disable-next-line no-shadow
                    onLocationSelect={(data, location) => {
                      setAddress({
                        place_id: data.place_id,
                        city: data.name,
                        longitude: location.lng(),
                        latitude: location.lat(),
                      });
                      form.setFieldValue('city', data.name);
                    }}
                    placeholder="e.g. Paris"
                    className="w-100 px-2 br-6"
                    style={{ minHeight: 36, border: '1px solid #d1d5db' }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="created_by"
                  label="Created By"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="mr-1"
                >
                  <UserSelect />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="community_type"
                  label="Community Type"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="ml-1"
                >
                  <Select placeholder="Select a community status.">
                    <Option value="PUBLIC">PUBLIC</Option>
                    <Option value="PRIVATE">PRIVATE</Option>
                    <Option value="SECRET">SECRET</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col xs={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <CKEditor5 />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="is_global"
                  label="Is Global"
                  initialValue="TRUE"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="mr-1"
                >
                  <Select placeholder="Select a global type.">
                    <Option value="TRUE">True</Option>
                    <Option value="FALSE">False</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tag_line"
                  label="Tag Line"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="ml-1"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  name="language"
                  label="Language"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                >
                  <LanguageSelect />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  name="is_published"
                  label="Published"
                  initialValue="FALSE"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="mr-1"
                >
                  <Select placeholder="Select a published value.">
                    <Option value="TRUE">True</Option>
                    <Option value="FALSE">False</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[
                    { required: true, message: 'This field is required' },
                  ]}
                  className="ml-1"
                >
                  <Select placeholder="Select a community status.">
                    <Option value="PENDING">PENDING</Option>
                    <Option value="ACCEPTED">ACCEPTED</Option>
                    <Option value="SUSPENDED">SUSPENDED</Option>
                    <Option value="DELETED">DELETED</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <span>
                Community picture{' '}
                <span className="fs-12 fw-5 text-grey-light">
                  (ideal size is 1225 x 425) no bigger than 10Mb
                </span>
              </span>
              <Form.Item
                name="avatar"
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <UploadImage aspect={2.88} maxSizeMB={10} />
              </Form.Item>
            </Row>
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Drawer>
      </>
    </>
  );
};

export default EditCommunity;
