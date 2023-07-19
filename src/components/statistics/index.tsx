import { Route, Routes } from "react-router-dom";
import SalesIndex from "./sales";
import GoodsIndex from "./goods";

const StatisticsIndex = () => {
  return (
    <Routes>
      <Route path="/sales" element={<SalesIndex />} />
      <Route path="/goods" element={<GoodsIndex />} />
    </Routes>
  );
};

export default StatisticsIndex;
