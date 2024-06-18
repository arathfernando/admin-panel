/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import permissions from '../constants/permissions';

const findPermissionKey = (permissions, path, specificPermission) => {
  const adminPermissions =
    JSON.parse(localStorage.getItem('currentAdmin') || {})?.admin_permissions ||
    {};

  for (let index = 0; index < permissions.length; index++) {
    if (permissions[index]?.route === path) {
      const hasCreatePermission = permissions?.find(
        ({ action }) => action === 'create'
      );
      const hasEditPermission = permissions?.find(
        ({ action }) => action === 'update'
      );
      const hasDeletePermission = permissions?.find(
        ({ action }) => action === 'delete'
      );
      const hasChangeOrderPermission = permissions?.find(
        ({ action }) => action === 'order'
      );
      const hasSpecificPermission = permissions?.find(
        ({ action }) => action === specificPermission
      );
      return {
        hasCreatePermission: !!adminPermissions[hasCreatePermission?.fieldName],
        hasEditPermission: !!adminPermissions[hasEditPermission?.fieldName],
        hasDeletePermission: !!adminPermissions[hasDeletePermission?.fieldName],
        hasChangeOrderPermission:
          !!adminPermissions[hasChangeOrderPermission?.fieldName],
        hasSpecificPermission:
          !!adminPermissions[hasSpecificPermission?.fieldName],
      };
    }

    if (permissions[index]?.children) {
      const permissionKey = findPermissionKey(
        permissions[index]?.children,
        path,
        specificPermission
      );
      if (permissionKey) {
        return permissionKey;
      }
    }
  }
};

const usePermission = ({ specificPermission = '', path: pathProp } = {}) => {
  const { path } = useRouteMatch();
  const [hasPermissions, setHasPermissions] = useState({
    hasCreatePermission: false,
    hasEditPermission: false,
    hasDeletePermission: false,
    hasChangeOrderPermission: false,
    hasSpecificPermission: false,
  });

  useEffect(() => {
    setHasPermissions(
      (hasPermissionsState) =>
        findPermissionKey(permissions, pathProp || path, specificPermission) ||
        hasPermissionsState
    );
  }, [pathProp || path, specificPermission]);

  return hasPermissions;
};

export default usePermission;
