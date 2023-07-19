import { Route, Routes } from "react-router-dom";
import BeforeDeliveryDetail from "./beforeDeliveryDetail";
import BeforeDeliveryContainer from "containers/order/beforeDelivery/beforeDeliveryContainer";

const BeforeDeliveryIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<BeforeDeliveryContainer />} />
      <Route path="/detail/:id" element={<BeforeDeliveryDetail />} />
    </Routes>
  );
};

export default BeforeDeliveryIndex;
