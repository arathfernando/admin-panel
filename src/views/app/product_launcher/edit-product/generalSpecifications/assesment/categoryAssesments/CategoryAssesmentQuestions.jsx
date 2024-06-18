/* eslint-disable camelcase */
import { Divider, Form, Radio } from 'antd';
import React, { Fragment } from 'react';
import useTranslation from '../../../../../../../helpers/useTranslation';

const CategoryAssesmentQuestions = ({
  assessments,
  initialAssessments,
  sub_category_id,
}) => {
  const { t } = useTranslation();
  return (
    <Form.List initialValue={initialAssessments} name={sub_category_id}>
      {(fields) => (
        <div className="mt-4 pt-3 pb-1">
          {fields.map(({ key, name, ...restField }, indx) => (
            <Fragment key={key}>
              <div
                className="d-flex align-items-center w-100 justify-content-between flex-grow-1"
                style={{ gap: 5 }}
              >
                <h6 className="h6-lg mb-0">
                  {indx + 1}. {t(assessments[indx]?.product_sub_faq)}
                </h6>
                <Form.Item
                  {...restField}
                  name={[name, 'product_sub_faq_ans']}
                  rules={[
                    {
                      required: true,
                      message: `${t(
                        assessments[indx]?.product_sub_faq
                      )} is required`,
                    },
                  ]}
                  noStyle
                >
                  <Radio.Group>
                    <div className="d-flex" style={{ columnGap: 15 }}>
                      {assessments[indx]?.product_sub_faq_ans?.map?.(
                        (answer) => (
                          <Radio value={answer} key={answer}>
                            <span className="fs-13 fw-3">{t(answer)}</span>
                          </Radio>
                        )
                      )}
                    </div>
                  </Radio.Group>
                </Form.Item>
              </div>
              <Divider
                style={{
                  borderTop: '1px solid #C4C4C4',
                  margin: '10px 0px 20px 0px',
                }}
              />
            </Fragment>
          ))}
        </div>
      )}
    </Form.List>
  );
};

export default CategoryAssesmentQuestions;
