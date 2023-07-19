import { Route, Routes } from "react-router-dom";
import Announcement from "./announcement";
import AnnoRegister from "./register";

const AnnouncementIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<Announcement />} />
      <Route
        path="/register"
        element={
          <AnnoRegister
            onSubmit={() => null}
            modalVisible={false}
            setModalVisible={(status: boolean) => null}
          />
        }
      />
    </Routes>
  );
};

export default AnnouncementIndex;
