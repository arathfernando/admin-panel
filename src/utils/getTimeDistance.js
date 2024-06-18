import { floor } from 'lodash';
import moment from 'moment';

const getTimeDistance = (start_date, end) => {
  const end_date = end || new Date();

  const duration = moment.duration(moment(end_date).diff(moment(start_date)));
  let diff = duration.asSeconds();

  if (diff < 60) return diff >= 0 && `${diff} second${diff <= 1 ? '' : 's'}`;

  diff = floor(diff / 60);
  if (diff < 60) return diff >= 0 && `${diff} minute${diff <= 1 ? '' : 's'}`;

  diff = floor(diff / 60);
  if (diff < 24) return diff >= 0 && `${diff} hour${diff <= 1 ? '' : 's'}`;

  diff = floor(diff / 24);
  if (diff < 7) return diff >= 0 && `${diff} day${diff <= 1 ? '' : 's'}`;

  const weeks = floor(diff / 7);
  if (diff < 30) return weeks >= 0 && `${weeks} week${weeks <= 1 ? '' : 's'}`;

  diff = floor(diff / 30);
  if (diff < 12) return diff >= 0 && `${diff} month${diff <= 1 ? '' : 's'}`;

  diff /= 12;
  return diff >= 0 && `${diff.toFixed(1)} year${diff <= 1 ? '' : 's'}`;
};

export default getTimeDistance;
