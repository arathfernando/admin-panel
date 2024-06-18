import { Button, Form, InputNumber, Select } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../../../../../components/util-components/Loading';
import { updateUserRoleProfiles } from '../../../../../redux/actions';
import Creator from './Creator';
import Expert from './Expert';
import HubbersTeam from './HubbersTeam';
import Investor from './Investor';
import Teacher from './Teacher';

export const roles = [
  {
    id: 1,
    key: 'creator_profile',
    value: 'CREATOR',
    label: 'Creator',
  },
  {
    id: 2,
    key: 'expert_profile',
    value: 'EXPERT',
    label: 'Expert',
  },
  {
    id: 3,
    key: 'investor_profile',
    value: 'INVESTOR',
    label: 'Hubbers investor',
  },
  {
    id: 4,
    key: 'hubbers_team_profile',
    value: 'HUBBERS_TEAM',
    label: 'Hubbers Team',
  },
];

const profileTypes = [
  {
    value: 'CREATOR',
    label: 'CREATOR',
    key: 'creator_profile',
  },
  {
    value: 'EXPERT',
    label: 'EXPERT',
    key: 'expert_profile',
  },
  {
    value: 'TEACHER',
    label: 'TEACHER',
    key: 'teacher_profile',
  },
  {
    value: 'INVESTOR',
    label: 'INVESTOR',
    key: 'investor_profile',
  },
  {
    value: 'HUBBERS_TEAM',
    label: 'HUBBERS TEAM',
    key: 'hubbers_team_profile',
  },
];

const RoleInfo = () => {
  const { status } = useSelector(
    ({ users }) => users.updateUserRoleProfilesAction
  );

  const genarelProfile = useSelector(
    ({ users }) => users.singleUser || {},
    shallowEqual
  );
  const { isRefetching, loading, error } = useSelector(
    ({ users }) => users.singleUser
  );

  const [form] = Form.useForm();

  const profile_types = useWatch('profile_types', form);

  // profile roles forms
  const [creatorProfileForm] = Form.useForm();
  const [expertProfileForm] = Form.useForm();
  const [investorProfileForm] = Form.useForm();
  const [teacherProfileForm] = Form.useForm();
  const [hubbersTeamProfileForm] = Form.useForm();

  // profile roles states
  const [creatorProfileExperties, setCreatorProfileEexperties] = useState([]);
  const [expertProfileExperties, setExpertProfileEexperties] = useState([]);

  const dispatch = useDispatch();
  const { id } = useParams();

  const onFinish = (values) => {
    const payload = {
      ...values,
    };

    // creator profile values
    if (profile_types?.find((profile_type) => profile_type === 'CREATOR')) {
      const { extra_expertise, ...creatorProfileValues } =
        creatorProfileForm.getFieldsValue();
      payload.creator_profile = {
        ...creatorProfileValues,
        expertise: creatorProfileExperties
          .filter((exp) => exp.active && exp.id)
          .map((exp) => exp.id),
      };
      if (extra_expertise) {
        payload.creator_profile.extra_expertise = [extra_expertise];
      }
    }

    // expert profile values
    if (profile_types?.find((profile_type) => profile_type === 'EXPERT')) {
      const {
        extra_expertise: expert_extra_expertise,
        ...expertProfileValues
      } = expertProfileForm.getFieldsValue();
      payload.expert_profile = {
        ...expertProfileValues,
        expertise: expertProfileExperties
          .filter((exp) => exp.active && exp.id)
          .map((exp) => exp.id),
      };
      if (expert_extra_expertise) {
        payload.expert_profile.extra_expertise = [expert_extra_expertise];
      }
    }

    // investor profile values
    if (profile_types?.find((profile_type) => profile_type === 'INVESTOR')) {
      const { ...investorProfileValues } = investorProfileForm.getFieldsValue();
      payload.investor_profile = {
        ...investorProfileValues,
      };
    }

    // teacher profile values
    if (profile_types?.find((profile_type) => profile_type === 'TEACHER')) {
      const { language, ...teacherProfileValues } =
        teacherProfileForm.getFieldsValue();
      payload.teacher_profile = {
        ...teacherProfileValues,
        language: language?.toString() || '',
      };
    }

    // hubbers-team profile values
    if (
      profile_types?.find((profile_type) => profile_type === 'HUBBERS_TEAM')
    ) {
      const { ...hubbersTeamProfileValues } =
        hubbersTeamProfileForm.getFieldsValue();
      payload.hubbers_team_profile = {
        ...hubbersTeamProfileValues,
      };
    }

    dispatch(
      updateUserRoleProfiles({
        ...payload,
        id,
      })
    );
  };

  // set user data
  useEffect(() => {
    if (!isEmpty(genarelProfile)) {
      form.setFieldsValue({
        ...genarelProfile,
        profile_types: profileTypes
          .filter(({ key }) => genarelProfile?.user?.[key])
          .map(({ value }) => value),
      });
    } else {
      form.resetFields();
    }
  }, [genarelProfile]);

  return (
    <div
      className="p-4 p-md-5 position-relative mx-auto"
      style={{ minHeight: 'calc(100vh - 250px)', maxWidth: 807 }}
    >
      <Loading loading={loading && !isRefetching} />
      <Form
        form={form}
        layout="vertical"
        name="control-hooks"
        className="custom-form-style"
        onFinish={onFinish}
      >
        <Form.Item
          name="role"
          label={<span className="fs-16 fw-6">What is your main role?</span>}
          style={{ marginBottom: 34 }}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Select
            allowClear
            className="w-100 mt-2"
            options={roles}
            placeholder="Investor"
          />
        </Form.Item>

        <Form.Item
          name="experience_in_role"
          label={
            <span className="fs-16 fw-6">
              How long of experience in this role you have?
            </span>
          }
          style={{ marginBottom: 34 }}
          rules={[
            { required: true, message: 'This field is required' },
            {
              type: 'number',
              message: 'This is not a valid number',
            },
          ]}
        >
          <InputNumber
            type="number"
            className="mt-2 w-100"
            style={{ maxWidth: 300 }}
          />
        </Form.Item>

        <Form.Item
          name="profile_types"
          label={<span className="fs-16 fw-6">Profile roles</span>}
          style={{ marginBottom: 46 }}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Select
            className="mt-2"
            mode="multiple"
            placeholder="Investor"
            optionFilterProp="label"
            options={profileTypes}
          />
        </Form.Item>

        <Creator
          form={creatorProfileForm}
          experties={creatorProfileExperties}
          setexperties={setCreatorProfileEexperties}
          show={profile_types?.find(
            (profile_type) => profile_type === 'CREATOR'
          )}
        />

        <Expert
          form={expertProfileForm}
          experties={expertProfileExperties}
          setexperties={setExpertProfileEexperties}
          show={profile_types?.find(
            (profile_type) => profile_type === 'EXPERT'
          )}
        />

        <Investor
          form={investorProfileForm}
          show={profile_types?.find(
            (profile_type) => profile_type === 'INVESTOR'
          )}
        />

        <Teacher
          form={teacherProfileForm}
          show={profile_types?.find(
            (profile_type) => profile_type === 'TEACHER'
          )}
        />

        <HubbersTeam
          form={hubbersTeamProfileForm}
          show={profile_types?.find(
            (profile_type) => profile_type === 'HUBBERS_TEAM'
          )}
        />

        <div className="d-flex justify-content-end mb-2">
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
      </Form>
    </div>
  );
};

export default RoleInfo;
