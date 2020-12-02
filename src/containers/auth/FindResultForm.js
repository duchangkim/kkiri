import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm } from "../../modules/auth";
import FindForm from "../../components/Auth/FindForm";
import { withRouter } from "react-router-dom";

const FindResultForm = ({ history }) => {
  let myEmail = "";
  const { findEmail } = useSelector(({ auth }) => {
    return {
      findEmail: auth.findid.findEmail,
    };
  });
  myEmail = findEmail + "";
  console.log("여기 결과 이메일~~");
  console.log(findEmail);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "findresult",
        key: name,
        value,
      })
    );
  };

  useEffect(() => {
    dispatch(initializeForm("findresult"));
  }, [dispatch]);

  return (
    <FindForm
      type="findresult"
      onChange={onChange}
      error={error}
      myEmail={myEmail}
    />
  );
};

export default withRouter(FindResultForm);
