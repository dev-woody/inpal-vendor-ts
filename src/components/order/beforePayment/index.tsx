import { Route, Routes } from "react-router-dom";
import BeforePaymentContainer from "containers/order/beforePaymentContainer";
import OrderDetailContainer from "containers/order/detailPage/orderDetailContainer";

const BeforePaymentIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<BeforePaymentContainer />} />
      <Route path="/detail/:id" element={<OrderDetailContainer />} />
    </Routes>
  );
};

export default BeforePaymentIndex;
