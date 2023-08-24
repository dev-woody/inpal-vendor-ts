import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodsGroupDetail from "components/goodsGroup/update";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";

const GoodsGroupUpdateContainer = () => {
  const { goodsGroup } = useAppSelector((state) => ({
    goodsGroup: state.vendorGoodsGroup.findById,
  }));
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(vendorGoodsGroupActions.findById(id));
    dispatch(vendorProductActions.findAll(false));
    return () => {
      dispatch(vendorGoodsGroupActions.reset("findAll"));
    };
  }, []);

  return <GoodsGroupDetail goodsGroup={goodsGroup} id={id} />;
};

export default GoodsGroupUpdateContainer;
