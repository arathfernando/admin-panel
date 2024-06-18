/* eslint-disable no-unused-expressions */
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as Actions from '../redux/actions';

const useBasicTypesByBasicTypeCategory = ({ name }) => {
  const { list: basicTypes, loading: loadingBasicTypes } = useSelector(
    (state) => state.basicType,
    shallowEqual
  );
  const { typeList: basicTypeCategories, loading: loadingBasicTypeCategories } =
    useSelector((state) => state.basicTypeCategory, shallowEqual);

  const [basicTppesOfBasicTypeCategory, setbasicTppesOfBasicTypeCategory] =
    useState({ basicTypes: [] });

  const dispatch = useDispatch();

  useEffect(() => {
    isEmpty(basicTypeCategories) && dispatch(Actions.getAllBasicTypeCategory());
    isEmpty(basicTypes) && dispatch(Actions.getAllBasicType());
  }, [basicTypeCategories, basicTypes, dispatch]);

  useEffect(() => {
    if (!isEmpty(basicTypes) && !isEmpty(basicTypeCategories)) {
      const basicTypeCategory = basicTypeCategories?.find((typCategory) => {
        const typeCategoryName = new RegExp(typCategory.name, 'i');
        return name.match(typeCategoryName);
      });

      if (basicTypeCategory) {
        setbasicTppesOfBasicTypeCategory({
          ...basicTypeCategory,
          basicTypes:
            basicTypes?.filter(
              (basicType) => basicType.category?.id === basicTypeCategory.id
            ) || [],
        });
      } else {
        setbasicTppesOfBasicTypeCategory({ basicTypes: [] });
      }
    }
  }, [basicTypes, basicTypeCategories, name]);

  return {
    data: basicTppesOfBasicTypeCategory,
    basicTypes: basicTppesOfBasicTypeCategory?.basicTypes || [],
    loading: loadingBasicTypes || loadingBasicTypeCategories,
  };
};

export default useBasicTypesByBasicTypeCategory;
