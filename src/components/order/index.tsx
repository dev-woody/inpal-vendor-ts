import { Route, Routes } from "react-router-dom";
import AllListIndex from "./allList";
import BeforePaymentIndex from "./beforePayment";
import BeforeDeliveryIndex from "./beforeDelivery";
import DeliveryIndex from "./delivery";
import AfterDeliveryIndex from "./afterDelivery";
import CancelIndex from "./cancel";
import ReturnIndex from "./return";
import ExchangeIndex from "./exchange";
import RefundIndex from "./refund";
import ConfirmationIndex from "./confirmation";

const OrderIndex = () => {
  return (
    <Routes>
      <Route path="/allList/*" element={<AllListIndex />} />
      <Route path="/beforePayment/*" element={<BeforePaymentIndex />} />
      <Route path="/beforeDelivery/*" element={<BeforeDeliveryIndex />} />
      <Route path="/delivery/*" element={<DeliveryIndex />} />
      <Route path="/afterDelivery/*" element={<AfterDeliveryIndex />} />
      <Route path="/cancel/*" element={<CancelIndex />} />
      <Route path="/return/*" element={<ReturnIndex />} />
      <Route path="/exchange/*" element={<ExchangeIndex />} />
      <Route path="/refund/*" element={<RefundIndex />} />
      <Route path="confirmation/*" element={<ConfirmationIndex />} />
    </Routes>
  );
};

export default OrderIndex;
