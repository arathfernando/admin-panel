/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
import { Avatar, Button, Divider } from 'antd';
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../../../components/util-components/Loading';
import {
  getProductMembers,
  removeProcuctMember,
} from '../../../../redux/actions';

const Teammates = () => {
  const { status: removeProcuctMemberActionStatus, data } = useSelector(
    ({ product }) => product?.removeProcuctMemberAction || {}
  );
  const { data: productMembers, loading } = useSelector(
    ({ product }) => product.productMembers
  );

  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    productId && dispatch(getProductMembers(productId));
  }, [dispatch, productId]);

  const handleRemoveMembers = (id) => {
    dispatch(removeProcuctMember({ id, productId }));
  };

  return (
    <div className="py-4">
      <h6 className="h6-lg text-black mb-4">Teammates</h6>
      <div className="position-relative" style={{ minHeight: 200 }}>
        <Loading loading={loading} />
        {productMembers.map?.((user) => (
          <div key={user.user_id?.id}>
            <div className="d-flex justify-content-between align-items-center">
              <Avatar
                size={49}
                src={user?.user_id?.general_profile?.avatar}
                style={{ border: '3px solid #8BC53F' }}
              />
              <p className="btn-txt-light flex-grow-1 text-elps ml-3 ml-lg-4 mb-0 text-black">
                {user?.user_id?.general_profile?.first_name}{' '}
                {user?.user_id?.general_profile?.last_name}
              </p>
              <Button
                type="text"
                icon={
                  <img
                    src="/assets/img/icons/delete-outline.svg"
                    alt=""
                    style={{ height: 23 }}
                    className="cursor-pointer"
                  />
                }
                loading={
                  removeProcuctMemberActionStatus === 'submitting' &&
                  data.id === user.id
                }
                onClick={() => handleRemoveMembers(user.id)}
              />
            </div>

            <Divider
              className="my-2"
              style={{ borderTop: '1px solid #C4C4C4' }}
            />
          </div>
        ))}
      </div>
      {/* <h6 className="h6-lg text-black mb-4">Experts</h6> */}
      <div className="position-relative" style={{ minHeight: 300 }}>
        {/* <Loading loading={loading} /> */}
      </div>
    </div>
  );
};

export default Teammates;
