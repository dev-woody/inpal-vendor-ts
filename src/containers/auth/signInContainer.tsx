import { useEffect, useState } from "react";
import { vendorAdminActions } from "reducers/admin/vendorAdmin";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { userActions } from "reducers/user";
import LoginForm from "components/auth/signInForm";
import { checkStatus } from "types/globalTypes";

function SignInContainer() {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => ({
    userInfo: state.vendorAdmin.signIn,
  }));

  const dispatch = useAppDispatch();
  const [errors, setErrorMsg] = useState<string>("");
  const onSubmit = (data: any) => {
    dispatch(
      vendorAdminActions.signIn({
        code: data.vendorCode,
        signInfo: {
          userId: data.userId,
          password: data.password,
        },
      })
    );
  };

  useEffect(() => {
    if (checkStatus(userInfo.status)) {
      dispatch(userActions.saveUser(userInfo.data));
      localStorage.setItem("access_token", userInfo.data.tokenInfo.token);
      localStorage.setItem(
        "refresh_token",
        userInfo.data.tokenInfo.refreshToken
      );
      localStorage.setItem("user", JSON.stringify(userInfo.data));
      navigate("/");
    }
  }, [userInfo, dispatch, navigate]);

  useEffect(() => {
    dispatch(vendorAdminActions.reset("signIn"));
    return () => {
      dispatch(vendorAdminActions.reset("signIn"));
    };
  }, []);

  return <LoginForm onSubmit={onSubmit} errorMsg={errors} />;
}

export default SignInContainer;
