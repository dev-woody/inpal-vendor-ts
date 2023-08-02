import { Route, Routes } from "react-router-dom";
import ConfirmationDetail from "./confirmationDetail";
import ConfirmationListContainer from "containers/order/confirmationListContainer";

const ConfirmationIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<ConfirmationListContainer />} />
      <Route path="/detail/:id" element={<ConfirmationDetail />} />
    </Routes>
  );
};

export default ConfirmationIndex;
