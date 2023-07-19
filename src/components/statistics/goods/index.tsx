import { Route, Routes } from "react-router-dom";
import GoodsList from "./goodsList";

const GoodsIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<GoodsList />} />
    </Routes>
  );
};

export default GoodsIndex;
