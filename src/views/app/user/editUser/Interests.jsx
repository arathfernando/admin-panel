import { Button, Form, Select } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../../../components/util-components/Loading';
import {
  getBasicTypeCategories,
  getBasicTypes,
  updateUserInterests,
} from '../../../../redux/actions';

const Interest = () => {
  const { status } = useSelector(({ users }) => users.userInterestsAction);
  const basicTypeCategories = useSelector(
    ({ users }) => users.basicTypeCategories.data,
    shallowEqual
  );
  const basicTypes = useSelector(
    ({ users }) => users.basicTypes.data,
    shallowEqual
  );

  const loadingBasicTypes = useSelector(
    ({ users }) => users.basicTypes.loading
  );

  const interestsOfUser = useSelector(
    ({ users }) => users.singleUser.interest || [],
    shallowEqual
  );
  const { isRefetching, loading, error } = useSelector(
    ({ users }) => users.singleUser
  );

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { id } = useParams();

  const getFormattedTypeCategoriesWithTypes = () => {
    const formattedTypeCategoriesWithTypes = {};
    basicTypeCategories.forEach((category) => {
      formattedTypeCategoriesWithTypes[category.id] = basicTypes.reduce(
        (prebValue, crValue) => {
          if (crValue.category?.id === category.id) {
            prebValue.push({
              ...crValue,
              label: crValue.name,
              value: crValue.id,
            });
          }
          return prebValue;
        },
        []
      );
    });
    return formattedTypeCategoriesWithTypes;
  };
  const formattedTypeCategoriesWithTypes = useMemo(
    () => getFormattedTypeCategoriesWithTypes(),
    [basicTypeCategories, basicTypes]
  );

  const getFormattedTypeCategoriesWithTypesOfUser = () => {
    const formattedTypeCategoriesWithTypesOfUser = {};
    if (!isEmpty(basicTypeCategories) && !isEmpty(basicTypes)) {
      interestsOfUser.forEach((data) => {
        const interestIds = data.interests?.map((interest) => interest?.id);
        formattedTypeCategoriesWithTypesOfUser[data.type_category?.id] =
          interestIds;
      });
    }
    return formattedTypeCategoriesWithTypesOfUser;
  };
  const formattedTypeCategoriesWithTypesOfUser = useMemo(
    () => getFormattedTypeCategoriesWithTypesOfUser(),
    [interestsOfUser, basicTypeCategories, basicTypes]
  );

  useEffect(() => {
    dispatch(getBasicTypeCategories());
    dispatch(getBasicTypes());
  }, [dispatch]);

  const onFinish = ({ interests }) => {
    const payload = {
      interests: interests.map((value, indx) => ({
        type_category: basicTypeCategories[indx]?.id,
        interests: value || [null],
      })),
    };
    dispatch(
      updateUserInterests({
        id,
        ...payload,
      })
    );
  };

  return (
    <div
      className="p-4 p-md-5 position-relative mx-auto"
      style={{ minHeight: 'calc(100vh - 250px)', maxWidth: 807 }}
    >
      <Form
        form={form}
        layout="vertical"
        name="control-hooks"
        className="custom-form-style"
        onFinish={onFinish}
      >
        <div
          className="position-relative"
          style={{
            minHeight: 250,
          }}
        >
          <>
            <Loading
              loading={loadingBasicTypes || (loading && !isRefetching)}
            />

            <Form.List name="interests">
              {() =>
                isEmpty(formattedTypeCategoriesWithTypesOfUser)
                  ? null
                  : basicTypeCategories.map((category, indx) => (
                      <div key={category.id}>
                        <h3
                          className="h3-md text-black"
                          style={{ marginBottom: 10 }}
                        >
                          {category.display_name}
                        </h3>
                        <h6
                          className="p-md text-black"
                          style={{ marginBottom: 10 }}
                        >
                          Choose the type of {category.display_name} that you
                          are interested in or you are developing
                        </h6>
                        <Form.Item
                          name={indx}
                          initialValue={
                            formattedTypeCategoriesWithTypesOfUser[category.id]
                          }
                          style={{ marginBottom: 35 }}
                        >
                          <Select
                            mode="multiple"
                            placeholder={`Please select ${category.display_name}`}
                            allowClear
                            className="w-100"
                            options={
                              formattedTypeCategoriesWithTypes[category.id]
                            }
                          />
                        </Form.Item>
                      </div>
                    ))
              }
            </Form.List>
          </>
        </div>

        <div className="d-flex justify-content-end">
          <Button
            type="primary btn-text-md px-4"
            size="large"
            htmlType="submit"
            style={{ height: 49 }}
            onClick={() => {}}
            loading={status === 'submitting'}
            disabled={(loading && !isRefetching) || error}
          >
            <span className="px-3">Save changes</span>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Interest;
