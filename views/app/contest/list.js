import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ContestEntryList from './contest-entry/ContestEntriesList';
import ContestList from './contest-list/ContestList';
import ContesMembertList from './contest-member/ContesMembertList';
import ContestTempleteList from './contest-template/ContestEntriesList';

const ContestListAll = () => {
  const [activeKey, setActiveKey] = useState('contestList');

  const { contestList, contestMember, contestTemplate, contestEntry } =
    useParams();

  const history = useHistory();

  console.log('contestList, contestMember, contestTemplate, contestEntry', {
    contestList,
    contestMember,
    contestTemplate,
    contestEntry,
  });

  useEffect(() => {
    if (contestList) {
      setActiveKey(contestList);
    } else if (contestMember) {
      setActiveKey(contestMember);
    } else if (contestTemplate) {
      setActiveKey(contestTemplate);
    } else if (contestEntry) {
      setActiveKey(contestEntry);
    }
  }, [contestList, contestMember, contestTemplate, contestEntry]);

  return (
    <div className="contest-container custom_styles">
      <Tabs
        type="card"
        activeKey={activeKey}
        onChange={(key) => {
          history.replace(`/app/contests/${key}`);
        }}
        className="contest-list-tab"
        items={[
          {
            label: 'Contest list',
            key: 'contestList',
            children: <ContestList />,
          },
          {
            label: 'Contest members',
            key: 'contestMember',
            children: <ContesMembertList />,
          },
          {
            label: 'Contest Templates',
            key: 'contestTemplate',
            children: <ContestTempleteList />,
          },
          {
            label: 'Contest entries',
            key: 'contestEntry',
            children: <ContestEntryList />,
          },
        ]}
      />
    </div>
  );
};

export default ContestListAll;
