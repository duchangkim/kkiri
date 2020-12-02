export default function calculateDday(dDayObj) {
  let dDay;
  // console.log(typeof dDayObj);
  if (dDayObj instanceof Date) {
    // console.log('아니여?');
    dDay = new Date(dDayObj);
  } else {
    dDay = new Date(dDayObj.start);
  }

  // console.log(dDay);
  const now = new Date();

  // console.log(now);
  // console.log(dDay);

  const distance = dDay - now;

  const dd = Math.floor(distance / (1000 * 60 * 60 * 24)) + 1;
  // console.log(`${dDayObj.title} : ${dd}`);

  if (dd === 0) {
    return "D-DAY";
  }
  if (dd <= 0) {
    return `D+${dd * -1}`;
  }
  return `D-${dd}`;
}
