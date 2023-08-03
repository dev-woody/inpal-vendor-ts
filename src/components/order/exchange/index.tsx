import { Route, Routes } from "react-router-dom";
import ExchangeDetail from "./exchangeDetail";
import ExchangeListContainer from "containers/order/exchangeListContainer";
import OrderExceptionContainer from "containers/order/detailPage/exceptionOrderContainer";

const ExchangeIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<ExchangeListContainer />} />
      <Route
        path="/detail/:id"
        element={
          <OrderExceptionContainer
            url="setExchangeComplete"
            nextStatus="EXCHANGE_COMPLETE"
          />
        }
      />
    </Routes>
  );
};

export default ExchangeIndex;
