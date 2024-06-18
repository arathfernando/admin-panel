import { isArray } from 'lodash';

function buildFormData(
  formData,
  data,
  parentKey,
  { dontAppendKeyForEmptyValue }
) {
  if (isArray(data)) {
    if (data[0] instanceof File) {
      data.forEach((file) => formData.append(parentKey, file));
    } else {
      formData.append(parentKey, JSON.stringify(data));
    }
  } else if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key,
        { dontAppendKeyForEmptyValue }
      );
    });
  } else {
    const value = data == null ? '' : data;

    if (dontAppendKeyForEmptyValue) {
      value && formData.append(parentKey, value);
    } else {
      formData.append(parentKey, value);
    }
  }
}

function objectToFormData(data, { dontAppendKeyForEmptyValue = false } = {}) {
  const formData = new FormData();

  buildFormData(formData, data, null, { dontAppendKeyForEmptyValue });

  return formData;
}

export default objectToFormData;
