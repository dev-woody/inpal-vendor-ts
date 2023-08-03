import { Route, Routes } from "react-router-dom";
import ReturnDetail from "./returnDetail";
import ReturnListContainer from "containers/order/returnListContainer";
import OrderExceptionContainer from "containers/order/detailPage/exceptionOrderContainer";

const ReturnIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<ReturnListContainer />} />
      <Route
        path="/detail/:id"
        element={
          <OrderExceptionContainer
            url="setReturnComplete"
            nextStatus="RETURN_COMPLETE"
          />
        }
      />
    </Routes>
  );
};

export default ReturnIndex;
