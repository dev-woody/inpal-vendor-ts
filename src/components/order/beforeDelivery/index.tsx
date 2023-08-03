import { Route, Routes } from "react-router-dom";
import BeforeDeliveryContainer from "containers/order/beforeDeliveryContainer";
import BeforeDeliveryDetailContainer from "containers/order/detailPage/beforeDeliveryContainer";

const BeforeDeliveryIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<BeforeDeliveryContainer />} />
      <Route path="/detail/:id" element={<BeforeDeliveryDetailContainer />} />
    </Routes>
  );
};

export default BeforeDeliveryIndex;
