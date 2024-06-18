/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import { Button, DatePicker, Divider, Drawer, Form, Input, Radio } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import CKEditor5 from '../../../../components/util-components/CkEditor';
import { submitMarketplacePricing } from '../../../../redux/actions';

const Pricing = ({ onPrevious, onNext, open, ExpertiseHeader, packages }) => {
  const { status } = useSelector(
    ({ marketplace }) => marketplace.marketplacePricingAction
  );

  const [isPricingCreated, setIsPricingCreated] = useState();

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { marketplaceId } = useParams();

  useEffect(() => {
    if (!isEmpty(packages)) {
      form.setFieldsValue({
        packages: packages?.map?.(
          ({
            updated_at,
            created_at,
            created_by,
            available_to,
            available_from,
            ...rest
          }) => ({
            ...rest,
            available_from: moment(available_from, 'YYYY-MM-DD'),
            available_to: moment(available_to, 'YYYY-MM-DD'),
            gig_id: marketplaceId,
          })
        ) || [{}],
      });
    }
  }, [form, marketplaceId, packages]);

  const onFinish = ({ ...values }) => {
    const payload = [...values.packages];
    dispatch(
      submitMarketplacePricing({
        id: packages?.[0]?.id || isPricingCreated,
        gig_id: marketplaceId,
        packages: payload?.map?.((data) => ({
          ...data,
          gig_id: marketplaceId,
        })),
        onSuccess: () => {
          setIsPricingCreated(true);
          onNext();
        },
      })
    );
  };
  return (
    <Drawer
      open={open}
      footer={null}
      closable={false}
      width={710}
      zIndex={999}
      contentWrapperStyle={{ maxWidth: '100vw' }}
      bodyStyle={{
        height: '100vh',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
      className="custom_styles"
    >
      <ExpertiseHeader />
      <div className="px-5 mx-1 flex-grow-1 d-flex flex-column">
        <h3 className="h3-lg mb-4">Pricing packages</h3>

        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          className="custom-form-style flex-grow-1 d-flex flex-column"
        >
          <Form.List initialValue={[{}]} name="packages" ru>
            {(fields, { add, remove }) => (
              <div>
                {fields?.map?.(({ key, name, ...restField }, indx) => (
                  <div key={key}>
                    <div
                      className="d-flex align-items-center"
                      style={{ gap: 20 }}
                    >
                      <div className="flex-grow-1">
                        <Form.Item
                          {...restField}
                          name={[name, 'how_get_paid']}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                          label={
                            <span className="hb-text-secondary">
                              How would you like to be paid?
                            </span>
                          }
                          initialValue="BANK_TRANSFER"
                        >
                          <Radio.Group className="d-flex align-items-center flex-wrap">
                            <Radio value="BANK_TRANSFER">
                              <p className="my-auto">
                                <span className="fs-13 fw-3">
                                  Bank transfer
                                </span>
                              </p>
                            </Radio>
                            <Radio value="HBB">
                              <span className="fs-13 fw-3">
                                HBB (utility tokens)
                              </span>
                            </Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'package_title']}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                          label={
                            <span className="hb-text-secondary">
                              Package title
                            </span>
                          }
                        >
                          <Input placeholder="e.g. Project 1" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'description']}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                          label={
                            <span className="hb-text-secondary">
                              Package description
                            </span>
                          }
                        >
                          <CKEditor5
                            placeholder="Description of your expertise"
                            rows={4}
                          />
                        </Form.Item>

                        <Form.Item
                          label={
                            <span className="hb-text-secondary">
                              Availability dates
                            </span>
                          }
                        >
                          <Row className="mb-n4">
                            <Col xs={12} md={6}>
                              <Form.Item
                                {...restField}
                                name={[name, 'available_from']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'This field is required',
                                  },
                                ]}
                                label={
                                  <span className="hb-text-secondary fs-13">
                                    From
                                  </span>
                                }
                              >
                                <DatePicker
                                  placeholder="DD/MM/YYY"
                                  className="w-100"
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={12} md={6}>
                              <Form.Item
                                {...restField}
                                name={[name, 'available_to']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'This field is required',
                                  },
                                ]}
                                label={
                                  <span className="hb-text-secondary fs-13">
                                    To
                                  </span>
                                }
                              >
                                <DatePicker
                                  placeholder="DD/MM/YYY"
                                  className="w-100"
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'package_price']}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                              min: 1,
                              validator: (_, value) => {
                                if (value > 0) {
                                  return Promise.resolve();
                                }
                                return Promise.reject('Price shold be min €1');
                              },
                            },
                            {
                              type: 'number',
                              message: 'This is not a valid number',
                            },
                          ]}
                          label={
                            <span className="hb-text-secondary">
                              Package price
                            </span>
                          }
                        >
                          <Input
                            type="number"
                            prefix={<span className="text-grey-light">€</span>}
                            suffix={
                              <span className="text-grey-light">EUR</span>
                            }
                            placeholder="200"
                          />
                        </Form.Item>
                      </div>

                      {fields?.length > 1 && (
                        <img
                          src="/assets/img/icons/delete-outline.svg"
                          alt=""
                          style={{ height: 23, marginBottom: 28 }}
                          className="cursor-pointer"
                          onClick={() => remove(indx)}
                        />
                      )}
                    </div>
                    <Divider
                      style={{ borderTop: '1px solid #E3E3E3' }}
                      className="mb-4"
                    />
                  </div>
                ))}

                <Button
                  type="text mt-n3"
                  onClick={() => add({})}
                  className="fs-10 fw-5 hb-text-primary mb-0 d-flex align-items-center cursor-pointer"
                >
                  + Add package
                </Button>
              </div>
            )}
          </Form.List>

          <div
            className="d-flex mt-auto py-4 justify-content-end"
            style={{ columnGap: 17 }}
          >
            <div>
              <Button
                type="ghost px-4 br-5"
                size="large"
                style={{ borderWidth: 2 }}
                onClick={onPrevious}
              >
                <div className="fs-13 fw-5">Previous step</div>
              </Button>
            </div>

            <Button
              type="primary ml2 px-4"
              size="large"
              onClick={() => form.submit()}
              loading={status === 'submitting'}
            >
              <span className="fs-13 fw-5">Next step</span>
            </Button>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};

export default Pricing;
