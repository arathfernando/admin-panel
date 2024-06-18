/* eslint-disable camelcase */
import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ZoneSelect from '../../../../../components/util-components/selector/ZoneSelect';
import usePermission from '../../../../../hooks/usePermission';
import { getSharePrices } from '../../../../../redux/actions';
import AssignPrices from './AssignPrice';
import SharePriceTable from './SharePriceTable';

const InvestorSharePricesList = () => {
  const [openSharePrice, setOpenSharePrice] = useState(false);

  const { hasCreatePermission } = usePermission();

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ padding: '50px 3%', background: 'white' }}>
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="hb-text-primary fs-36 fw-8 mb-4">Share price</h2>
          <Button
            type="primary mb-3"
            onClick={() => setOpenSharePrice(true)}
            disabled={!hasCreatePermission}
          >
            + Assign price
          </Button>
        </div>

        <Form layout="vertical" form={form} name="control-hooks">
          <Form.Item
            name="area"
            label={<h6 className="h6-lg text-black fw-5 mb-0">Filter by</h6>}
            className="mb-4 pb-3"
          >
            <ZoneSelect
              style={{ maxWidth: 459 }}
              placeholder="area / subarea"
              onSelect={(searchKey) => {
                dispatch(getSharePrices({ searchKey }));
                form.setFieldValue('area', searchKey);
              }}
              options={(data) =>
                data.map?.(
                  ({ subarea_name: value, area_name, subarea_name }) => ({
                    value,
                    label: `${area_name || ' '} >> ${subarea_name || ''}`,
                    area_name,
                    subarea_name,
                  })
                ) || []
              }
              allowClear
              onClear={() => dispatch(getSharePrices())}
              onDeselect={() => dispatch(getSharePrices())}
              mode="tags"
            />
          </Form.Item>
        </Form>

        <SharePriceTable />
      </div>

      <AssignPrices
        open={openSharePrice}
        onCancel={() => setOpenSharePrice(false)}
      />
    </>
  );
};

export default InvestorSharePricesList;
