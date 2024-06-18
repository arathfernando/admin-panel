/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tooltip } from 'antd';
import { useWatch } from 'antd/lib/form/Form';
import { isArray, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../../../../helpers/utils/index';
import usePermission from '../../../../hooks/usePermission';
import * as Actions from '../../../../redux/actions';
import { exchangeProductSubcateoryFaqOrder } from '../../../../redux/actions';
import CreateProductSubCategoryFAQ from './CreateProductSubCategoryFAQ';

const ProductSubCategoryFAQTable = ({ form }) => {
  const dispatch = useDispatch();
  const { data: productSubCategoryFAQs, loading } = useSelector(
    ({ productSubCategoryFAQ }) => productSubCategoryFAQ.productSubCategoryFAQ
  );
  const { data: orderData, status } = useSelector(
    (state) => state.productSubCategoryFAQ.productSubcateoryFaqOrderAction
  );

  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 10,
  });

  const { hasEditPermission, hasDeletePermission, hasChangeOrderPermission } =
    usePermission();

  // update product subcategory faq
  const [openUpdateProductSubCategoryFAQ, setOpenUpdateProductSubCategoryFAQ] =
    useState(false);
  const [updateProductSubCategoryFAQData, setUpdateProductSubCategoryFAQData] =
    useState({});

  // filter states
  const [idFilters, setIDFilters] = useState([{}]);
  const [questionFilters, setQuestionFilters] = useState([{}]);
  const [answerFilters, setAnswerFilters] = useState([{}]);
  const [default_answerFilters, setDefaultAnswerFilters] = useState([{}]);
  const [orderFilters, setOrderFilters] = useState([{}]);

  const { data: productCategories } = useSelector(
    ({ productCategory }) => productCategory.productCategories
  );
  const { data: productSubCategories } = useSelector(
    ({ productSubCategory }) => productSubCategory.productSubCategories
  );

  const product_category_filter = useWatch('product_category', form);
  const product_subcategory_filters = useWatch('product_subcategory', form);
  const faq_percentage_filters = useWatch('faq_percentage', form);

  useEffect(() => {
    dispatch(Actions.getProductSubCategoryFAQ());
  }, [dispatch]);

  const handledeleteProductSubCategoryFAQ = ({ id, question, answer }) => {
    dispatch(
      Actions.deleteProductSubcategoryFaq({
        id,
        translate: {
          removeKeys: [
            { key: question },
            ...(answer?.map((key) => ({ key })) || []),
          ],
        },
      })
    );
  };

  const handleOrderUp = (elm) => {
    const currecntElId = elm.id;
    const currentOrder = elm.order;
    const downOrderElm = productSubCategoryFAQs
      .sort((a, b) => b.order - a.order)
      .find(({ order }) => order < currentOrder);
    const downElId = downOrderElm?.id;
    const orderDownNo = downOrderElm?.order;

    if (currentOrder && currecntElId && downElId && orderDownNo) {
      dispatch(
        exchangeProductSubcateoryFaqOrder({
          base_id: downElId,
          update_id: currecntElId,
        })
      );
    }
  };
  const handleOrderDown = (elm) => {
    const currecntElId = elm.id;
    const currentOrder = elm.order;
    const upOrderElm = productSubCategoryFAQs
      .sort((a, b) => a.order - b.order)
      .find(({ order }) => order > currentOrder);
    const upElId = upOrderElm?.id;
    const orderUpNo = upOrderElm?.order;
    if (currentOrder && currecntElId && upElId && orderUpNo) {
      dispatch(
        exchangeProductSubcateoryFaqOrder({
          base_id: currecntElId,
          update_id: upElId,
        })
      );
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'id'),
      filters: idFilters,
      onFilter: (value, { id }) => id == value,
      filterSearch: (input) => {
        setTimeout(() => setIDFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Product category',
      render: (_, { product_subcategory }) =>
        product_subcategory?.product_category?.name,
      key: 'product_category',
      filters: productCategories?.map?.(
        ({ id: value, name: text }) =>
          ({
            value,
            text,
          } || [])
      ),
      onFilter: (value, { product_subcategory }) =>
        product_subcategory?.product_category?.id === Number(value),
      filteredValue: [
        ...(product_category_filter ? [product_category_filter] : []),
      ],
      filterDropdownOpen: false,
    },
    {
      title: 'Product subcategory',
      render: (_, { product_subcategory }) => product_subcategory?.name,
      key: 'product_subcategory',
      filters: productSubCategories?.map?.(
        ({ id: value, name: text }) =>
          ({
            value,
            text,
          } || [])
      ),
      onFilter: (value, { product_subcategory }) =>
        product_subcategory?.id === Number(value),
      filteredValue: product_subcategory_filters,
      filterDropdownOpen: false,
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      filters: questionFilters,
      onFilter: (value, { question }) =>
        question?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setQuestionFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Answer',
      render: (_, { answer }) =>
        answer?.map?.(
          (data, indx) => `${data}${answer.length > indx + 1 ? ', ' : ''}`
        ),
      key: 'answer',
      filters: answerFilters,
      onFilter: (value, { answer }) => {
        const mashedAnswers = answer.filter((data) =>
          data?.toLowerCase().includes(value?.toLowerCase())
        );

        return !isEmpty(mashedAnswers);
      },
      filterSearch: (input) => {
        setTimeout(() => setAnswerFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Default answer',
      dataIndex: 'default_answer',
      key: 'default_answer',
      filters: default_answerFilters,
      onFilter: (value, { default_answer }) =>
        default_answer?.toLowerCase().includes(value?.toLowerCase()),
      filterSearch: (input) => {
        setTimeout(
          () => setDefaultAnswerFilters([{ text: input, value: input }]),
          0
        );
        return true;
      },
    },
    {
      title: 'Percentage',
      render: (_, { percentage }) => `${percentage || 0}%`,
      key: 'percentage',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'percentage'),
      filters: [
        {
          text: '1% - 10%',
          value: 1,
        },
        {
          text: '11% - 20%',
          value: 11,
        },
        {
          text: '21% - 30%',
          value: 21,
        },
        {
          text: '31% - 40%',
          value: 31,
        },
        {
          text: '41% - 50%',
          value: 41,
        },
        {
          text: '51% - 60%',
          value: 51,
        },
        {
          text: '61% - 70%',
          value: 61,
        },
        {
          text: '71% - 80%',
          value: 71,
        },
        {
          text: '81% - 90%',
          value: 81,
        },
        {
          text: '91% - 100%',
          value: 91,
        },
      ],
      onFilter: (value, { percentage }) =>
        percentage > value - 1 && percentage < value + 10,
      filteredValue: faq_percentage_filters,
      filterDropdownOpen: false,
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'order'),
      filters: orderFilters,
      onFilter: (value, { order }) => order == value,
      filterSearch: (input) => {
        setTimeout(() => setOrderFilters([{ text: input, value: input }]), 0);
        return true;
      },
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (_, data) => (
        <Space>
          <Button
            type="ghost"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setOpenUpdateProductSubCategoryFAQ(true);
              setUpdateProductSubCategoryFAQData(data);
            }}
            disabled={!hasEditPermission}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure delete this Item?"
              onConfirm={() => handledeleteProductSubCategoryFAQ(data)}
              onCancel={() => console.log('Canceled to delete')}
              okText="Yes"
              cancelText="No"
              disabled={!hasDeletePermission}
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                size="small"
                disabled={!hasDeletePermission}
              />
            </Popconfirm>
          </Tooltip>

          <Button
            size="small"
            type="default"
            icon={<ArrowUpOutlined />}
            loading={status === 'submitting' && orderData.update_id === data.id}
            onClick={() => handleOrderUp(data)}
            disabled={!hasChangeOrderPermission}
          />
          <Button
            size="small"
            type="default"
            loading={status === 'submitting' && orderData.base_id === data.id}
            icon={<ArrowDownOutlined />}
            onClick={() => handleOrderDown(data)}
            disabled={!hasChangeOrderPermission}
          />
        </Space>
      ),
    },
  ];

  const handleTableChange = (params) => {
    setPagenation(params.pagination);
  };

  return (
    <>
      <Table
        dataSource={
          isArray(productSubCategoryFAQs) ? productSubCategoryFAQs : []
        }
        columns={columns}
        className="custom-table"
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        loading={loading}
      />
      <CreateProductSubCategoryFAQ
        open={openUpdateProductSubCategoryFAQ}
        data={updateProductSubCategoryFAQData}
        onCancel={() => {
          setOpenUpdateProductSubCategoryFAQ(false);
          setUpdateProductSubCategoryFAQData({});
        }}
      />
    </>
  );
};

export default ProductSubCategoryFAQTable;
