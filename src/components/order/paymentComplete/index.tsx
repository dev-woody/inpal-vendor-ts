import { Route, Routes } from "react-router-dom";
import PaymentCompleteContainer from "containers/order/paymentCompleteContainer";

const PaymentCompleteIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<PaymentCompleteContainer />} />
    </Routes>
  );
};

export default PaymentCompleteIndex;
