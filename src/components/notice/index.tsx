import { Route, Routes } from "react-router-dom";
import AnnouncementIndex from "./announcement";
import FaqIndex from "./faq";

const NoticeIndex = () => {
  return (
    <Routes>
      <Route path="/announcement/*" element={<AnnouncementIndex />} />
      <Route path="/Faq/*" element={<FaqIndex />} />
    </Routes>
  );
};

export default NoticeIndex;
