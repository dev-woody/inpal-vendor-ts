import { Route, Routes } from "react-router-dom";
import ExchangeDetail from "./exchangeDetail";
import ExchangeListContainer from "containers/order/exchange/exchangeListContainer";

const ExchangeIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<ExchangeListContainer />} />
      <Route path="/detail/:id" element={<ExchangeDetail />} />
    </Routes>
  );
};

export default ExchangeIndex;
