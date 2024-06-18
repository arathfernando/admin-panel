import { Button, Tabs } from 'antd';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddUser from './AddUser';
import InstructorTable from './InstructorTable';
import StudentTable from './StudentTable';

const StudentAndInvestorList = () => {
  const [openAdduser, setOpenAdduser] = useState(false);

  const { masterclassTitle } = useParams();

  return (
    <>
      <div
        style={{ padding: '50px 3%', background: 'white' }}
        className="custom_styles"
      >
        <Link to="/app/masterclass/masterclass">
          <div
            className="d-flex align-items-center mt-n2"
            style={{ marginBottom: 30 }}
          >
            <img src="/assets/img/icons/back.svg" alt="" className="mr-3" />
            <h6 className="fs-13 fw-6 mb-0">Back to Masterclasses</h6>
          </div>
        </Link>
        <div className="d-flex justify-content-between flex-wrap">
          <h2 className="fs-36 fw-8 mb-4">{masterclassTitle}</h2>
          <Button
            size="large"
            style={{ height: 38 }}
            type="primary mb-3 px-5"
            onClick={() => setOpenAdduser(true)}
          >
            + <span className="pl-1">Add user</span>
          </Button>
        </div>

        <Tabs
          className="tab-bordered-style"
          items={[
            {
              label: `Students`,
              key: 'Students',
              children: <StudentTable />,
            },
            {
              label: `Instructors`,
              key: 'Instructors',
              children: <InstructorTable />,
            },
          ]}
        />
      </div>

      <AddUser open={openAdduser} onClose={() => setOpenAdduser(false)} />
    </>
  );
};

export default StudentAndInvestorList;
