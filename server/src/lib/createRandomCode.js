import Member from '../models/member';

export default async () => {
  let randomCode = Math.floor(Math.random() * 9999999);
  let isDuplicateCode = true;
  while (isDuplicateCode) {
    try {
      const userCodeExists = await Member.findUserCode(randomCode);
      const coupleCodeExists = await Member.findCoupleCode(randomCode);

      if (userCodeExists || coupleCodeExists) {
        randomCode = Math.floor(Math.random() * 9999999);
      }
      if (!userCodeExists && !coupleCodeExists) {
        isDuplicateCode = false;
      }
    } catch (e) {
      console.log(e);
    }
  }
  return randomCode;
};
