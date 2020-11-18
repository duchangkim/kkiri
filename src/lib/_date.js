export const dateFormat = (sendDate) => {
  // console.log(sendDate);
  const hh = new Date(sendDate).getHours();
  const mm =
    new Date(sendDate).getMinutes() < 10
      ? `0${new Date(sendDate).getMinutes()}`
      : new Date(sendDate).getMinutes();
  return `${hh}시 : ${mm}분`;
};

export const getToday = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm =
    now.getMonth() < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  const dd = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();

  return `${yyyy}년 ${mm}월 ${dd}일`;
};
