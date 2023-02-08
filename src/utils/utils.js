import dayjs from 'dayjs';
import { DateFormat } from './const';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const ONE_HOUR = 60;

function setHumanizeDateFilmYear (dateValue) {
  return dateValue ? dayjs(dateValue).format(DateFormat.FILM_YEAR) : '';
}
function setHumanizeDateFilmRelease (dateValue) {
  return dateValue ? dayjs(dateValue).format(DateFormat.FILM_RELEASE) : '';
}
function setHumanizeDateAgoComment (dateValue) {
  return dateValue ? dayjs(dateValue).fromNow() : '';
}

function getDuration(time) {
  const hours = Math.trunc(time / ONE_HOUR);
  const minutes = time % ONE_HOUR;
  return `${hours ? `${hours}h` : ''} ${minutes ? `${minutes}m` : ''}`;
}

export { setHumanizeDateFilmYear, setHumanizeDateFilmRelease, setHumanizeDateAgoComment, getDuration };
