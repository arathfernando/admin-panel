import { Form, Tabs } from 'antd';
import React, { useState } from 'react';
import KPIDashboard from './KPIDashboard';
import NewRegisteredUsers from './NewRegisteredUsers';
import NewRegisteredUsersList from './NewRegisteredUsersList';
import PushNotificationTable from './PushNotificationTable';

const InvestorKPI = () => {
  const [activeKey, setActiveKey] = useState('Hubbers_KPI');
  const [form] = Form.useForm();
  return (
    <div className="w-100">
      <Form layout="vertical" form={form} name="control-hooks">
        <Tabs
          type="card"
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
          className="tab-style-1-rounded mb-2 w-100"
          items={[
            {
              label: 'Hubbers KPI',
              key: 'Hubbers_KPI',
              children: <KPIDashboard />,
            },
            {
              label: 'New registered users',
              key: 'new_registered_users',
              children: <NewRegisteredUsers />,
            },
            {
              label: 'Push notifications',
              key: 'push_notifications',
              children: (
                <div className="p-4">
                  <PushNotificationTable />
                </div>
              ),
            },
          ]}
        />
        {activeKey === 'new_registered_users' && <NewRegisteredUsersList />}
      </Form>
    </div>
  );
};

export default InvestorKPI;
