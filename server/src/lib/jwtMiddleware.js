import jwt from 'jsonwebtoken';
import Member from '../models/member';

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');

  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.member = {
      _id: decoded._id,
      email: decoded.email,
      name: decoded.name,
      coupleId: decoded.coupleId,
      userCode: decoded.userCode,
      coupleShareCode: decoded.coupleShareCode,
      getTogetherDate: decoded.getTogetherDate,
      position: decoded.position,
      mainSetting: decoded.mainSetting,
      kakao: decoded.kakao,
      google: decoded.google,
      facebook: decoded.facebook,
      naver: decoded.naver,
    };

    const now = Math.floor(Date.now() / 1000);
    if ((decoded.exp = now < 60 * 60 * 24 * 3.5)) {
      const member = await Member.findByEmail(decoded.email);
      const token = member.generateToken();
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    return next();
  }
};

export default jwtMiddleware;
