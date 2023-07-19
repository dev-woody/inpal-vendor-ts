import { Route, Routes } from "react-router-dom";
import EventIndex from "./event";

const PromotionIndex = () => {
  return <Routes>{<Route path="/event/*" element={<EventIndex />} />}</Routes>;
};

export default PromotionIndex;
