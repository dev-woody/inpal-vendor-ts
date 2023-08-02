import { Route, Routes } from "react-router-dom";
import CancelDetail from "./cancelDetail";
import CancelListContainer from "containers/order/cancelListContainer";

const CancelIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<CancelListContainer />} />
      <Route path="/detail/:id" element={<CancelDetail />} />
    </Routes>
  );
};

export default CancelIndex;
