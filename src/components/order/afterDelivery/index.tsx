import { Route, Routes } from "react-router-dom";
import AfterDeliveryContainer from "containers/order/afterDeliveryContainer";
import OrderDetailContainer from "containers/order/detailPage/orderDetailContainer";

const AfterDeliveryIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<AfterDeliveryContainer />} />
      <Route path="/detail/:id" element={<OrderDetailContainer />} />
    </Routes>
  );
};

export default AfterDeliveryIndex;
