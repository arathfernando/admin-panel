import React from 'react';
import { Row } from 'reactstrap';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import TranslationLanguageList from './list';

const TranslationLanguage = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="translation-language.title" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Colxx xxs="12" className="mb-4">
        <div>
          <div className="translation-language-list" style={{ marginTop: 10 }}>
            <TranslationLanguageList />
          </div>
        </div>
      </Colxx>
    </>
  );
};

export default TranslationLanguage;
