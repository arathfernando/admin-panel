/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import { Button, Divider, Drawer, Form, Input } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CKEditor5 from '../../../../components/util-components/CkEditor';
import { submitMarketplaceFaq } from '../../../../redux/actions';

const FAQ = ({ onPrevious, onNext, open, ExpertiseHeader, faqs = [] }) => {
  const { status } = useSelector(
    ({ marketplace }) => marketplace.marketplaceFaqAction
  );

  const [isFaqCreated, setIsFaqCreated] = useState();

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { marketplaceId } = useParams();

  useEffect(() => {
    if (!isEmpty(faqs)) {
      form.setFieldsValue({
        faq: faqs?.map?.(({ updated_at, created_at, created_by, ...rest }) => ({
          ...rest,
        })) || [{}],
      });
    }
  }, [faqs, form]);

  const onFinish = ({ faq }) => {
    const payload = {
      id: faqs?.[0]?.id || isFaqCreated,
      faq: faq?.map?.((data) => ({
        ...data,
        gig_id: marketplaceId,
      })),
    };

    dispatch(
      submitMarketplaceFaq({
        ...payload,
        gig_id: marketplaceId,
        onSuccess: () => {
          setIsFaqCreated(true);
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
        <h3 className="h3-lg">FAQ</h3>
        <h6 className="h6-lg text-black mb-4">
          Add questions and answers for your clients
        </h6>

        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          className="custom-form-style flex-grow-1 d-flex flex-column"
        >
          <Form.List initialValue={[{}]} name="faq" ru>
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
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                          name={[name, 'question']}
                          label={
                            <span className="hb-text-secondary">Question</span>
                          }
                        >
                          <Input placeholder="e.g. Project 1" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          rules={[
                            {
                              required: true,
                              message: 'This field is required',
                            },
                          ]}
                          name={[name, 'answer']}
                          label={
                            <span className="hb-text-secondary">Answer</span>
                          }
                        >
                          <CKEditor5
                            placeholder="Description of your expertise"
                            rows={4}
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
                  type="text mt-n4"
                  onClick={() => add({})}
                  className="fs-10 fw-5 hb-text-primary mb-0 d-flex align-items-center cursor-pointer"
                >
                  + Add question
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

export default FAQ;
