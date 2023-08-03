import { Route, Routes } from "react-router-dom";
import ConfirmationListContainer from "containers/order/confirmationListContainer";
import OrderDetailContainer from "containers/order/detailPage/orderDetailContainer";

const ConfirmationIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<ConfirmationListContainer />} />
      <Route path="/detail/:id" element={<OrderDetailContainer />} />
    </Routes>
  );
};

export default ConfirmationIndex;
