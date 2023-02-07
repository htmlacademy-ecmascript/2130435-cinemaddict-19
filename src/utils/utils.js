import dayjs from 'dayjs';
import { DateFormat } from './const.js';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

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
  const hours = Math.trunc(time / 60);
  const minutes = time % 60;
  return `${hours ? `${hours}h` : ''} ${minutes ? `${minutes}m` : ''}`;
}

export { setHumanizeDateFilmYear, setHumanizeDateFilmRelease, setHumanizeDateAgoComment, getDuration };
