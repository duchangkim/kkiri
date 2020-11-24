import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { readSetting, unloadSetting } from "../../modules/setting";
import SettingForm from "../../components/setup/SettingForm";

const MemberDeleteContainer = ({ match, history }) => {
  const dispatch = useDispatch();
  const { setting, error, member, loading } = useSelector(
    ({ member, setting, loading }) => ({
      setting: setting.setting,
      error: setting.error,
      member: member.member,
      loading: loading["setting/READ_SETTING"],
    })
  );
  console.log("여앙");
  console.log(member.email);
  const findemail = member.email;
  console.log(findemail);

  useEffect(() => {
    dispatch(readSetting(findemail));
    return () => {
      dispatch(unloadSetting());
    };
  }, [dispatch, findemail, history]);

  return (
    <SettingForm
      setting={setting}
      loading={loading}
      error={error}
      email={findemail}
    />
  );
};

export default withRouter(MemberDeleteContainer);
