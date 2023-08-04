import { Route, Routes } from "react-router-dom";
import CancelDetail from "./cancelDetail";
import CancelListContainer from "containers/order/cancelListContainer";
import OrderDetailContainer from "containers/order/detailPage/orderDetailContainer";

const CancelIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<CancelListContainer />} />
      <Route path="/detail/:id" element={<OrderDetailContainer />} />
    </Routes>
  );
};

export default CancelIndex;
