import DetailCompanyContainer from "containers/vendor/detailCompanyContainer";
import VendorDetailContainer from "containers/vendor/detailContainer";
import SignUpVendorContainer from "containers/vendor/signUpVendorContainer";
import { Route, Routes } from "react-router-dom";

const VendorIndex = () => {
  return (
    <Routes>
      <Route path="/signUp" element={<SignUpVendorContainer />} />
      <Route path="/detail/:userId" element={<VendorDetailContainer />} />
      <Route path="/:userId/companyInfo" element={<DetailCompanyContainer />} />
    </Routes>
  );
};

export default VendorIndex;
