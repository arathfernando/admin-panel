/* eslint-disable react/jsx-key */
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../../../components/util-components/Loading';
import useTranslation from '../../../../helpers/useTranslation';
import { getProjectWorkspaces } from '../../../../redux/actions';

const Workspaces = () => {
  const { data: projectWorkspaces, loading } = useSelector(
    ({ product }) => product.projectWorkspaces
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getProjectWorkspaces(productId));
  }, [dispatch, productId]);

  return (
    <div
      className="d-flex flex-wrap mx-auto position-relative py-4"
      style={{ gap: 21 }}
    >
      <Loading loading={loading} />
      {projectWorkspaces?.map?.((workspace) => (
        <div
          className="d-flex justify-content-center align-items-center flex-column py-4"
          style={{
            width: 166,
            height: 166,
            boxShadow: '1px 1px 10px rgba(205, 205, 205, 0.51)',
            background: 'white',
          }}
        >
          <img
            src={workspace?.workspace_type?.icon}
            style={{ height: 35, width: 34 }}
            alt=""
          />
          <h6 className="h6-sm" style={{ margin: '5px 0px' }}>
            {workspace?.workspace_type?.title}
          </h6>
          <p className="c-sm text-grey-light mb-0 text-center">
            {t('Created on')}:{' '}
            {moment(workspace?.created_at).isValid() &&
              moment(workspace?.created_at).format('DD/MM/YYYY')}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Workspaces;
