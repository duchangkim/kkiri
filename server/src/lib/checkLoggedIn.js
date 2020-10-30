const checkLoggedIn = (ctx, next) => {
  // member가 없으면( 로그인 하지 않았으면 )
  if (!ctx.state.member) {
    // 401 뿌리고 아무데도 못감
    ctx.status = 401;
    return;
  }
  // 그게 아니라면(로그인 되어있을 경우)
  return next(); // 다음 미들웨어 실행
};

export default checkLoggedIn;
