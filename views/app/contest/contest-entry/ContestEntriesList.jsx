import React from 'react';
import ContestEntryTable from './ContestEntryTable';

const ContestEntryList = () => {
  return (
    <div className="contest-list">
      <div className="d-flex justify-content-between flex-wrap">
        <h2 className="hb-text-primary fs-36 fw-8 mb-3">Contest entries</h2>
      </div>

      <ContestEntryTable />
    </div>
  );
};

export default ContestEntryList;
