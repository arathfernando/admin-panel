/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import { Avatar, Popover } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

const UserContent = ({ user = {} }) => {
  return (
    <div
      className="d-flex p-3 align-items-center"
      style={{ gap: 18 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="d-flex flex-column align-items-center" style={{ gap: 8 }}>
        <Avatar
          src={user.general_profile?.avatar}
          size={90}
          className="flex-shrink-0"
          style={{ border: '2px solid rgb(139, 197, 63)' }}
        />

        <span
          className="fs-16 fw-6"
          style={{
            color:
              user.status === 'ACTIVE'
                ? '#8bc53f'
                : user.status === 'CLOSED'
                ? '#900604'
                : '#ed7117',
          }}
        >
          {user.status?.slice(0, 1)}
          {user.status?.slice(1)?.toLowerCase?.()}
        </span>
      </div>

      <div>
        <Link
          to={`/app/users/${user.id}`}
          className="fs-22 fw-7 link-hover-underline"
        >
          {user.general_profile?.first_name} {user.general_profile?.last_name}
        </Link>

        <p className="mb-2 pb-1 mt-1">
          <a
            className="fs-14 fw-5 hb-text-primary link-hover-underline"
            href={`mailto:${user.email}`}
          >
            {user.email}
          </a>
        </p>

        {user.general_profile?.location && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              marginBottom: 6,
            }}
          >
            <img
              width={15}
              src="/assets/img/icons/flag.svg"
              alt="location-img"
            />
            <span>{user.general_profile?.nationality}</span>
          </div>
        )}

        {user.general_profile?.location && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 6,
              marginTop: 2,
            }}
          >
            <img
              width={15}
              src="/assets/img/icons/location.webp"
              alt="location-img"
            />
            <span>Living {user.general_profile?.location}</span>
          </div>
        )}

        {user.createdAt && moment(user.createdAt).isValid() && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <img
              width={14}
              height={18}
              src="/assets/img/icons/birthday.webp"
              alt="location-img"
            />
            <span style={{ marginLeft: 3 }}>
              Created on {moment(user.createdAt).format('MMMM Do YYYY')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const UserViwer = ({ user = {}, hideAvatar = false, children }) => {
  return (
    <Popover
      content={<UserContent user={user} />}
      mouseEnterDelay={0.2}
      mouseLeaveDelay={0.1}
    >
      {children || (
        <div
          className="d-flex align-items-center"
          style={{ gap: 12, cursor: 'grab' }}
        >
          {!hideAvatar && (
            <Avatar
              src={user.general_profile?.avatar}
              size={32}
              className="flex-shrink-0"
              style={{ margin: '-2px 0px' }}
            />
          )}

          <div>
            <span className="fw-5">
              {user.general_profile?.first_name}{' '}
              {user.general_profile?.last_name}
            </span>
          </div>
        </div>
      )}
    </Popover>
  );
};

export default UserViwer;
