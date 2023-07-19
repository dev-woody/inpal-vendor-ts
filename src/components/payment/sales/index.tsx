import { Route, Routes } from "react-router-dom";
import SalesList from "./salesList";

const SalesIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<SalesList />} />
    </Routes>
  );
};

export default SalesIndex;
