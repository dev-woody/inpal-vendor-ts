import { Route, Routes } from "react-router-dom";
import Faq from "./faq";
import FaqRegister from "./register";

const FaqIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<Faq />} />
      <Route
        path="/register"
        element={
          <FaqRegister
            onSubmit={() => null}
            modalVisible={false}
            setModalVisible={(status: boolean) => null}
          />
        }
      />
    </Routes>
  );
};

export default FaqIndex;
