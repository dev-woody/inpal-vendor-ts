import { ReactElement } from "react";
import { useAppSelector } from "reducers/reducerHooks";
import { Navigate, Outlet } from "react-router-dom";
import ErrorPage from "./errorPage";

type authorityProps = {
  children?: ReactElement;
  authentication: boolean;
};

const PrivateRouter = ({
  children,
  authentication,
}: authorityProps): React.ReactElement | null => {
  const localStorageGet = localStorage.getItem("user");
  const user = localStorageGet && JSON.parse(localStorageGet);
  if (authentication) {
    return user === null ? <Navigate to="/auth/signIn" /> : <Outlet />;
  } else {
    return user === null ? <Outlet /> : <ErrorPage />;
  }
};

export default PrivateRouter;
