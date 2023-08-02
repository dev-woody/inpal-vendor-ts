import { Route, Routes } from "react-router-dom";
import DeliveryDetail from "./deliveryDetail";
import DeliveryListContainer from "containers/order/deliveryListContainer";

const DeliveryIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<DeliveryListContainer />} />
      <Route path="/detail/:id" element={<DeliveryDetail />} />
    </Routes>
  );
};

export default DeliveryIndex;
