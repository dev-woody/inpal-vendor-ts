import { Route, Routes } from "react-router-dom";
import PaymentCompleteContainer from "containers/order/paymentCompleteContainer";
import OrderDetailContainer from "containers/order/detailPage/orderDetailContainer";

const PaymentCompleteIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<PaymentCompleteContainer />} />
      <Route path="/detail/:id" element={<OrderDetailContainer />} />
    </Routes>
  );
};

export default PaymentCompleteIndex;
