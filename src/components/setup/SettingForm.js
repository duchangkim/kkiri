import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MemberDeleteButtons from "./MemberDeleteButtons";
import { removeMember } from "../../lib/api/setting";

function SettingForm({ setting, email, history }) {
  const onRemove = async () => {
    try {
      console.log(email);
      await removeMember(email);
      window.location.href = `http://192.168.5.22:3000`;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MemberDeleteButtons onRemove={onRemove} />
    </>
  );
}

export default React.memo(SettingForm);
