const checkMatchedCouple = (ctx, next) => {
  // coupleShareCode가 있으면( 연결된 커플이면 )
  if (ctx.state.member.coupleShareCode) {
    // 401 뿌리고 아무데도 못감
    ctx.status = 401;
    return;
  }
  // 그게 아니라면(솔로)
  return next(); // 다음 미들웨어 실행
};
// const checkMatchedCouple = (ctx, next) => {
//   // coupleShareCode가 없으면( 아직 솔로면 )
//   if (!ctx.state.member.coupleShareCode) {
//     // 401 뿌리고 아무데도 못감
//     ctx.status = 401;
//     return;
//   }
//   // 그게 아니라면(연결된 커플임)
//   return next(); // 다음 미들웨어 실행
// };

export default checkMatchedCouple;
