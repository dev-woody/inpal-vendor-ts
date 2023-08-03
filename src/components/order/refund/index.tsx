import { Route, Routes } from "react-router-dom";
import RefundListContainer from "containers/order/refundListContainer";
import OrderExceptionContainer from "containers/order/detailPage/exceptionOrderContainer";

const RefundIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<RefundListContainer />} />
      <Route
        path="/detail/:id"
        element={
          <OrderExceptionContainer
            url="setReturnRequest"
            nextStatus="RETURN_REQUEST"
          />
        }
      />
    </Routes>
  );
};

export default RefundIndex;
