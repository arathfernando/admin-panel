/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageCrop from '../../../components/UploadImage';
import CountrySelect from '../../../components/util-components/selector/CountrySelect';
import GoalSelect from '../../../components/util-components/selector/GoalSelect';
import LanguageSelect from '../../../components/util-components/selector/LanguageSelect';
import UserSelect from '../../../components/util-components/selector/UserSelect';
import arrayToCommaSeparateString from '../../../helpers/arrayToCommaSeparateString';
import useTranslation from '../../../helpers/useTranslation';
import * as Actions from '../../../redux/actions';
import {
  getProductCategories,
  getProductInnovationCategories,
  getProductTechCategories,
} from '../../../redux/actions';

const CreateProductLauncher = ({ onCancel, ...props }) => {
  const { status } = useSelector(
    ({ product }) => product.createProductLauncherAction
  );

  const { data: productCategories, loading: productCategoryLoading } =
    useSelector(({ productCategory }) => productCategory.productCategories);
  const { data: productTechCategories, loading: productTechCategoriesLoading } =
    useSelector(
      ({ productTechCategory }) => productTechCategory.productTechCategories
    );
  const {
    data: productInnovationCategories,
    loading: productInnovationCategoriesLoading,
  } = useSelector(
    ({ productInnovationCategory }) =>
      productInnovationCategory.productInnovationCategories
  );
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isSubmitting = useMemo(() => status === 'submitting', [status]);

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getProductTechCategories());
    dispatch(getProductInnovationCategories());
  }, [dispatch]);

  const onFinish = ({
    goals,
    tech_category,
    innovation_category,
    ...values
  }) => {
    const payload = {
      ...values,
    };
    if (!isEmpty(goals)) {
      payload.goals = arrayToCommaSeparateString(goals);
    }
    if (!isEmpty(tech_category)) {
      payload.tech_category = arrayToCommaSeparateString(tech_category);
    }
    if (!isEmpty(innovation_category)) {
      payload.innovation_category =
        arrayToCommaSeparateString(innovation_category);
    }

    dispatch(
      Actions.createProductLauncher({
        ...payload,
        onSuccess: () => {
          onCancel();
          form.resetFields();
        },
      })
    );
  };

  return (
    <Modal
      footer={null}
      width={710}
      title="New project"
      className="sidecreen-modal-3 custom_styles"
      onCancel={onCancel}
      closeIcon={
        <img
          src="/assets/img/icons/modal-close.svg"
          alt=""
          onClick={onCancel}
        />
      }
      {...props}
    >
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        className="custom-form-style"
        hideRequiredMark
      >
        <Form.Item
          name="created_by"
          rules={[{ required: true, message: 'This field is required' }]}
          label={
            <div>
              <h4 className="h4-sm mb-3 required-mark">{t('Created by')}</h4>
            </div>
          }
          className="mb-4 pb-2"
        >
          <UserSelect />
        </Form.Item>
        <Form.Item
          name="launch_type"
          rules={[{ required: true, message: 'This field is required' }]}
          label={
            <div>
              <h4 className="h4-sm mb-3 required-mark">
                {t('Your project launch type')}
              </h4>
              <p className="p-sm text-secondary mb-2">
                {t(
                  'Hubbers is a hub of creators, innovators that work together to launch and work on new products. Now you are part of us, time to select what you want to do next.'
                )}
              </p>
            </div>
          }
          className="mb-4 pb-2"
          initialValue="HUBBERS_ACCELERATOR"
        >
          <Select
            options={[
              {
                value: 'SELF_EMPLOYED',
                label: 'You own a business or self-employed',
              },
              {
                value: 'HUBBERS_ACCELERATOR ',
                label: 'Hubbers accelerator',
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="project_name"
          rules={[{ required: true, message: 'This field is required' }]}
          label={
            <div>
              <h4 className="h4-sm mb-3 required-mark">
                {t('Your project name')}
              </h4>
              <p className="p-sm text-secondary mb-2">
                {t(
                  'Your project name is the first thing that outside world will see. make it attractive, descriptive, mysterious, easy to remember and short. Keep it under 100 characters.'
                )}
              </p>
            </div>
          }
          className="mb-4 pb-2"
        >
          <Input maxLength={100} placeholder="e.g. Project 1" />
        </Form.Item>

        <Form.Item
          name="project_description"
          rules={[{ required: true, message: 'This field is required' }]}
          label={
            <div>
              <h4 className="h4-sm mb-3 required-mark">
                {t('Describe your idea')}
              </h4>
              <p className="p-sm text-secondary mb-2">
                {t(
                  'Here you have to be more specific about your product. Give details about your product features, size, colors. Tell how you think your product will change the world or what you are going to bring that is different.'
                )}
              </p>
            </div>
          }
          className="mb-4 pb-2"
        >
          <TextArea
            rows={5}
            placeholder="e.g. How to improve your social media profiles"
          />
        </Form.Item>

        <Form.Item
          name="product_category"
          rules={[{ required: true, message: 'This field is required' }]}
          label={
            <div>
              <h4 className="h4-sm mb-3 required-mark">
                {t('Product category')}
              </h4>
              <p className="p-sm text-secondary mb-2">
                {t(
                  'Please pick up the category that matches best your product idea. Select several categories if you think it fits to several product universe.'
                )}
              </p>
            </div>
          }
          className="mb-4 pb-2"
        >
          <Select
            showSearch
            optionFilterProp="label"
            loading={productCategoryLoading}
            options={productCategories?.map?.(({ id: value, name: label }) => ({
              value,
              label,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="innovation_category"
          label={
            <div>
              <h4 className="h4-sm mb-3">{t('Innovation category')}</h4>
              <p className="p-sm text-secondary mb-2">
                {t(
                  'Innovation is where you are here. Select what type of innovation your product idea brings.'
                )}
              </p>
            </div>
          }
          className="mb-4 pb-2"
        >
          <Select
            mode="multiple"
            optionFilterProp="label"
            loading={productInnovationCategoriesLoading}
            options={productInnovationCategories?.map?.(
              ({ id: value, name: label }) => ({
                value,
                label,
              })
            )}
          />
        </Form.Item>

        <Form.Item
          name="tech_category"
          label={
            <div>
              <h4 className="h4-sm mb-3">{t('Tech category')}</h4>
              <p className="p-sm text-secondary mb-2">
                {t(
                  'Please pick up the category that matches best your product idea. Select several categories if you think it fits to several product universe.'
                )}
              </p>
            </div>
          }
          className="mb-4 pb-2"
        >
          <Select
            mode="multiple"
            optionFilterProp="label"
            loading={productTechCategoriesLoading}
            options={productTechCategories?.map?.(
              ({ id: value, name: label }) => ({
                value,
                label,
              })
            )}
          />
        </Form.Item>

        <Form.Item
          name="goals"
          label={
            <div>
              <h4 className="fs-14 fw-5 text-black mb-3">
                {t('Sustainable development goals (max 3.)')}
              </h4>
            </div>
          }
          className="mb-4 pb-2"
        >
          <GoalSelect max={3} />
        </Form.Item>

        <Form.Item
          name="project_market"
          rules={[{ required: true, message: 'This field is required' }]}
          label={
            <div>
              <h4 className="h4-sm mb-3 required-mark">{t('Market')}</h4>
              <p className="p-sm text-secondary mb-2">
                {t(
                  "Here you describe the people who according to you will say 'whoaou' to your project. How you see them: Age, gender, occupations. Reasons they will like it."
                )}
              </p>
            </div>
          }
          className="mb-4 pb-2"
        >
          <TextArea
            rows={5}
            placeholder="e.g. How to improve your social media profiles"
          />
        </Form.Item>

        <Form.Item
          name="price"
          rules={[{ required: true, message: 'This field is required' }]}
          label={
            <div>
              <h4 className="h4-sm mb-3 required-mark">{t('Price (EUR)')}</h4>
              <p className="p-sm text-secondary mb-2">
                {t(
                  'Here you can make some assumptions about what would look like a good market price for your target audience.'
                )}
              </p>
            </div>
          }
          className="mb-4 pb-2"
        >
          <InputNumber className="w-100" />
        </Form.Item>

        <Form.Item
          name="country"
          rules={[{ required: true, message: 'This field is required' }]}
          label={
            <div>
              <h4 className="h4-sm mb-2 required-mark">{t('Country')}</h4>
            </div>
          }
          className="mb-4 pb-2"
        >
          <CountrySelect />
        </Form.Item>

        <Form.Item
          name="language"
          rules={[{ required: true, message: 'This field is required' }]}
          label={
            <div>
              <h4 className="h4-sm mb-2 required-mark">{t('Language')}</h4>
            </div>
          }
          className="mb-4 pb-2"
        >
          <LanguageSelect />
        </Form.Item>

        <Form.Item
          name="project_image"
          rules={[{ required: true, message: 'This field is required' }]}
          label={
            <div>
              <h4 className="h4-sm mb-2 required-mark">{t('Project image')}</h4>
            </div>
          }
          className="mb-4 pb-2"
        >
          <ImageCrop
            aspect={2.4}
            className="w-100"
            style={{ aspectRatio: '2.4/1' }}
          >
            <img alt="" />
          </ImageCrop>
        </Form.Item>
        <div className="d-flex justify-content-end mt-5">
          <Button
            type="primary ml-3 px-4"
            size="large"
            htmlType="submit"
            loading={isSubmitting}
          >
            Create project
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateProductLauncher;
