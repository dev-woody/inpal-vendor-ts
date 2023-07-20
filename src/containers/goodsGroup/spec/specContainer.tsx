import SpecList from "components/goodsGroup/spec/specList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const SpecContainer = () => {
  const { specList } = useAppSelector((state) => ({
    specList: state.vendorGoodsSpec.findAll,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return <SpecList specList={specList} navigate={navigate} />;
};

export default SpecContainer;
