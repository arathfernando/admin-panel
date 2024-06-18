/* eslint-disable consistent-return */
import moment from 'moment';

const momentDate = (date) => {
  const validDate = moment(date).isValid();

  if (!validDate) return;
  return date;
};

export default momentDate;
