/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dropdown as AntdDropdown, Avatar, Button } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import Loading from '../../components/util-components/Loading';
import { notify } from '../../helpers/notify';
import useTranslation from '../../helpers/useTranslation';
import useSocket from '../../hooks/useSocket';
import {
  getAdminNotifications,
  notificationDeleteAll,
  notificationMarkAllRead,
  removeNotification,
  updateCurrentAdmin,
  updateCurrentAdminData,
  updateNotificationSeenStatus,
  updateNotificationState,
} from '../../redux/actions';
import { getNotificationData } from './notification';

const Notification = ({ notification: notificationData, indx, setMenu }) => {
  const notifications = useSelector(
    ({ adminNotification }) => adminNotification?.notifications?.data,
    shallowEqual
  );
  const { status, data } = useSelector(
    ({ adminNotification }) => adminNotification.removeNotificationAction
  );

  const [isRemoved, setIsRemoved] = useState(notificationData.isRemoved);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsRemoved(notificationData.isRemoved);
  }, [notificationData.isRemoved]);

  const isNotLastOne = useMemo(
    () => notifications?.length !== indx + 1,
    [notifications, indx]
  );

  const handleRedirect = () => {
    // update seen_unseen: seen
    notificationData.seen_unseen = 'SEEN';
    dispatch(
      updateNotificationSeenStatus({
        id: notificationData?.id,
        seen_unseen: 'SEEN',
      })
    );

    if (notificationData.redirectUrl) {
      setMenu(false);
      history.push(notificationData.redirectUrl);
    }
  };

  const handleReemoveNotification = (id) => {
    dispatch(
      removeNotification({
        id,
        onSuccess: () => {
          setIsRemoved(true);
          notificationData.isRemoved = true;
        },
        onError: () => {
          setIsRemoved(false);
        },
      })
    );
  };

  return (
    <>
      <div
        key={notificationData.id}
        className="section cursor-pointer position-relative cursor-pointer overflow-hidden"
        style={{
          background: notificationData.seen_unseen === 'UNSEEN' && '#F5F5F5',
          height: isRemoved && 0,
          padding: isRemoved && 0,
          transition: '50ms ease-out',
        }}
        onClick={handleRedirect}
      >
        <Avatar
          size={53}
          className="flex-shrink-0"
          src={
            notificationData.notificationImage ||
            '/assets/img/icons/hubbers-dark-logo-sm.svg'
          }
        />
        <div>
          <h6 className="mb-1">{notificationData.content}</h6>
          <span className="fs11 fw-3">
            {notificationData?.created_at &&
            moment
              .duration(moment(new Date()).diff(notificationData.created_at))
              .asDays() >= 7
              ? moment(notificationData.created_at).format('DD/MM/YYYY')
              : moment(notificationData.created_at).fromNow()}
          </span>
        </div>
        <Button
          type="text mesage-remove-btn"
          icon={
            <img
              src="/assets/img/icons/delete-outline.svg"
              style={{ height: 18 }}
              alt="delete"
            />
          }
          onClick={(e) => {
            handleReemoveNotification(notificationData?.id);
            e.stopPropagation();
          }}
          loading={status === 'submitting' && data?.id === notificationData?.id}
          style={{
            transition: '50ms ease-out',
          }}
        />
        {isNotLastOne && <span className="devider" />}
      </div>
    </>
  );
};

const NotificationDropdown = () => {
  // Declare a new state variable, which we'll call "menu"\
  const [menu, setMenu] = useState(false);
  const {
    data: notifications,
    loading,
    page,
    lastPage,
    error,
  } = useSelector(
    ({ adminNotification }) => adminNotification.notifications,
    shallowEqual
  );

  const { has_new_notification, id } = useSelector(
    ({ admins }) => admins.currentAdmin.data
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const socket = useSocket();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAdminNotifications({ page: 1 }));
  }, []);

  // upadate has_new_notification: false once loaded & menu open
  useEffect(() => {
    if (menu && !error && !loading && has_new_notification === 'TRUE' && id) {
      // update has_new_notification redux state
      dispatch(updateCurrentAdminData({ has_new_notification: 'FALSE' }));
      // update has_new_notification in db
      dispatch(updateCurrentAdmin({ id, has_new_notification: 'FALSE' }));
    }
  }, [dispatch, loading, menu, notifications, id]);

  useEffect(() => {
    if (socket.connected) {
      const handleNewNotifications = (data = {}) => {
        console.log('handleNewNotifications', data);
        // update has_new_notification: true when gen a new notification
        dispatch(updateCurrentAdminData({ has_new_notification: 'TRUE' }));

        const notification = getNotificationData(data)[data.type] || data;

        if (notification.title) {
          notify(notification.title, {
            icon: notification?.notificationImage,
            body: notification.content,
            data: notification,
          });
          dispatch(
            updateNotificationState({
              actionType: 'new_notification',
              data: [
                {
                  ...notification,
                  seen_unseen: 'UNSEEN',
                },
              ],
            })
          );
        }
      };

      socket.on('notification', handleNewNotifications);

      return () => {
        socket.off('notification', handleNewNotifications);
      };
    }
  }, [socket.connected]);

  function handleScroll(e) {
    if (
      e.target.clientHeight + Math.ceil(e.target.scrollTop) !==
      e.target.scrollHeight
    )
      return;
    if (lastPage > page && !loading) {
      dispatch(getAdminNotifications({ page: page + 1 }));
    }
  }

  // notification redirect page
  useEffect(() => {
    try {
      navigator.serviceWorker.register('/sw.js', {
        updateViaCache: 'all',
      });
      const handleredirect = (message) => {
        // update has_new_notification: true when get a new notification
        dispatch(updateCurrentAdminData({ has_new_notification: 'FALSE' }));
        // update state seen_unseen to SEEN
        dispatch(
          updateNotificationState({
            actionType: 'update_notification',
            notificationId: message.data?.id,
            data: { ...message.data, seen_unseen: 'SEEN' },
          })
        );
        if (message.data?.redirectUrl) {
          history.push(message.data.redirectUrl);
        }
      };
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', handleredirect);

        return () =>
          navigator.serviceWorker.removeEventListener(
            'message',
            handleredirect
          );
      }
    } catch (error) {
      console.log({ error });
    }
  }, []);
  const moreOptions = [
    {
      key: 'read',
      disabled: isEmpty(notifications),
      style: { padding: '7px 12px' },
      onClick: (e) => e.stopPropagation(),
      onMouseDown: () => dispatch(notificationMarkAllRead()),
      label: (
        <div className="d-flex align-items-center" style={{ gap: 10 }}>
          <img
            src="/assets/img/icons/check.svg"
            alt=""
            height={24}
            width={24}
          />
          <span className="fs-14 fw-3">Mark all as read</span>
        </div>
      ),
    },
    {
      key: 'delete',
      disabled: isEmpty(notifications),
      style: { padding: '7px 12px' },
      onClick: (e) => e.stopPropagation(),
      onMouseDown: () => dispatch(notificationDeleteAll()),
      label: (
        <div className="d-flex align-items-center" style={{ gap: 10 }}>
          <img
            src="/assets/img/icons/delete-outline-primary.svg"
            alt=""
            height={24}
            width={24}
          />
          <span className="fs-14 fw-3">Delete all notifications</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block notifications-container"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon position-relative p-0"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <div className="position-relative">
            <img
              src={
                menu
                  ? '/assets/img/icons/notification-green-fill.svg'
                  : '/assets/img/icons/notification-green.svg'
              }
              style={{ width: 24 }}
              alt=""
            />
            {has_new_notification === 'TRUE' && (
              <span className="unseen-dot" style={{ marginRight: 1 }} />
            )}
          </div>
        </DropdownToggle>

        <DropdownMenu
          className="dropdown-menu-lg dropdown-menu-end p-0"
          style={{ width: 'fit-content', padding: 0 }}
        >
          <div className="notifications-dropdown-menu">
            <div className="header">
              <span>{t('Notifications')}</span>
              <AntdDropdown
                menu={{
                  items: moreOptions,
                  style: {
                    padding: '7px 6px',
                  },
                }}
                trigger={['click']}
                placement="bottomRight"
                overlayStyle={{
                  minWidth: 263,
                  overflow: 'hidden',
                  background: 'white !important',
                  boxShadow: '2px 8px 26px 0px rgba(0, 0, 0, 0.25)',
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-more-vertical icon-lg stroke-theme-color"
                  style={{ cursor: 'pointer' }}
                >
                  <g>
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </g>
                </svg>
              </AntdDropdown>
            </div>
            <SimpleBar
              className="section-container"
              onScrollCapture={handleScroll}
            >
              {notifications?.map?.((notification, indx) => (
                <Notification
                  key={notification?.id}
                  notification={notification}
                  indx={indx}
                  setMenu={setMenu}
                />
              ))}

              {lastPage > page || page === 1 ? (
                <div
                  className="w-100 d-flex justify-content-center align-items-center pt-2 position-relative"
                  style={{ height: 35 }}
                >
                  <Loading loading={loading} />
                </div>
              ) : null}
            </SimpleBar>
          </div>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default NotificationDropdown;
