import { Route, Routes } from "react-router-dom";
import RefundDetail from "./refundDetail";
import RefundListContainer from "containers/order/refund/refundListContainer";

const RefundIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<RefundListContainer />} />
      <Route path="/detail/:id" element={<RefundDetail />} />
    </Routes>
  );
};

export default RefundIndex;
