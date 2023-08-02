import { Route, Routes } from "react-router-dom";
import AfterDeliveryDetail from "./afterDeliveryDetail";
import AfterDeliveryContainer from "containers/order/afterDeliveryContainer";

const AfterDeliveryIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<AfterDeliveryContainer />} />
      <Route path="/detail/:id" element={<AfterDeliveryDetail />} />
    </Routes>
  );
};

export default AfterDeliveryIndex;
