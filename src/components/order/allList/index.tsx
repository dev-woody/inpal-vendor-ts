import { Route, Routes } from "react-router-dom";
import OrderList from "./orderList";
import OrderDetail from "./orderDetail";

const AllListIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<OrderList />} />
      <Route path="/detail/:id" element={<OrderDetail />} />
    </Routes>
  );
};

export default AllListIndex;
