import { Route, Routes } from "react-router-dom";
import DeliveryListContainer from "containers/order/deliveryListContainer";
import OrderDetailContainer from "containers/order/detailPage/orderDetailContainer";

const DeliveryIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<DeliveryListContainer />} />
      <Route path="/detail/:id" element={<OrderDetailContainer />} />
    </Routes>
  );
};

export default DeliveryIndex;
