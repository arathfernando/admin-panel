import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import InvestorTransaction from './InvestorTransaction';
import InvestorSharePricesList from './sharePrice/SharePriceList';
import WorldwideShares from './WorldwideShares';

const InvestorTransactionAndShare = ({ match }) => {
  const [activeTab, setactiveTab] = useState('Worldwide shares');

  const history = useHistory();

  useEffect(() => {
    if (match.path?.match?.('investor-transaction')) {
      setactiveTab('investor-transaction');
    } else if (match.path?.match?.('share-price')) {
      setactiveTab('share-price');
    } else {
      setactiveTab('worldwide-shares');
    }
  }, [match]);

  return (
    <div className="contest-container">
      <Tabs
        activeKey={activeTab}
        onChange={(activeKey) => history.push(`/app/investor/${activeKey}`)}
        type="card"
        className="contest-list-tab"
        items={[
          {
            label: 'Worldwide shares',
            key: 'worldwide-shares',
            children: <WorldwideShares />,
          },
          {
            label: 'Investor transaction',
            key: 'investor-transaction',
            children: <InvestorTransaction />,
          },
          {
            label: 'Share price',
            key: 'share-price',
            children: <InvestorSharePricesList />,
          },
        ]}
      />
    </div>
  );
};

export default InvestorTransactionAndShare;
