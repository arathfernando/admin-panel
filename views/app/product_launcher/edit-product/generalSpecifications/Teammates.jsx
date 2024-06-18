/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
import { UserAddOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../../../../components/util-components/Loading';
import useTranslation from '../../../../../helpers/useTranslation';
import { getProductMembers } from '../../../../../redux/actions';
import AddTemplate from './AddTemplate';

const Teammates = () => {
  const { data: productMembers, loading } = useSelector(
    ({ product }) => product.productMembers
  );

  const [openAddTemplate, setOpenAddTemplate] = useState(false);

  const dispatch = useDispatch();
  const { productId } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    productId && dispatch(getProductMembers(productId));
  }, [dispatch, productId]);

  return (
    <div className="px-4 py-2" style={{ minHeight: 'calc(100vh - 300px)' }}>
      <div className="px-0 px-md-2 mx-lg-3 px-xl-4 mb-4 pb-3">
        <div className="d-flex flex-wrap position-relative" style={{ gap: 20 }}>
          <Loading loading={loading} />
          {productMembers?.map?.((member) => (
            <div
              key={member.id}
              style={{
                boxShadow: '1px 1px 10px rgba(205, 205, 205, 0.51)',
                padding: 6,
                gap: 5,
                height: 166,
                width: 140,
              }}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <Avatar
                src={member?.user_id?.general_profile?.avatar}
                size={43}
                style={{ border: '3px solid #8BC53F' }}
              />
              <h5 className="h6-sm mb-0 text-center">
                {' '}
                {member?.user_id?.general_profile?.first_name}{' '}
                {member?.user_id?.general_profile?.last_name}
              </h5>
              <p className="c-sm mb-0 text-center text-grey-light">
                {t('Added on')}:{' '}
                {moment(member?.created_at).format('DD/MM/YYYY')}
              </p>
            </div>
          ))}
          <div
            className="cursor-pointer d-flex justify-content-center align-items-center flex-column px-2 py-3"
            style={{
              width: 140,
              height: 166,
              boxShadow: '1px 1px 10px rgba(205, 205, 205, 0.51)',
            }}
            onClick={() => setOpenAddTemplate(true)}
          >
            <UserAddOutlined
              className="hb-text-primary"
              style={{ fontSize: 44 }}
            />
            <h6 className="h6-sm mt-3">{t('Add teammate')}</h6>
          </div>
        </div>
      </div>

      <AddTemplate
        open={openAddTemplate}
        onAdd={() => setOpenAddTemplate(false)}
      />
    </div>
  );
};

export default Teammates;
