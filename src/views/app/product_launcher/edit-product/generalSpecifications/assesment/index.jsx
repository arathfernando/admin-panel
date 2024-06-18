/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Form, Radio } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from '../../../../../../components/util-components/Loading';
import useTranslation from '../../../../../../helpers/useTranslation';
import useMediaQuery from '../../../../../../hooks/useMediaQuery';
import {
  getProductCategories,
  getProductCategoryFaq,
  getProductSubcategoryByCategory,
  submitProductAssessments,
} from '../../../../../../redux/actions';
import CategoryAssesments from './categoryAssesments';

SwiperCore.use([Navigation]);

const ProductAssesment = ({
  selectedCategory,
  setSelectedCategory,
  onBouldYourTeam,
}) => {
  const { data: productCategories, loading } = useSelector(
    ({ productCategory }) => productCategory.productCategories
  );
  const { data: productSubcategoryByCategory } = useSelector(
    ({ product }) => product.productSubcategoryByCategory
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { productId } = useParams();
  const category_id = useWatch('category', form);
  const { md, sm, xl } = useMediaQuery();

  const { t } = useTranslation();

  useEffect(() => {
    setSelectedCategory(category_id);
    if (category_id) {
      dispatch(getProductCategoryFaq(category_id));
      dispatch(getProductSubcategoryByCategory(category_id));
    }
  }, [category_id, dispatch, setSelectedCategory]);

  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);

  const onFinish = ({ category, sub_category, ...values }) => {
    const faq = [];
    productSubcategoryByCategory?.forEach?.(({ id }) =>
      values[id]?.forEach?.(
        ({
          product_sub_faq_default_ans,
          product_sub_question,
          product_sub_percentage,
          ...assessment
        }) => faq.push(assessment)
      )
    );
    const payload = {
      faq,
    };
    dispatch(
      submitProductAssessments({
        ...payload,
        project_id: productId,
        onSuccess: onBouldYourTeam,
      })
    );
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        className="custom-form-style"
        hideRequiredMark
      >
        <div className="px-4 py-2">
          <div className="px-0 px-md-2 mx-lg-3 px-xl-4 mb-4 pb-3">
            <h4 className="h4-sm text-black mb-4 pb-3">
              {t('Start by choosing the category of your product')}
            </h4>
            <div className="option-container mb-4 pb-2 position-relative w-100">
              <Loading loading={loading} />
              <Form.Item name="category" noStyle>
                <Radio.Group className="radio-nostyle d-flex w-100">
                  <Swiper
                    spaceBetween={14}
                    slidesPerView={xl ? 6 : md ? 4 : sm ? 3 : 2}
                    className="m-n2"
                    navigation
                  >
                    {productCategories.map?.((category) => (
                      <SwiperSlide
                        key={category?.id}
                        className="p-2"
                        style={{ height: 'unset' }}
                      >
                        <Radio
                          value={category.id}
                          key={category.id}
                          className="w-100"
                        >
                          <div
                            className={`br-5 p-2 cursor-pointer w-100${
                              category_id === category?.id
                                ? ` active-option`
                                : ''
                            }`}
                            onClick={() => setSelectedCategory(category?.id)}
                            style={{
                              boxShadow:
                                '1px 1px 10px rgba(205, 205, 205, 0.51)',
                              height: 158,
                            }}
                          >
                            <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-evenly">
                              <img
                                src={category?.cover}
                                alt=""
                                style={{ width: 65, height: 65 }}
                              />
                              <h6 className="h6-lg text-black mb-0 text-center">
                                {t(category?.name)}
                              </h6>
                            </div>
                          </div>
                        </Radio>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Radio.Group>
              </Form.Item>
            </div>

            {selectedCategory && <CategoryAssesments form={form} />}
          </div>
        </div>
      </Form>
    </>
  );
};

export default ProductAssesment;
