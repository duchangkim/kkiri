import Member from '../models/member';

export default async () => {
  console.log('randomcode() call');
  let randomCode = Math.floor(Math.random() * 9999999);
  let isDuplicateCode = true;
  while (isDuplicateCode) {
    // console.log('tlqkf');
    try {
      const userCodeExists = await Member.findUserCode(randomCode);
      console.log(userCodeExists);
      const coupleCodeExists = await Member.findCoupleCode(randomCode);
      console.log(`couple: ${coupleCodeExists}`);

      if (userCodeExists || coupleCodeExists) {
        console.log('중복임');
        randomCode = Math.floor(Math.random() * 9999999);
      }
      if (!userCodeExists && !coupleCodeExists) {
        console.log('중복아님');
        isDuplicateCode = false;
      }
    } catch (e) {
      console.log(e);
    }
  }
  return randomCode;
};
