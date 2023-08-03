import { Route, Routes } from "react-router-dom";
import OrderAllListContainer from "containers/order/findallOrderContainer";
import OrderDetailContainer from "containers/order/detailPage/orderDetailContainer";

const AllListIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<OrderAllListContainer />} />
      <Route path="/detail/:id" element={<OrderDetailContainer />} />
    </Routes>
  );
};

export default AllListIndex;
