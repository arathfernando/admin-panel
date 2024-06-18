import { notification } from 'antd';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { adminRoot } from '../../constants/defaultValues';
import { setCurrentUser, setSession } from '../../helpers/Utils';
import { getCurrentAdmin } from '../../redux/actions';

const PhoneVarification = ({ auth, authUser }) => {
  const history = useHistory();
  const { state } = useLocation();

  const varifyPhone = new URLSearchParams(window.location.search).get(
    'varify-phone'
  );

  const dispatch = useDispatch();

  const handleDisablePhoneNumberInput = () => {
    const inputEl = document.getElementById('ui-sign-in-phone-number-input');
    const countrySelectEl = document.getElementsByClassName(
      'firebaseui-id-country-selector'
    );

    if (inputEl) {
      inputEl.setAttribute('disabled', true);
    }
    if (countrySelectEl[0]) {
      countrySelectEl[0].setAttribute('disabled', true);
    }
  };

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(auth());
    ui.start('.phone-auth-container', {
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          loginHint: `+${varifyPhone}`.replace(' ', ''),
          disableSignUp: true,
        },
      ],
      callbacks: {
        signInSuccessWithAuthResult: ({ user }) => {
          // check if user change the number
          if (
            !user?.multiFactor?.user?.phoneNumber?.includes(
              authUser?.user?.mobile_number
            )
          ) {
            notification.warn({
              message: "Phone number isn't correct",
              description: `you need to verify with ${authUser?.user?.mobile_number}`,
            });
            history.replace('/user/login');
            return false;
          }
          setSession(authUser.accessToken, authUser.refreshToken);
          setCurrentUser(authUser.user);
          dispatch(getCurrentAdmin());
          history.push(state?.redirectUrl || adminRoot, { redirectUrl: null });
          return false;
        },
        uiShown: () => {
          // disable the county code select & phone number input
          handleDisablePhoneNumberInput();
        },
      },
    });
  }, []);

  return <div className="phone-auth-container" />;
};

export default PhoneVarification;
