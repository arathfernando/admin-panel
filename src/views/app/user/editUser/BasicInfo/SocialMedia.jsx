import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal, Select } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import { isEmpty } from 'lodash';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DeleteModal from '../../../../../components/util-components/DeleteModal';
import Loading from '../../../../../components/util-components/Loading';
import useMediaQuery from '../../../../../hooks/useMediaQuery';
import {
  getSocials,
  updateUserSocialMedia,
} from '../../../../../redux/actions';

const SubmitSocialMedia = ({ open, onCancel, onSaved, data = {} }) => {
  const socials = useSelector(({ users }) => users.socials.data);
  const { social_media = [] } = useSelector(({ users }) => users.singleUser);
  const {
    status,
    data: { submitType },
  } = useSelector(({ users }) => users.userSocialMediaAction);

  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const social_media_value = useWatch('social_media', form);

  const submitMode = useMemo(() => (isEmpty(data) ? 'create' : 'edit'), [data]);

  useEffect(() => {
    if (submitMode === 'create') {
      form.setFieldValue('social_media', [{}]);
    } else {
      form.setFieldValue('social_media', [
        {
          ...data,
          media_id: data.social_media?.id,
        },
      ]);
    }
  }, [data]);

  useEffect(() => {
    dispatch(getSocials());
  }, [dispatch]);

  const onFinish = () => {
    const payload = {
      submitType: submitMode,
      successMsg:
        submitMode === 'create'
          ? 'Created successfully!'
          : 'Updated successfully!',
      social_media:
        submitMode === 'create'
          ? // create
            [
              ...social_media.map(
                // existings
                // eslint-disable-next-line no-shadow
                ({ social_media_id, link, id }) => ({
                  media_id: social_media_id,
                  link,
                  id,
                })
              ),
              // new
              ...social_media_value.map(
                // eslint-disable-next-line no-shadow
                ({ social_media, social_media_id, ...values }) => ({
                  ...values,
                })
              ),
            ]
          : // edit
            social_media.map(
              ({
                social_media: _social_media,
                social_media_id: _social_media_id,
                ...value
              }) => {
                const {
                  // eslint-disable-next-line no-shadow
                  social_media,
                  social_media_id,
                  ...social_media_form_value
                } = social_media_value?.[0] || {};
                return value.id === data?.id
                  ? // edit
                    {
                      ...social_media_form_value,
                    }
                  : // rest
                    { ...value, media_id: _social_media_id };
              }
            ),
      id,
    };

    dispatch(
      updateUserSocialMedia({
        ...payload,
        onSuccess: onSaved,
      })
    );
  };

  return (
    <Modal
      width={1097}
      closable={false}
      footer={null}
      open={open}
      onCancel={onCancel}
      bodyStyle={{ padding: '49px 68px' }}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <h3 className="h3-lg hb-text-primary" style={{ marginBottom: 17 }}>
          Social media links
        </h3>

        <Form.List name="social_media">
          {(fields, { add, remove }) => (
            <div style={{ marginBottom: 47 }}>
              {fields.map(({ key, name, ...restField }, indx) => (
                <Fragment key={key}>
                  {indx !== 0 && <Divider className="mt-0" />}
                  <div className="d-flex flex-column">
                    <div
                      className="d-flex align-items-center justify-content-between"
                      style={{ gap: 12 }}
                    >
                      <div className="flex-grow-1">
                        <Form.Item
                          {...restField}
                          name={[name, 'media_id']}
                          label={
                            <span className="h5-sm">
                              Select the social media
                            </span>
                          }
                          style={{ maxWidth: 444, marginBottom: 22 }}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                        >
                          <Select
                            style={{ borderColor: 'black' }}
                            className="p-md br-4"
                            placeholder="Select the social media"
                            optionFilterProp="label"
                            showSearch
                            options={socials.map?.(
                              ({ id: value, name: label }) => ({ value, label })
                            )}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'link']}
                          label={<span className="h5-sm">Link</span>}
                          style={{ maxWidth: 444, marginBottom: 22 }}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                        >
                          <Input
                            style={{ borderColor: 'black' }}
                            className="p-md br-4"
                            placeholder="Type your title at this company"
                          />
                        </Form.Item>
                      </div>
                      {fields.length > 1 && (
                        <Button
                          type="text p-0"
                          size="small"
                          onClick={() => remove(indx)}
                          icon={
                            <img
                              src="/assets/img/icons/delete-bin-line-primary.svg"
                              alt=""
                              height={24}
                              width={24}
                              className="cursor-pointer"
                            />
                          }
                        />
                      )}
                    </div>
                  </div>
                </Fragment>
              ))}
              <div style={{ width: 'fit-content' }}>
                {isEmpty(data) && (
                  <Form.Item>
                    <Button
                      type="text p-md d-flex align-items-center justify-content-center px-0"
                      style={{ gap: 2 }}
                      onClick={() => add({})}
                      block
                      icon={
                        <PlusCircleOutlined
                          className="hb-text-primary"
                          style={{ marginTop: -2 }}
                        />
                      }
                    >
                      Add more link
                    </Button>
                  </Form.Item>
                )}
              </div>
            </div>
          )}
        </Form.List>

        <div className="d-flex align-items-center" style={{ gap: 4 }}>
          <Button type="text btn-text-md px-3 ml-n3" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="primary btn-text-md px-4"
            htmlType="submit"
            loading={status === 'submitting' && submitType !== 'remove'}
          >
            <span className="px-3">Save</span>
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

const SocialMedia = () => {
  const {
    singleUser: { social_media = [], isRefetching },
    loading,
    error,
  } = useSelector(({ users }) => users);
  const {
    status,
    data: { submitType },
  } = useSelector(({ users }) => users.userSocialMediaAction);

  const [openSubmitSocialMediaLink, setOpenSubmitSocialMediaLink] =
    useState(false);
  const [editSocialMediaLinkData, setEditSocialMediaLinkData] = useState({});

  const [
    openSocialMediaLinkRemoveWorningWithId,
    setOpenSocialMediaLinkRemoveWorningWithId,
  ] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { sm } = useMediaQuery();

  const handleRemoveNewSocialMediaLink = () => {
    const payload = {
      submitType: 'remove',
      successMsg: 'Removed successfully!',
      social_media: social_media
        .filter((value) => value.id !== openSocialMediaLinkRemoveWorningWithId)
        // eslint-disable-next-line no-shadow
        .map(({ social_media, social_media_id, ...data }) => ({
          ...data,
          media_id: social_media_id,
        })),
      id,
    };

    dispatch(
      updateUserSocialMedia({
        ...payload,
        onSuccess: () => setOpenSocialMediaLinkRemoveWorningWithId(0),
      })
    );
  };

  return (
    <div className="bg-white">
      <div
        className="d-flex flex-column mx-auto"
        style={{ gap: 14, padding: sm ? '24px 45px' : 24, maxWidth: 1000 }}
      >
        <div
          className="d-flex justify-content-between align-items-center flex-wrap"
          style={{ gap: 8 }}
        >
          <h5 className="h5-lg text-black mb-0">Social media links</h5>
          <div className="d-flex justify-content-end flex-grow-1">
            <Button
              type="primary btn-text-md px-4"
              size="large"
              style={{ height: 49 }}
              onClick={() => {
                setOpenSubmitSocialMediaLink(true);
                setEditSocialMediaLinkData({});
              }}
              disabled={(loading && !isRefetching) || error}
            >
              <span className="px-1">Add links</span>
            </Button>
          </div>
        </div>

        <div
          className="d-flex flex-column position-relative"
          style={{ gap: 14, minHeight: loading && !isRefetching && 50 }}
        >
          <Loading loading={loading && !isRefetching} />
          {social_media.map?.((data = {}, indx) => (
            <Fragment key={data.id}>
              {indx !== 0 && <Divider className="my-0" />}
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ gap: 14 }}
              >
                <div className="d-flex flex-column" style={{ gap: 12 }}>
                  <img
                    src={data.social_media?.logo}
                    width={16}
                    height={16}
                    alt={data.social_media?.name}
                  />
                  <span className="fs-14 fw-5">{data.social_media?.name}</span>
                  <a href={data.link} target="_blank" rel="noreferrer">
                    <span className="fs-14 fw-5">{data.link}</span>
                  </a>
                  <span className="fs-14 fw-3">{data.description}</span>
                </div>

                <div
                  className="d-flex flex-column flex-shrink-0"
                  style={{ gap: 12 }}
                >
                  <Button
                    type="text p-0"
                    size="small"
                    onClick={() => {
                      setOpenSubmitSocialMediaLink(true);
                      setEditSocialMediaLinkData(data);
                    }}
                    icon={
                      <img
                        src="/assets/img/icons/edit-outline-primary.svg"
                        alt=""
                        height={24}
                        width={24}
                        className="cursor-pointer"
                      />
                    }
                  />
                  <Button
                    type="text p-0"
                    size="small"
                    onClick={() =>
                      setOpenSocialMediaLinkRemoveWorningWithId(data.id)
                    }
                    icon={
                      <img
                        src="/assets/img/icons/delete-bin-line-primary.svg"
                        alt=""
                        height={24}
                        width={24}
                        className="cursor-pointer"
                      />
                    }
                  />
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      <SubmitSocialMedia
        open={openSubmitSocialMediaLink}
        data={editSocialMediaLinkData}
        onCancel={() => setOpenSubmitSocialMediaLink(false)}
        onSaved={() => setOpenSubmitSocialMediaLink(false)}
      />

      <DeleteModal
        name="link"
        open={openSocialMediaLinkRemoveWorningWithId}
        onClose={() => setOpenSocialMediaLinkRemoveWorningWithId(0)}
        onDelete={handleRemoveNewSocialMediaLink}
        loading={status === 'submitting' && submitType === 'remove'}
      />
    </div>
  );
};

export default SocialMedia;
