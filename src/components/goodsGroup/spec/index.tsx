import { Route, Routes } from "react-router-dom";
import SpecContainer from "containers/goodsGroup/spec/specContainer";
import SpecRegisterContainer from "containers/goodsGroup/spec/specRegisterContainer";
import SpecDetailContainer from "containers/goodsGroup/spec/specDetailContainer";

const SpecIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<SpecContainer />} />
      <Route path="/register" element={<SpecRegisterContainer />} />
      <Route path="/detail/:id" element={<SpecDetailContainer />} />
    </Routes>
  );
};

export default SpecIndex;
