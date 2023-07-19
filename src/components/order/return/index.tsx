import { Route, Routes } from "react-router-dom";
import ReturnDetail from "./returnDetail";
import ReturnListContainer from "containers/order/return/returnListContainer";

const ReturnIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<ReturnListContainer />} />
      <Route path="/detail/:id" element={<ReturnDetail />} />
    </Routes>
  );
};

export default ReturnIndex;
