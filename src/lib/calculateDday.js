export default function calculateDday(dDayObj) {
  let dDay;
  if (dDayObj instanceof Date) {
    dDay = new Date(dDayObj);
  } else {
    dDay = new Date(dDayObj.start);
  }

  const now = new Date();

  const distance = dDay - now;

  const dd = Math.floor(distance / (1000 * 60 * 60 * 24)) + 1;

  if (dd === 0) {
    return 'D-DAY';
  }
  if (dd <= 0) {
    return `D+${dd * -1}`;
  }
  return `D-${dd}`;
}
