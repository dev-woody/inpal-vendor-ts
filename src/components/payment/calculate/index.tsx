import { Route, Routes } from "react-router-dom";
import CalculateList from "./calculateList";

const CalculateIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<CalculateList />} />
    </Routes>
  );
};

export default CalculateIndex;
