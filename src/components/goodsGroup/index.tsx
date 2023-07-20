import { Route, Routes } from "react-router-dom";
import GoodsGroupListContainer from "containers/goodsGroup/findAllContainer";
import GoodsGroupRegisterContainer from "containers/goodsGroup/registerContainer";
import GoodsGroupUpdateContainer from "containers/goodsGroup/updateContainer";
import GoodsGroupOptionRegisterContainer from "containers/goodsGroup/option/optionRegisterContainer";
import GoodsGroupOptionDetailContainer from "containers/goodsGroup/option/optionDetailContainer";
import GoodsGroupItemRegisterContainer from "containers/goodsGroup/items/itemRegisterContainer";
import GoodsGroupItemDetailContainer from "containers/goodsGroup/items/itemDetailContainer";
import SpecIndex from "./spec";

const GoodsGroupIndex = () => {
  return (
    <Routes>
      //*spec
      <Route path="/spec/*" element={<SpecIndex />} />
      //* goods
      <Route path="/groups" element={<GoodsGroupListContainer />} />
      <Route
        path="/groups/register"
        element={<GoodsGroupRegisterContainer />}
      />
      <Route
        path="/groups/detail/:id"
        element={<GoodsGroupUpdateContainer />}
      />
      <Route
        path="/groups/detail/:id/option/register"
        element={<GoodsGroupOptionRegisterContainer />}
      />
      <Route
        path="/groups/detail/:id/option/:optionId"
        element={<GoodsGroupOptionDetailContainer />}
      />
      <Route
        path="/groups/detail/:id/items/register"
        element={<GoodsGroupItemRegisterContainer />}
      />
      <Route
        path="/groups/detail/:id/items/:itemId"
        element={<GoodsGroupItemDetailContainer />}
      />
    </Routes>
  );
};

export default GoodsGroupIndex;
