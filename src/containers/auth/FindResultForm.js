import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, findid } from "../../modules/auth";
import FindForm from "../../components/auth/FindForm";
import { check } from "../../modules/member";
import { withRouter } from "react-router-dom";

const FindResultForm = ({ history }) => {
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
    />
  );
};

export default withRouter(FindResultForm);
