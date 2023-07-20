import { Route, Routes } from "react-router-dom";
import SpecContainer from "containers/goodsGroup/spec/specContainer";
import SpecRegisterContainer from "containers/goodsGroup/spec/specRegisterContainer";

const SpecIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<SpecContainer />} />
      <Route path="/register" element={<SpecRegisterContainer />} />
    </Routes>
  );
};

export default SpecIndex;
