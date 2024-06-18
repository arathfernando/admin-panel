/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';
import permissions from '../../constants/permissions';
import NoPermissions from '../NoPermissions';

const findPermissionKey = (permissions, path) => {
  for (let index = 0; index < permissions.length; index++) {
    if (permissions[index]?.route === path) {
      return permissions[index]?.fieldName;
    }
    if (permissions[index]?.children) {
      const permissionKey = findPermissionKey(
        permissions[index]?.children,
        path
      );
      if (permissionKey) {
        return permissionKey;
      }
    }
  }
};

const Permission = ({ children, path: pathProp }) => {
  const { admin_permissions } = useSelector(
    ({ admins }) => admins.currentAdmin.data
  );

  const { pathname } = useLocation();
  const { path } = useRouteMatch();

  const permissionKey = useMemo(
    () => findPermissionKey(permissions, pathProp || path),
    [path, pathProp]
  );
  const hasPermission = useMemo(
    () => pathname && !!admin_permissions?.[permissionKey],
    [admin_permissions, permissionKey, pathname]
  );

  if (!hasPermission) {
    return <NoPermissions />;
  }
  return <>{children}</>;
};

export default Permission;
