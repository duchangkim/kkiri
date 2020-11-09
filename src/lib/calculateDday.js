export default function calculateDday(dDayObj) {
  const now = new Date();
  const dDay = new Date(dDayObj.start);

  // console.log(now);
  // console.log(dDay);

  const distance = dDay - now;

  const dd = Math.floor(distance / (1000 * 60 * 60 * 24)) + 1;
  // console.log(`${dDayObj.title} : ${dd}`);

  if (dd === 0) {
    return 'D-DAY';
  }
  if (dd <= 0) {
    return `D+${dd * -1}`;
  }
  return `D-${dd}`;
}
