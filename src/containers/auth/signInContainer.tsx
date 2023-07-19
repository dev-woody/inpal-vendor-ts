import { useEffect, useState } from "react";
import { vendorAdminActions } from "reducers/admin/vendorAdmin";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { userActions } from "reducers/user";
import LoginForm from "components/auth/signInForm";

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
    if (userInfo.success) {
      dispatch(userActions.saveUser(userInfo.data));
      navigate("/");
    } else {
      switch (userInfo.message) {
        case "관리자 사용자 아이디가 존재 하지 않습니다.\n로그인 또는 아이디를 확인해 주세요.!":
          setErrorMsg("존재하지않는 아이디입니다.");
          break;
        case "관리자 비밀번호가 다릅니다.\n비밀번호를 확인해 주세요.!":
          setErrorMsg("잘못된 비밀번호입니다.");
          break;
      }
    }
  }, [userInfo, dispatch, navigate]);

  useEffect(() => {
    dispatch(vendorAdminActions.reset("signIn"));
    return () => {
      dispatch(vendorAdminActions.reset("signIn"));
    };
  }, [dispatch]);

  return <LoginForm onSubmit={onSubmit} errorMsg={errors} />;
}

export default SignInContainer;
