import { Route, Routes } from "react-router-dom";
import CalculateIndex from "./calculate";
import SalesIndex from "./sales";

const PaymentIndex = () => {
  return (
    <Routes>
      <Route path="/calculate" element={<CalculateIndex />} />
      <Route path="/sales" element={<SalesIndex />} />
    </Routes>
  );
};

export default PaymentIndex;
