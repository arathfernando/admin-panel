import { Divider, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import { getTranslationLanguages } from '../../../../redux/actions';
import Permission from '../../Permission';
import TranslationKeysList from './translationKey/TranslationKeyList';
import TranslationLanguageList from './translationLanguage/TranslationLanguageList';

const TranslationKeyAndLanguages = () => {
  const [activeKey, setActiveKey] = useState('translation-key');
  const history = useHistory();
  const { tab, projectId, projectName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (tab === 'translation-key') {
      setActiveKey(tab);
    } else if (tab === 'translation-language') {
      setActiveKey(tab);
    }
  }, [tab]);

  useEffect(() => {
    dispatch(getTranslationLanguages({ projectId }));
  }, []);

  return (
    <>
      <div className="d-flex w-100 justify-content-center mt-n4">
        <div>
          <h3 className="h3-lg hb-text-primary mb-0 text-center">
            {projectName}
          </h3>
          <Divider className="my-0" style={{ borderColor: '#8bc53f' }} />
        </div>
      </div>
      <Tabs
        type="card"
        activeKey={activeKey}
        onChange={(key) => {
          history.replace(
            `/app/managements/translation/${key}/${projectId}/${projectName}`
          );
        }}
        className="tab-style-1"
        items={[
          {
            label: 'Translation Key',
            key: 'translation-key',
            children: (
              <div
                style={{ minHeight: '70vh' }}
                className="d-flex align-items-stretch justify-content-center"
              >
                <Permission path="/app/managements/translation/translation-key">
                  <TranslationKeysList />
                </Permission>
              </div>
            ),
          },
          {
            label: 'Translation Language',
            key: 'translation-language',
            children: (
              <div
                style={{ minHeight: '70vh' }}
                className="d-flex align-items-stretch justify-content-center"
              >
                <Permission path="/app/managements/translation/translation-language">
                  <TranslationLanguageList />
                </Permission>
              </div>
            ),
          },
        ]}
      />
    </>
  );
};

export default TranslationKeyAndLanguages;
