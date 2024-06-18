/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, Radio, Select } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../../../../components/UploadImage';
import CKEditor5 from '../../../../components/util-components/CkEditor';
import SingleRating from '../../../../components/util-components/SingleRating';
import CommunitySelect from '../../../../components/util-components/selector/CommunitySelect';
import GoalSelect from '../../../../components/util-components/selector/GoalSelect';
import UserSelect from '../../../../components/util-components/selector/UserSelect';
import useTranslation from '../../../../helpers/useTranslation';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import { getPartnersByName } from '../../../../redux/actions';
import SearchContest from './SearchContest';
import SearchExpertise from './SearchExpertise';
import SearchProject from './SearchProject';

const { TextArea } = Input;
const { Option } = Select;

const CreatePartner = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [typeList, setTypeList] = useState(null);
  const { partnerTypeList } = useSelector((state) => state.partnerType);
  const partnersByName = useSelector(
    ({ partner }) => partner.partnersByName.data
  );
  const languages = useSelector((state) => state.language.list);
  const { t } = useTranslation();

  const partnership_area = useWatch('partnership_area', form);
  const contacts = useWatch('contacts', form);

  const [selectedExpertises, setSelectedExpertises] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedContests, setSelectedContests] = useState([]);

  const [openSearchExpertise, setOpenSearchExpertise] = useState(false);
  const [openSearchProject, setOpenSearchProject] = useState(false);
  const [openSearchContest, setOpenSearchContest] = useState(false);

  const { hasCreatePermission } = usePermission();

  const handleRemoveExpertise = (expertise) => {
    const targetedExpertiseindex = selectedExpertises?.findIndex?.(
      (data) => data?.id === expertise?.id
    );
    const newExpertises = [...selectedExpertises];
    newExpertises?.splice(targetedExpertiseindex, 1);
    setSelectedExpertises(newExpertises);
  };

  const handleRemoveProject = (project) => {
    const targetedProjectindex = selectedProjects?.findIndex?.(
      (data) => data?.id === project?.id
    );
    const newProjects = [...selectedProjects];
    newProjects?.splice(targetedProjectindex, 1);
    setSelectedProjects(newProjects);
  };

  const handleRemoveContest = (contest) => {
    const targetedContestindex = selectedContests?.findIndex?.(
      (data) => data?.id === contest?.id
    );
    const newContests = [...selectedContests];
    newContests?.splice(targetedContestindex, 1);
    setSelectedContests(newContests);
  };

  const have_expertise = useWatch('have_expertise', form);
  const support_project = useWatch('support_project', form);
  const have_contest = useWatch('support_project', form);

  useEffect(() => {
    dispatch(Actions.getAllPartnerType());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(Actions.getAllLanguage({ page: 1, limit: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    setTypeList(partnerTypeList);
  }, [partnerTypeList]);

  useEffect(() => {
    form.setFields([
      {
        name: 'partner_name',
        errors: partnersByName &&
          form.getFieldValue('partner_name') && ['Partner name already exist'],
      },
    ]);
  }, [form, partnersByName]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    form.resetFields({});
  };

  const onSubmit = ({
    partner_link,
    contacts,
    language,
    community,
    goals,
    partner_image,
    ...values
  }) => {
    const payload = {
      ...values,
      contacts:
        contacts?.map((contact) => ({
          ...contact,
        })) || [],
    };
    if (values.have_expertise === 'YES') {
      payload.expertise =
        selectedExpertises?.map(({ id }) => id)?.toString?.() || '';
    }
    if (values.support_project === 'YES') {
      payload.projects =
        selectedProjects?.map(({ id }) => id)?.toString?.() || '';
    }
    if (values.have_contest === 'YES') {
      payload.contest =
        selectedContests?.map(({ id }) => id)?.toString?.() || '';
    }
    if (language?.length) {
      payload.language = language.reduce(
        (prevVal, crntVal) => `${prevVal ? `${prevVal},` : ''}${crntVal}`,
        ''
      );
    }
    if (community?.length) {
      payload.community = community.reduce(
        (prevVal, crntVal) => `${prevVal ? `${prevVal},` : ''}${crntVal}`,
        ''
      );
    }
    if (!isEmpty(goals)) {
      payload.goals = goals?.reduce(
        (prevVal, crntVal) => `${prevVal ? `${prevVal},` : ''}${crntVal}`,
        ''
      );
    }
    if (partner_image && typeof partner_image !== 'string') {
      payload.partner_image = partner_image;
    }
    if (partner_link) {
      payload.partner_link = `${partner_link}`;
    }
    dispatch(
      Actions.createPartner({
        ...payload,
      })
    );
    onClose();
  };

  useEffect(() => {
    form.setFieldValue('goals', [12, 13]);
  }, [form]);

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        disabled={!hasCreatePermission}
      >
        <PlusOutlined /> Create New Partner
      </Button>
      <Drawer
        title="Create a New Partner"
        width={510}
        onClose={onClose}
        open={visible}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onSubmit}
          name="control-hooks"
          className="px-4 py-2 custom-form-style"
        >
          <Form.Item
            name="created_by"
            label="Created by"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <UserSelect placeholder="Please choose created by" />
          </Form.Item>
          <Form.Item
            name="partner_name"
            label="Partner Name"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input
              placeholder="Please enter Partner Name"
              onChange={({ target: { value } }) => {
                dispatch(getPartnersByName(value));
              }}
            />
          </Form.Item>
          <Form.Item
            initialValue="https://"
            name="partner_link"
            label="Partner link"
          >
            <Input placeholder="www.example.com" />
          </Form.Item>
          <Form.Item name="partner_description" label="Partner description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label={<h6 className="input-label mb-0">Logo of the company</h6>}
            required
          >
            <div className="p-2 border rounded-2">
              <Form.Item
                name="partner_image"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <UploadImage
                  aspect={2}
                  minZoom={0.3}
                  cropperProps={{ restrictPosition: false }}
                  center
                />
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item
            name="created_by"
            label="Created By"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <UserSelect />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'This field is required' }]}
            initialValue="ACTIVE"
          >
            <Select options={[{ value: 'ACTIVE' }, { value: 'INACTIVE' }]} />
          </Form.Item>
          <Form.Item
            name="partner_type"
            label="Partner Type"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Select placeholder="Please select a type">
              {typeList?.map((item) => {
                return (
                  <Option key={item.id} values={item.id}>
                    {item.type}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name="language" label="Language">
            <Select
              optionFilterProp="label"
              allowClear
              mode="multiple"
              onChange={(value) => {
                let language = [];
                // select all
                if (value[value.length - 1] === 'ALL') {
                  language = languages.map?.(({ id }) => id);
                }
                // select specific
                else {
                  language = value.filter((lng) => lng !== 'ALL');
                }
                form.setFieldValue('language', language);
              }}
              options={[
                ...(!isEmpty(languages)
                  ? [{ value: 'ALL', label: t('ALL') }]
                  : []),
                ...languages?.map?.(({ id: value, language_name: label }) => ({
                  value,
                  label,
                })),
              ]}
            />
          </Form.Item>
          <Form.Item
            name="partnership_area"
            label="Partnership area"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Select>
              <Option value="GLOBAL">Global</Option>
              <Option value="LOCAL">Local</Option>
            </Select>
          </Form.Item>
          {partnership_area === 'LOCAL' && (
            <Form.Item name="community" label="Community">
              <CommunitySelect mode="multiple" />
            </Form.Item>
          )}
          <Form.Item
            name="goals"
            label={
              <h6 className="input-label">
                Choose SDG goals to describe your partnership
              </h6>
            }
          >
            <GoalSelect max={3} />
          </Form.Item>
          <Form.Item name="partnership_activity" label="Partnership activity">
            <CKEditor5 rows={4} />
          </Form.Item>
          <Form.Item
            name="partnership_engagement"
            label="Partnership engagement"
          >
            <CKEditor5 rows={4} />
          </Form.Item>
          <Form.Item name="partnership_goal" label="Partnership goal">
            <CKEditor5 rows={4} />
          </Form.Item>
          <h6 className="fs-18 fw-6 mb-3">Contact invitations</h6>
          <Form.List initialValue={[{}]} name="contacts">
            {(fields, { add, remove }) => (
              <div>
                {fields.map(({ key, name, ...restField }, indx) => (
                  <div key={key}>
                    <div className="d-flex justify-content-between">
                      <h6 className="fs-16 fw-6 mb-3">Contact {indx + 1}</h6>
                      {fields.length > 1 && (
                        <CloseOutlined
                          onClick={() => remove(indx)}
                          className="ms-4"
                        />
                      )}
                    </div>

                    <Form.Item
                      {...restField}
                      name={[name, 'has_hubbers_profile']}
                      label="Does the user has a Hubbers profile?"
                      initialValue="YES"
                    >
                      <Radio.Group>
                        <Radio value="YES">Yes</Radio>
                        <Radio value="NO">No</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      disabled={contacts?.[indx]?.has_hubbers_profile === 'NO'}
                      name={[name, 'user_id']}
                      label={
                        <span className="text-grey-light">
                          If yes, select user
                        </span>
                      }
                    >
                      <UserSelect />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'email']}
                      label={
                        <span className="text-grey-light">
                          If no, send the user a Hubbers invitation
                        </span>
                      }
                    >
                      <Input
                        placeholder="type e-mail"
                        disabled={
                          contacts?.[indx]?.has_hubbers_profile === 'YES'
                        }
                      />
                    </Form.Item>
                  </div>
                ))}

                <h6
                  className="fs-12 fw-5 mt-n3 cursor-pointer"
                  style={{ color: '#0083C8' }}
                  onClick={() => add({})}
                >
                  Add contact
                </h6>
              </div>
            )}
          </Form.List>

          <Form.Item
            name="have_expertise"
            label={t('Do you have an expertise?')}
            initialValue="YES"
          >
            <Radio.Group>
              <Radio value="YES">{t('Yes')}</Radio>
              <Radio value="NO">{t('No')}</Radio>
            </Radio.Group>
          </Form.Item>

          {have_expertise === 'YES' && !isEmpty(selectedExpertises) && (
            <>
              <Form.Item label={t('Search for an expertise')}>
                <Input
                  placeholder={t('e.g. Hubbers contest 1')}
                  onClick={() => setOpenSearchExpertise(true)}
                />
              </Form.Item>
              <div className="d-flex flex-column mb-4" style={{ gap: 15 }}>
                {selectedExpertises?.map?.((expertise = {}) => (
                  <div
                    style={{
                      maxWidth: 305,
                      height: 84,
                      background: '#FFFFFF',
                      boxShadow: '1px 1px 10px rgba(66, 66, 67, 0.07)',
                    }}
                    className="w-100 br-5"
                  >
                    <div className="d-flex align-items-center h-100">
                      <img
                        src={expertise.gallery_images?.[0]?.image_url}
                        alt=""
                        className="h-100"
                        style={{
                          aspectRatio: '1.3/1',
                          borderRadius: '5px 0px 0px 5px',
                        }}
                      />
                      <div
                        className="d-flex flex-column flex-grow-1"
                        style={{ padding: 11 }}
                      >
                        <div
                          className="d-flex align-items-center mb-0"
                          style={{ color: '#FFCC21' }}
                        >
                          <SingleRating
                            ratingCount={expertise?.review_count}
                            size={13}
                          />
                          <h6
                            className="fs-10 fw-5 mb-0 mx-1"
                            style={{ color: '#FFCC21' }}
                          >
                            {Number(
                              // eslint-disable-next-line no-restricted-globals
                              !isNaN(expertise?.review_count)
                                ? expertise?.review_count
                                : 0
                            ).toFixed(1)}
                          </h6>
                          <p className="fs-10 fw-3 text-grey-light mb-0">{`(${
                            expertise?.reviewer_count || 0
                          })`}</p>
                        </div>
                        <p className="fs-10 fw-5 text-elps-3">
                          {expertise.expertise_title}
                        </p>
                      </div>

                      <img
                        src="/assets/img/icons/delete-outline.svg"
                        alt=""
                        style={{ width: 15, marginRight: 5 }}
                        className="cursor-pointer"
                        onClick={() => handleRemoveExpertise(expertise)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <h6
            className="fs-12 fw-5 mb-5 mt-n1 cursor-pointer"
            role="button"
            style={{ color: '#0083C8' }}
            onClick={() => setOpenSearchExpertise(true)}
          >
            {t('Add expertise')}
          </h6>

          <Form.Item
            name="support_project"
            label={t('Do you support a project?')}
            initialValue="YES"
          >
            <Radio.Group>
              <Radio value="YES">{t('Yes')}</Radio>
              <Radio value="NO">{t('No')}</Radio>
            </Radio.Group>
          </Form.Item>

          {support_project === 'YES' && !isEmpty(selectedProjects) && (
            <>
              <Form.Item label={t('Search for an existing project')}>
                <Input
                  placeholder={t('e.g. Hubbers contest 1')}
                  onClick={() => setOpenSearchProject(true)}
                />
              </Form.Item>
              <div className="d-flex flex-column mb-4" style={{ gap: 15 }}>
                {selectedProjects?.map?.((project = {}) => (
                  <div
                    style={{
                      maxWidth: 305,
                      height: 84,
                      background: '#FFFFFF',
                      boxShadow: '1px 1px 10px rgba(66, 66, 67, 0.07)',
                    }}
                    className="w-100 br-5"
                  >
                    <div className="d-flex align-items-center h-100">
                      <img
                        src={project.project_image}
                        alt=""
                        className="h-100"
                        style={{
                          aspectRatio: '1.3/1',
                          borderRadius: '5px 0px 0px 5px',
                        }}
                      />
                      <div
                        className="d-flex flex-column flex-grow-1"
                        style={{ padding: 11 }}
                      >
                        <p
                          className="fs-11 fw-5 text-elps-2 mb-1"
                          style={{ minHeight: 30 }}
                        >
                          {project?.project_name}
                        </p>
                        <p className="fs-10 fw-5 text-grey-light mb-1">
                          Organised by :
                        </p>
                        <p className="fs-10 fw-5 mb-0">
                          {project?.created_by?.general_profile?.first_name}{' '}
                          {project?.created_by?.general_profile?.last_name}
                        </p>
                      </div>

                      <img
                        src="/assets/img/icons/delete-outline.svg"
                        alt=""
                        style={{ width: 15, marginRight: 5 }}
                        className="cursor-pointer"
                        onClick={() => handleRemoveProject(project)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <h6
            className="fs-12 fw-5 mb-5 mt-n1 cursor-pointer"
            role="button"
            style={{ color: '#0083C8' }}
            onClick={() => setOpenSearchProject(true)}
          >
            {t('Add project')}
          </h6>

          <>
            <Form.Item
              name="have_contest"
              label={t('Do you support a contest?')}
              initialValue="YES"
            >
              <Radio.Group>
                <Radio value="YES">{t('Yes')}</Radio>
                <Radio value="NO">{t('No')}</Radio>
              </Radio.Group>
            </Form.Item>
            {have_contest === 'YES' && !isEmpty(selectedContests) && (
              <>
                <Form.Item label={t('Search for an existing contest')}>
                  <Input
                    placeholder={t('e.g. Hubbers contest 1')}
                    onClick={() => setOpenSearchContest(true)}
                  />
                </Form.Item>
                <div className="d-flex flex-column mb-4" style={{ gap: 15 }}>
                  {selectedContests?.map?.((contest = {}) => (
                    <div
                      style={{
                        maxWidth: 305,
                        height: 84,
                        background: '#FFFFFF',
                        boxShadow: '1px 1px 10px rgba(66, 66, 67, 0.07)',
                      }}
                      className="w-100 br-5"
                    >
                      <div className="d-flex align-items-center h-100">
                        <img
                          src={contest.contest_cover}
                          alt=""
                          className="h-100"
                          style={{
                            aspectRatio: '1.3/1',
                            borderRadius: '5px 0px 0px 5px',
                          }}
                        />
                        <div
                          className="d-flex flex-column flex-grow-1"
                          style={{ padding: 11 }}
                        >
                          <p
                            className="fs-11 fw-5 text-elps-2 mb-1"
                            style={{ minHeight: 30 }}
                          >
                            {contest?.title}
                          </p>
                          <p className="fs-10 fw-5 text-grey-light mb-1">
                            {t('Organised by')} :
                          </p>
                          <p className="fs-10 fw-5 mb-0">
                            {
                              contest?.contest_created_by?.general_profile
                                ?.first_name
                            }{' '}
                            {
                              contest?.contest_created_by?.general_profile
                                ?.last_name
                            }
                          </p>
                        </div>

                        <img
                          src="/assets/img/icons/delete-outline.svg"
                          alt=""
                          style={{ width: 15, marginRight: 5 }}
                          className="cursor-pointer"
                          onClick={() => handleRemoveContest(contest)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <h6
              className="fs-12 fw-5 mb-5 mt-n1 cursor-pointer"
              style={{ color: '#0083C8' }}
              onClick={() => setOpenSearchContest(true)}
            >
              {t('Add contest')}
            </h6>
          </>

          <SearchExpertise
            open={openSearchExpertise}
            onClose={() => setOpenSearchExpertise(false)}
            onNext={() => setOpenSearchExpertise(false)}
            selectedExpertises={selectedExpertises}
            setSelectedExpertises={setSelectedExpertises}
          />
          <SearchProject
            open={openSearchProject}
            onClose={() => setOpenSearchProject(false)}
            onNext={() => setOpenSearchProject(false)}
            selectedProjects={selectedProjects}
            setSelectedProjects={setSelectedProjects}
          />
          <SearchContest
            open={openSearchContest}
            onClose={() => setOpenSearchContest(false)}
            onNext={() => setOpenSearchContest(false)}
            selectedContests={selectedContests}
            setSelectedContests={setSelectedContests}
          />

          <div className="pb-2">
            <Button onClick={onClose} style={{ marginRight: 12 }}>
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

export default CreatePartner;
