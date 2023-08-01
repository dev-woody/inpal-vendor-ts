import "App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PrivateRouter from "lib/pages/privateRouter";
import ErrorPage from "lib/pages/errorPage";
import Main from "lib/pages/main";
import SignInIndex from "components/auth";
import Dashboard from "lib/pages/dashboard";
import DeliveryCodeIndex from "components/deliveryCode";
import GoodsGroupIndex from "components/goodsGroup";
import OrderIndex from "components/order";
import PaymentIndex from "components/payment";
import NoticeIndex from "components/notice";
import PromotionIndex from "components/promotion";
import StatisticsIndex from "components/statistics";
import MyPageContainer from "containers/vendor/myPageContainer";
import VendorIndex from "components/vendor";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main />} errorElement={<ErrorPage />}>
        {/* //* 인증하지않는 페이지 */}
        <Route element={<PrivateRouter authentication={false} />}>
          <Route path="auth/*" element={<SignInIndex />} />
        </Route>
        {/* //* 인증해야하는 페이지 */}
        <Route element={<PrivateRouter authentication={true} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="vendor/*" element={<VendorIndex />} />
          <Route path="/mypage/:id" element={<MyPageContainer />} />
          <Route path="dcode/*" element={<DeliveryCodeIndex />} />
          <Route path="order/*" element={<OrderIndex />} />
          <Route path="goods/*" element={<GoodsGroupIndex />} />
          <Route path="notice/*" element={<NoticeIndex />} />
          <Route path="promotion/*" element={<PromotionIndex />} />
          <Route path="payment/*" element={<PaymentIndex />} />
          <Route path="statistics/*" element={<StatisticsIndex />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
