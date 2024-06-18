/* eslint-disable no-nested-ternary */
import { isEmpty, isFunction } from 'lodash';
import { useState } from 'react';
import { getNestedValue } from '../helpers/Utils';
import utils from '../helpers/utils/index';

const useColumnSearchFilterSort = () => {
  const [searchFilters, setsearchFilters] = useState({});

  const getColumnSearchFilterSortProps = (
    dataIndex,
    config = { type: '', filters: [], exactMatch: false }
  ) => ({
    key: `${dataIndex}`,
    onFilter: (value, record) => {
      const recordValue = isFunction(dataIndex)
        ? dataIndex(record)
        : getNestedValue(record, dataIndex);
      return config?.exactMatch
        ? `${recordValue}` === value
        : typeof recordValue === 'number'
        ? recordValue === Number(value)
        : recordValue?.toString?.().toLowerCase().includes(value.toLowerCase());
    },
    filterSearch: !isEmpty(config.filters)
      ? true
      : (input) => {
          setTimeout(
            () =>
              setsearchFilters({
                [dataIndex]: [{ text: input, value: input }],
              }),
            0
          );
          return true;
        },
    filters: !isEmpty(config.filters)
      ? config?.filters?.map(({ text, value }) => ({
          text,
          value: value || text,
        })) || []
      : searchFilters[dataIndex] || [{}],
    render: (_, record) =>
      isFunction(dataIndex)
        ? dataIndex(record)
        : getNestedValue(record, dataIndex),
    sorter: (a, b) => utils.antdTableSorter(a, b, dataIndex),
  });

  return getColumnSearchFilterSortProps;
};

export default useColumnSearchFilterSort;
