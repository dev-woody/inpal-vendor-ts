import RegisterContainer from "containers/auth/registerContainer";
import SignInContainer from "containers/auth/signInContainer";
import { Route, Routes } from "react-router-dom";

const SignInIndex = () => {
  return (
    <Routes>
      <Route path="signIn" element={<SignInContainer />} />
      <Route path="register" element={<RegisterContainer />} />
    </Routes>
  );
};

export default SignInIndex;
