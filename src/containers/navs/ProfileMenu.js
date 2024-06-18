/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

// Redux
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import useTranslation from '../../helpers/useTranslation';
import { logoutUser } from '../../redux/actions';

const ProfileMenu = () => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { profile_image, first_name } = useSelector(
    ({ admins }) => admins.currentAdmin.data
  );

  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
        style={{ border: '0 px !important' }}
      >
        <DropdownToggle
          className="btn header-item bg-soft-light pr-0"
          id="page-header-user-dropdown"
          tag="button"
        >
          <span
            className="d-none d-xl-inline-block ms-1 me-2"
            style={{ fontSize: 16 }}
          >
            {first_name}
          </span>
          <Avatar
            className="rounded-circle header-profile-user me-2"
            src={profile_image}
            style={{
              height: 36,
              width: 36,
              border: '3px solid #74788d',
            }}
            alt=""
          />
          <img
            src="/assets/img/icons/arrow-down.svg"
            style={{ width: 12, borderRadius: 0 }}
            alt=""
          />
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end px-3">
          <Link to="/app/admin/profile">
            <DropdownItem className="d-flex align-items-center px-0">
              <UserOutlined className="ml-2 fs-24" />
              <p className="fw-5 fs-14 mb-0 mx-3 hb-text-secondary">
                {t('Profile')}
              </p>
            </DropdownItem>
          </Link>

          <div className="dropdown-divider my-1" />
          <div onClick={() => dispatch(logoutUser())}>
            <DropdownItem className="d-flex align-items-center px-0">
              <LogoutOutlined
                className="fs-22 pl-2"
                style={{ color: 'rgb(255, 120, 117)' }}
              />
              <p className="fw-5 fs-14 mb-0 mx-3 hb-text-secondary">
                {t('Sign Out')}
              </p>
            </DropdownItem>
          </div>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

const mapStatetoProps = () => {
  return {};
};

export default withRouter(connect(mapStatetoProps, {})(ProfileMenu));
