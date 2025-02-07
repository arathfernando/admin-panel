import { EditOutlined } from '@ant-design/icons';
import { Button, DatePicker, Drawer, Form, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import * as Actions from '../../../../redux/actions';

const { Option } = Select;

const TeamMemberEdit = ({ id, memberList, teamList }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [roleList, setRoleList] = useState([]);
  const { list } = useSelector((state) => state.teamMemberRole);
  const [searchTeamList, setSearchTeamList] = useState(teamList);

  useEffect(() => {
    dispatch(Actions.getAllTeamMemberRole());
  }, [dispatch]);

  useEffect(() => {
    setRoleList(list);
  }, [list]);

  const showDrawer = () => {
    const filterData = memberList.filter((item) => item.id === id);
    if (filterData.length > 0) {
      form.setFieldsValue({
        userId: filterData[0].userId,
        teamId: filterData[0].teamId,
        roleId: filterData[0].roleId,
        joinedDate: filterData[0].joinedDate
          ? moment(filterData[0].joinedDate)
          : '',
      });
    }
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = (values) => {
    dispatch(Actions.updateTeamMember({ ...values, id }));
    onClose();
  };

  const onSearchTeam = (v) => {
    const u = [...teamList];
    if (v) {
      setSearchTeamList([
        ...u.filter(
          (c) => c?.name?.toLowerCase().indexOf(v.toLowerCase()) > -1
        ),
      ]);
    } else {
      setSearchTeamList(u);
    }
  };

  return (
    <>
      <Button
        type="primary"
        size="small"
        icon={<EditOutlined />}
        onClick={showDrawer}
      />
      <Drawer
        title="Edit a New Member"
        width={500}
        onClose={onClose}
        visible={visible}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          onFinish={onSubmit}
          className="px-4 py-2"
        >
          <Form.Item
            name="userId"
            label="User"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <UserSelect />
          </Form.Item>
          <Form.Item
            name="teamId"
            label="Team"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Select
              filterOption={false}
              showSearch
              onSearch={onSearchTeam}
              placeholder="Please select the team."
            >
              {searchTeamList?.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="roleId"
            label="Member Role"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Select placeholder="Please select the role">
              {roleList?.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="joinedDate"
            label="Join Date"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <div
            style={{
              paddingTop: '24px',
              textAlign: 'right',
              width: '100%',
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
  );
};

export default TeamMemberEdit;
