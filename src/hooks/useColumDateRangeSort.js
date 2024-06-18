/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FieldTimeOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useRef } from 'react';
import { getNestedValue } from '../helpers/Utils';
import utils from '../helpers/utils/index';

const { RangePicker } = DatePicker;

const useColumDateRangeSort = () => {
  const searchInput = useRef(null);

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    confirm();
  };

  const getColumDateRangeSortProps = (dataIndex) => ({
    key: `${dataIndex}`,
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{ padding: 8 }}
        className="d-flex flex-column"
        onKeyDown={(e) => e.stopPropagation()}
      >
        <RangePicker
          changeOnBlur
          ref={searchInput}
          placeholder={['Start date', 'End date']}
          value={
            !isEmpty(selectedKeys[0]?.date)
              ? [
                moment(selectedKeys[0]?.date?.[0]),
                moment(selectedKeys[0]?.date?.[1]),
              ]
              : []
          }
          picker="date"
          onChange={(value) => {
            setSelectedKeys(
              value
                ? [
                  {
                    date: value,
                  },
                ]
                : []
            );
            setTimeout(() => {
              confirm();
            }, 0);
          }}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 12 }}
        />

        <div className="d-flex justify-content-between" style={{ gap: 6 }}>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="primary d-flex align-items-center justify-content-center"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Filter
          </Button>
        </div>
      </div>
    ),
    filterIcon: (filtered) => (
      <FieldTimeOutlined
        className="fs-16"
        style={{ color: filtered && '#1677ff', fontWeight: 800 }}
      />
    ),
    onFilter: (value, record) =>
      moment(getNestedValue(record, dataIndex)).valueOf() >=
      value?.date?.[0].valueOf() &&
      moment(getNestedValue(record, dataIndex)).valueOf() <=
      value?.date?.[1].valueOf(),
    render: (_, record) => (
      <span style={{ whiteSpace: 'nowrap' }}>
        {getNestedValue(record, dataIndex) &&
          moment(getNestedValue(record, dataIndex)).isValid() &&
          moment(getNestedValue(record, dataIndex)).format('DD/MM/YYYY')}
      </span>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, dataIndex),
  });

  return getColumDateRangeSortProps;
};

export default useColumDateRangeSort;
