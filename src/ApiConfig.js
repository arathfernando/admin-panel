/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-return-await */
/* eslint-disable no-throw-literal */
import { notification } from 'antd';
import axios from 'axios';
import { isEmpty, isNumber } from 'lodash';
import { APIRespnseErrorStatusCodes } from './constants/apiresponse_statius_codes';
import reactRouterHistory from './constants/history';

export const openNotificationWithIcon = (type, title, message, top = 0) => {
  notification[type]({
    message: title,
    description: message,
    style: { zIndex: 1031, top: isNumber(top) ? top : 0 },
  });
};

const token = localStorage.getItem('accessToken');

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60000,
});

api.defaults.headers.common.Authorization = `Bearer ${token || ''}`;

window.addEventListener(
  'onTokenUpdate',
  ({ detail }) => {
    api.defaults.headers.common.Authorization = `Bearer ${
      detail?.accessToken || token || ''
    }`;
  },
  false
);

api.interceptors.response.use(
  (response) => {
    if (
      !APIRespnseErrorStatusCodes.hasOwnProperty(
        response.data?.status || response.status
      )
    ) {
      return handleResponse(response, {});
    }
    throw { ...response, isWarnig: true };
  },
  (error) =>
    error.isWarnig ? handleWarning(error, {}) : handleError(error, {})
);

let allTranslationKeys = {};
let autoGenerateTranslationKeys = {};

const setAllTranslationKeys = () => {
  axios(
    `https://cdn.simplelocalize.io/${process.env.REACT_APP_TRANSLATION_PUBLIC_KEY}/_latest/en`
  ).then((keys) => {
    allTranslationKeys = keys.data;
  });
};
const setAutoGenerateTranslationKeys = () => {
  axios(
    `https://cdn.simplelocalize.io/${process.env.REACT_APP_TRANSLATION_PUBLIC_KEY}/_latest/en/auto-generated-from-admin`
  ).then((keys) => {
    autoGenerateTranslationKeys = keys.data;
  });
};

setAllTranslationKeys();
setAutoGenerateTranslationKeys();

const handleGenerateTranslationKyes = (translate) => {
  const newKeys = translate?.data?.filter?.(
    ({ key }) => !allTranslationKeys.hasOwnProperty(key)
  );
  try {
    axios
      .post(
        'https://api.simplelocalize.io/api/v1/translations',
        {
          content: newKeys.map(({ key, text }) => ({
            key: key?.replace?.(':', ''),
            language: 'en',
            text: text || key,
            namespace: 'auto-generated-from-admin',
          })),
        },
        {
          headers: {
            'X-SimpleLocalize-Token':
              process.env.REACT_APP_TRANSLATION_PROJECT_TOKEN,
          },
        }
      )
      .then(
        (res) =>
          res.data.status === 200 &&
          newKeys.map(({ key }) =>
            openNotificationWithIcon(
              'success',
              `"${key}" key added successfully`
            )
          )
      );
  } catch (error) {
    return null;
  }
};

const handleRemoveTranslationKyes = (translate) => {
  const removKeys = translate.removeKeys?.filter?.(({ key }) =>
    autoGenerateTranslationKeys.hasOwnProperty(key)
  );
  try {
    axios
      .delete(
        'https://api.simplelocalize.io/api/v1/translations',
        {
          content: removKeys.map(({ key }) =>
            autoGenerateTranslationKeys.hasOwnProperty(key)
          ),
        },
        {
          headers: {
            'X-SimpleLocalize-Token':
              process.env.REACT_APP_TRANSLATION_PROJECT_TOKEN,
          },
        }
      )
      .then(
        (res) =>
          res.data.status === 200 &&
          translate.removeKeys.map(({ key }) =>
            openNotificationWithIcon(
              'success',
              `"${key}" key removed successfully`
            )
          )
      );
  } catch (error) {
    return null;
  }
};

const handleTranslation = (translate) => {
  if (!isEmpty(translate.data)) {
    handleGenerateTranslationKyes(translate);
  }
  if (!isEmpty(translate.removeKeys)) {
    handleRemoveTranslationKyes(translate);
  }
};

const handleResponse = (
  res,
  { notify, notifySuccess, successMsg, translate, notificationTop }
) => {
  if (translate) {
    handleTranslation(translate);
  }
  if (notify || notifySuccess || successMsg) {
    switch (res?.config?.method) {
      case 'post':
        openNotificationWithIcon(
          'success',
          successMsg || res.data?.message || 'Saved successfully!',
          '',
          notificationTop
        );
        break;
      case 'put':
        openNotificationWithIcon(
          'success',
          successMsg || res.data?.message || 'Updated successfully!',
          '',
          notificationTop
        );
        break;
      case 'delete':
        openNotificationWithIcon(
          'success',
          successMsg || res.data?.message || 'Removed successfully!',
          '',
          notificationTop
        );
        break;
      default:
        break;
    }
  }
  return res;
};

const handleError = (
  err,
  { notify, notifyError, errorMsg, notificationTop }
) => {
  if (
    err.response?.status === 403 &&
    window.location.pathname !== '/user/login'
  ) {
    reactRouterHistory.push('/user/login', {
      redirectUrl: window.location.pathname,
    });
    setTimeout(() => {
      window.location.href = '/user/login';
    }, 0);
    openNotificationWithIcon('warn', 'Please login again', '', notificationTop);
  }
  if (notify || notifyError || errorMsg) {
    openNotificationWithIcon(
      'error',
      APIRespnseErrorStatusCodes[err?.data?.status || err.data]?.message ||
        'Something went wrong!',
      errorMsg ||
        err.response?.data?.message ||
        err.message ||
        'Response is not success!',
      '',
      notificationTop
    );
  }
  throw { ...(err?.response?.data || err) };
};

const handleWarning = (
  warn,
  {
    notify,
    notifySuccess,
    successMsg,
    errorMsg,
    notifyError,
    notifyWarn,
    notificationTop,
  }
) => {
  if (
    notifyWarn !== false &&
    (notify || notifySuccess || successMsg || notifyError || errorMsg)
  ) {
    openNotificationWithIcon(
      'warning',
      APIRespnseErrorStatusCodes[warn?.data?.status || warn.data]?.message,
      warn.data?.message || 'Response is not success!',
      '',
      notificationTop
    );
  }

  throw { ...(warn.data?.message || warn) };
};

export async function get(url, config = {}, options = {}) {
  return await api
    .get(url, { ...config })
    .then((response) => {
      if (
        !APIRespnseErrorStatusCodes.hasOwnProperty(
          response.data?.status || response.status
        )
      ) {
        return handleResponse(response, options);
      }
      throw { ...response, isWarnig: true };
    })
    .catch((err) =>
      err.isWarnig ? handleWarning(err, options) : handleError(err, options)
    );
}

export async function post(url, data, config = {}, options = { notify: true }) {
  return api
    .post(url, data, { ...config })
    .then((response) => {
      if (
        !APIRespnseErrorStatusCodes.hasOwnProperty(
          response.data?.status || response.status
        )
      ) {
        return handleResponse(response, options);
      }
      throw { ...response, isWarnig: true };
    })
    .catch((err) =>
      err.isWarnig ? handleWarning(err, options) : handleError(err, options)
    );
}

export async function axiosPut(
  url,
  data,
  config = {},
  options = { notify: true }
) {
  return api
    .put(url, data, { ...config })
    .then((response) => {
      if (
        !APIRespnseErrorStatusCodes.hasOwnProperty(
          response.data?.status || response.status
        )
      ) {
        return handleResponse(response, options);
      }
      throw { ...response, isWarnig: true };
    })
    .catch((err) =>
      err.isWarnig ? handleWarning(err, options) : handleError(err, options)
    );
}

export async function del(url, config = {}, options = { notify: true }) {
  return await api
    .delete(url, { ...config })
    .then((response) => {
      if (
        !APIRespnseErrorStatusCodes.hasOwnProperty(
          response.data?.status || response.status
        )
      ) {
        return handleResponse(response, options);
      }
      throw { ...response, isWarnig: true };
    })
    .catch((err) =>
      err.isWarnig ? handleWarning(err, options) : handleError(err, options)
    );
}

export default api;
