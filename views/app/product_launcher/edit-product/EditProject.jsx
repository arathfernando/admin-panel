/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { Button, Form, Tabs } from 'antd';
import { useForm, useWatch } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ImageCrop from '../../../../components/UploadImage';
import arrayToCommaSeparateString from '../../../../helpers/arrayToCommaSeparateString';
import useTranslation from '../../../../helpers/useTranslation';
import { getProduct, submitProductBasic } from '../../../../redux/actions';
import Teammates from './generalSpecifications/Teammates';
import ProductAssesment from './generalSpecifications/assesment';
import ProductDetails from './generalSpecifications/details';
import ProductWokspaces from './workspace/index.jsx';

const EditProject = () => {
  const [activeTabKey, setActiveTabKey] = useState('details');

  const [form] = useForm();

  const project_name = useWatch('project_name', form);
  const project_image = useWatch('project_image', form);

  const { productId } = useParams();

  // Assesment
  const [selectedCategory, setSelectedCategory] = useState('');

  const { t } = useTranslation();

  const product = useSelector(({ product }) => product.product.data);
  const dispatch = useDispatch();

  useEffect(() => {
    productId && dispatch(getProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTabKey]);

  useEffect(() => {
    if (productId) {
      form.setFieldsValue({
        ...product,
        product_category: product?.product_category?.id,
        innovation_category:
          product?.innovation_category?.map?.(({ id }) => id) || [],
        tech_category: product?.tech_category?.map?.(({ id }) => id) || [],
        goals: product?.goals?.map?.(({ id }) => id),
      });
    }
  }, [productId, product, form]);

  const onFinish = ({
    goals,
    tech_category,
    innovation_category,
    ...values
  }) => {
    const payload = {
      ...values,
      id: productId,
      goals: arrayToCommaSeparateString(goals),
      tech_category: arrayToCommaSeparateString(tech_category),
      innovation_category: arrayToCommaSeparateString(innovation_category),
    };
    dispatch(
      submitProductBasic({
        ...payload,
        onSuccess: () => {
          setActiveTabKey('assesment');
        },
      })
    );
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      className="custom-form-style"
      hideRequiredMark
    >
      <div className="px-0 px-md-2 px-lg-3">
        <h2 className="h2-lg hb-text-primary mb-0">{project_name}</h2>
        <div
          className="mb-4 mt-4"
          style={{ display: activeTabKey === 'assesment' && 'none' }}
        >
          <Form.Item>
            <Form.Item
              name="project_image"
              rules={[{ required: true, message: 'This field is required' }]}
              noStyle
            >
              <ImageCrop
                aspect={2.4}
                className="w-100"
                style={{ aspectRatio: '2.4/1' }}
              >
                <img src={project_image} alt="" />
              </ImageCrop>
            </Form.Item>
          </Form.Item>
        </div>

        {activeTabKey === 'assesment' && !selectedCategory && (
          <div className="mb-3 mt-4">
            <div
              className="position-relative d-flex align-items-center justify-content-center"
              style={{ aspectRatio: '2.85/1', minHeight: 'fit-content' }}
            >
              <div
                className="position-absolute"
                style={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <img
                  src="/assets/img/product-launcher/product-cover.jpg"
                  alt=""
                  className="w-100 h100"
                />
              </div>
              <div
                className="d-flex my-auto h-fit-content w-100 justify-content-center align-items-center flex-column px-2 py-3 position-relative"
                style={{ zIndex: 1 }}
              >
                <h2 className="h2-sm text-white mb-3">
                  {t('Product launcher quiz')}
                </h2>
                <h4
                  className="h4-sm text-white mb-4 pb-2 text-center"
                  style={{ maxWidth: 543 }}
                >
                  {t(
                    'Welcome to Hubbers product launchassessment tool. Fulfill 70% at least and get closer to your launch'
                  )}
                </h4>
                <Button
                  type="primary btn-text-md px-4 mb-3 br-4"
                  size="large"
                  style={{ zIndex: 2 }}
                >
                  {t('Get started')}
                </Button>
                <p className="btn-text-md mb-0 text-white">
                  14720 {t('product creators have used it')}{' '}
                </p>
              </div>
            </div>
          </div>
        )}

        <h3 className="h3-lg" style={{ marginBottom: 14 }}>
          Workspaces
        </h3>
        <div className="mb-4">
          <ProductWokspaces />
        </div>

        <div className="pt-4">
          <Tabs
            type="card"
            className="tab-style-1"
            onChange={(activeKey) => setActiveTabKey(activeKey)}
            activeKey={activeTabKey}
            items={[
              {
                label: t('details'),
                key: 'details',
                children: (
                  <ProductDetails
                    onSubmit={() => setActiveTabKey('assesment')}
                    onLater={false}
                  />
                ),
              },
              {
                label: t('Assesment'),
                key: 'assesment',
                disabled: !productId,
                children: (
                  <ProductAssesment
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    onBouldYourTeam={() => setActiveTabKey('business_needs')}
                  />
                ),
              },
              {
                label: t('Business needs'),
                key: 'business_needs',
                disabled: !productId,
                children: (
                  <div style={{ minHeight: 'calc(100vh - 300px)' }}>
                    {'<Business needs />'}
                  </div>
                ),
              },
              {
                label: t('Teammates'),
                key: 'teammates',
                disabled: !productId,
                children: <Teammates form={form} />,
              },
            ]}
          />
        </div>
      </div>
    </Form>
  );
};

export default EditProject;
