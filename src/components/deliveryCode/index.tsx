import { Routes, Route } from "react-router-dom";
import DeliveryRegisterContainer from "containers/deliveryCode/registerContainer";
import DeliveryFindAllContainer from "containers/deliveryCode/findAllContainer";
import DeliveryDetailContainer from "containers/deliveryCode/findByIdContainer";

const DeliveryCodeIndex = () => {
  return (
    <Routes>
      <Route path="/dcode" element={<DeliveryFindAllContainer />} />
      <Route path="/dcode/register" element={<DeliveryRegisterContainer />} />
      <Route path="/dcode/detail/:id" element={<DeliveryDetailContainer />} />
    </Routes>
  );
};

export default DeliveryCodeIndex;
