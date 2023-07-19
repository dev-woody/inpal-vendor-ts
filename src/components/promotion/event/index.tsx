import { Route, Routes } from "react-router-dom";
import Event from "./event";
import EventRegister from "./register";

const EventIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<Event />} />
      <Route
        path="/register"
        element={
          <EventRegister
            onSubmit={() => null}
            modalVisible={false}
            setModalVisible={(status: boolean) => null}
          />
        }
      />
    </Routes>
  );
};

export default EventIndex;
