/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import { Button, Divider, Form, Radio, Tabs, Tooltip } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from '../../../../../../../components/util-components/Loading';
import useTranslation from '../../../../../../../helpers/useTranslation';
import useMediaQuery from '../../../../../../../hooks/useMediaQuery';
import CategoryAssesmentProgress from './CategoryAssesmentProgress';
import CategoryAssesmentQuestions from './CategoryAssesmentQuestions';

SwiperCore.use([Navigation]);

const CategoryAssesments = ({ form }) => {
  const { data: productSubcategoryByCategoryData, loading } = useSelector(
    ({ product }) => product.productSubcategoryByCategory
  );
  const { status } = useSelector(
    ({ product }) => product.productAssessmentsAction
  );

  const { data: productCategoryFaqData } = useSelector(
    ({ product }) => product.productCategoryFaq
  );

  const [productSubcategoryByCategory, setProductSubcategoryByCategory] =
    useState([]);

  const [submitType, setSubmitType] = useState('');
  const { md, sm, xl } = useMediaQuery();

  const sub_category = useWatch('sub_category', form);
  const sub_category_faq = useWatch(sub_category, form);

  const [selectedCategory, setselectedCategory] = useState({});

  const { t } = useTranslation();

  // set subcategory data of caterory
  useEffect(() => {
    setProductSubcategoryByCategory(
      productSubcategoryByCategoryData?.filter(
        ({ question_count }) => question_count
      ) || []
    );
    // select first subcategory initially
    const firstSubcategoryId = productSubcategoryByCategoryData?.[0]?.id;
    firstSubcategoryId &&
      form.setFieldValue('sub_category', firstSubcategoryId);
  }, [form, productSubcategoryByCategoryData]);

  // set subcategory data by subcategory_id
  useEffect(() => {
    if (sub_category) {
      setselectedCategory(
        productSubcategoryByCategory.find(({ id }) => sub_category === id) || {}
      );
    }
  }, [productSubcategoryByCategory, sub_category]);

  // calcilate question answered percentage count
  const completedPercent = useMemo(
    () =>
      productSubcategoryByCategory.length
        ? Math.floor(
            productSubcategoryByCategory?.reduce((prevVal, crVal) => {
              const answeredFaq = form.getFieldValue(crVal?.id);
              const totalAnsweredFaqOfSubcategory = answeredFaq
                ? answeredFaq?.reduce?.(
                    (prevFaqVal, crFaqVal) =>
                      prevFaqVal +
                      (crFaqVal?.product_sub_faq_ans
                        ? crFaqVal?.product_sub_percentage
                        : 0 || 0),
                    0
                  )
                : 0;

              return prevVal + totalAnsweredFaqOfSubcategory;
            }, 0)
          )
        : 0,
    [form, productSubcategoryByCategory, sub_category_faq]
  );

  // select prev subcategory
  const handlePrev = () => {
    form.setFieldValue(
      'sub_category',
      productSubcategoryByCategory?.[
        productSubcategoryByCategory.findIndex(
          ({ order }) => selectedCategory?.order === order
        ) - 1
      ]?.id || form.getFieldValue('sub_category')
    );
  };

  // select next subcategory
  const handleNext = () => {
    form.setFieldValue(
      'sub_category',
      productSubcategoryByCategory?.[
        productSubcategoryByCategory.findIndex(
          ({ order }) => selectedCategory?.order === order
        ) + 1
      ]?.id || form.getFieldValue('sub_category')
    );
  };

  return (
    <div className="categoty-assesment">
      <Divider className="my-0" style={{ borderTop: '1px solid #C4C4C4' }} />

      <div className="px-1 pt-5 py-3 mb-4 pb-4 option-container category-box-container scrollbar-hidden position-relative">
        <Loading loading={loading} />
        <Form.Item name="sub_category" noStyle>
          <Swiper
            spaceBetween={10}
            slidesPerView={xl ? 6 : md ? 4 : sm ? 3 : 2}
            className="m-n2"
            navigation
            autoplay={{ disableOnInteraction: false, delay: 30 }}
          >
            {productSubcategoryByCategory.map((subcategory) => (
              <SwiperSlide
                key={subcategory?.id}
                className="p-2"
                style={{ height: 'unset' }}
              >
                <Radio.Group className="radio-nostyle d-flex w-100 h-100">
                  <Radio
                    value={subcategory.id}
                    key={subcategory.id}
                    className=" w-100 h-100"
                  >
                    <div
                      className={`category-box  w-100 p-2${
                        selectedCategory.order === subcategory.order
                          ? ` active-option`
                          : ''
                      }${
                        selectedCategory.order > subcategory.order
                          ? ` completed`
                          : ''
                      }`}
                      style={{
                        height: 132,
                      }}
                      onClick={() =>
                        form.setFieldValue('sub_category', subcategory?.id)
                      }
                    >
                      <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-evenly">
                        <img src={subcategory.cover} alt="" className="icon" />
                        <Tooltip
                          title={t(subcategory.name)}
                          placement="bottomRight"
                        >
                          <h6 className="h6-sm mb-0 text-center w-100 text-elps-2">
                            {t(subcategory.name)}
                          </h6>
                        </Tooltip>
                        <p className="btn-text-sm text-grey-light text-elps mb-0">
                          {`${
                            form
                              .getFieldValue(subcategory?.id)
                              ?.filter(
                                ({ product_sub_faq_ans }) => product_sub_faq_ans
                              )?.length || 0
                          }/${subcategory.question_count || 0} ${t(
                            'completed'
                          )}`}
                        </p>
                      </div>
                    </div>
                  </Radio>
                </Radio.Group>
              </SwiperSlide>
            ))}
          </Swiper>
        </Form.Item>
      </div>

      {productSubcategoryByCategory.length > 0 && (
        <CategoryAssesmentProgress percent={completedPercent} />
      )}

      {productSubcategoryByCategory.length > 0 && (
        <Button
          type="primary btn-text-md mt-2 px-4"
          size="large"
          icon={
            <img
              src="/images/product-launcher/save-draft-icon.svg"
              alt=""
              className="me-2"
            />
          }
          onClick={() => {
            setSubmitType('draft');
            form.submit();
          }}
          loading={status === 'submitting' && submitType === 'draft'}
        >
          {t('Save draft')}
        </Button>
      )}

      {sub_category && (
        <Tabs
          type="card"
          className="tab-no-tabs"
          activeKey={sub_category}
          items={Object.keys(productCategoryFaqData).map((key) => {
            return {
              key: Number(key),
              children: (
                <CategoryAssesmentQuestions
                  sub_category_id={Number(key)}
                  assessments={productCategoryFaqData?.[key]}
                  initialAssessments={productCategoryFaqData?.[key]?.map(
                    ({ product_sub_faq_ans, ...data }) => ({
                      ...data,
                      product_sub_faq_ans:
                        product_sub_faq_ans?.find?.(
                          (sub_faq_ans) =>
                            sub_faq_ans === data.product_sub_faq_default_ans
                        ) && data.product_sub_faq_default_ans,
                    })
                  )}
                />
              ),
            };
          })}
        />
      )}

      <div className="mt-4 d-flex justify-content-between align-items-center flex-wrap mb-n5">
        <Button
          type="ghost br-5 bw-3 px-4 btn-text-md"
          size="large"
          onClick={handlePrev}
        >
          {productSubcategoryByCategory.findIndex(
            ({ order }) => selectedCategory?.order === order
          ) > 0 && 'Previous category'}
        </Button>
        {productSubcategoryByCategory.length > 0 && (
          <p className="btn-text-md text-black my-2">
            {productSubcategoryByCategory.findIndex(
              ({ order }) => selectedCategory.order === order
            ) < 0
              ? 0
              : productSubcategoryByCategory.findIndex(
                  ({ order }) => selectedCategory.order === order
                )}{' '}
            of {productSubcategoryByCategory.length} {t('categories completed')}
          </p>
        )}
        {completedPercent === 100 ? (
          <Button
            type="ghost br-5 bw-3 px-4 btn-text-md"
            size="large"
            onClick={() => {
              setSubmitType('submit');
              form.submit();
            }}
            loading={status === 'submitting' && submitType === 'submit'}
          >
            {t('Submit')}
          </Button>
        ) : productSubcategoryByCategory.length ? (
          <Button
            type="ghost br-5 bw-3 px-4 btn-text-md"
            size="large"
            onClick={handleNext}
          >
            {t('Next category')}
          </Button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
};

export default CategoryAssesments;
