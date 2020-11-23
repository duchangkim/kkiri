import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readSetting, unloadSetting } from '../../modules/setting';
import PostActionButtons from '../../components/setup/PostActionButtons';
import {removeMember} from "../../lib/api/setting";

const MemberDeleteContainer = ({ match, history }) => {
  const dispatch = useDispatch();
  const { setting, error,email, member, loading } = useSelector(({ member, setting, loading }) => ({
    setting: setting.setting,
    error: setting.error,
    member: member.member,
    email: member.email,
    loading: loading['setting/READ_SETTING'],
  }));
  console.log("여앙")
  console.log(member.email);

  const removeemail = member.email;

  useEffect(() => {
    dispatch(readSetting(removeemail));
    return () => {
      dispatch(unloadSetting());
    };
  }, [dispatch, removeemail]);

  
  const onRemove  = async () => {
    console.log()
    try {   
        console.log(removeemail);  
        await removeMember(email).then(res => {
            console.log('삭제성공!');              
            history.push("/");
          }).catch(err => {
            console.log(err);
        });
        
    }catch(e) {
        console.log(e);
    }
  }



  return (
    <PostActionButtons
    setting={setting}
      loading={loading}
      error={error}
      onRemove={onRemove}
    />
  );
};

export default withRouter(MemberDeleteContainer);
