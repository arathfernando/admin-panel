import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { Divider } from 'antd';
import {
  changeLocale,
  clickOnMobileMenu,
  logoutUser,
  setContainerClassnames,
} from '../../redux/actions';

import { adminRoot } from '../../constants/defaultValues';

import { MenuIcon, MobileMenuIcon } from '../../components/svg';
// import TopnavEasyAccess from './Topnav.EasyAccess';
// import TopnavNotifications from './Topnav.Notifications';
// import TopnavDarkSwitch from './Topnav.DarkSwitch';

// import { getDirection, setDirection } from '../../helpers/Utils';
import NotificationDropdown from './NotificationDropdown';
import ProfileMenu from './ProfileMenu';

const TopNav = ({
  // intl,
  // history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  // locale,
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  // changeLocaleAction,
  // logoutUser,
  currentUser,
  ...props
}) => {
  /// /////////////////////////////////////
  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenuAction(_containerClassnames);
  };

  // const { messages } = intl;
  return (
    <nav className="navbar fixed-top" style={{ zIndex: 999 }}>
      <div className="d-flex align-items-center navbar-left">
        <NavLink
          to="#"
          location={{}}
          className="menu-button d-none d-md-block"
          onClick={(e) =>
            menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <MenuIcon />
        </NavLink>
        <NavLink
          to="#"
          location={{}}
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
        >
          <MobileMenuIcon />
        </NavLink>
      </div>
      <NavLink className="navbar-logo" to={adminRoot}>
        <span className="logo d-none d-xs-block" />
        <span className="logo-mobile d-block d-xs-none" />
      </NavLink>

      <div className="navbar-right">
        <div
          className="user d-flex justify-content-end align-items-center"
          style={{ marginRight: 60 }}
        >
          <ProfileMenu />
          <Divider
            type="vertical"
            style={{
              padding: '15px 0px',
              margin: '0px 20px',
              borderLeft: '1px solid #8bc53f',
            }}
          />
          <NotificationDropdown />
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ menu, settings, authUser }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  const { currentUser } = authUser;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
    currentUser,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    changeLocaleAction: changeLocale,
    logoutUser,
  })(TopNav)
);
