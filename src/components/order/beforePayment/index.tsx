import { Route, Routes } from "react-router-dom";
import BeforePaymentDetail from "./beforePaymentDetail";
import BeforePaymentContainer from "containers/order/beforePayment/beforePaymentContainer";

const BeforePaymentIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<BeforePaymentContainer />} />
      <Route path="/detail/:id" element={<BeforePaymentDetail />} />
    </Routes>
  );
};

export default BeforePaymentIndex;
