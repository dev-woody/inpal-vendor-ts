import SpecList from "components/goodsGroup/spec/specList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendorGoodsSpecActions } from "reducers/goodsGroup/vendorGoodsSpec";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const SpecContainer = () => {
  const { user, specList, productList } = useAppSelector((state) => ({
    user: state.user,
    specList: state.vendorGoodsSpec.findAllByProductId,
    productList: state.vendorProduct.findAll,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSelect = (id: string) => {
    dispatch(
      vendorGoodsSpecActions.findAllByProductId({
        vendorId: user.vendorId,
        productId: id,
        isDesc: false,
      })
    );
  };

  useEffect(() => {
    dispatch(vendorProductActions.findAll(false));
    return () => {
      dispatch(vendorProductActions.reset("findAll"));
    };
  }, []);

  return (
    <SpecList
      productList={productList}
      specList={specList}
      onSelect={onSelect}
      navigate={navigate}
    />
  );
};

export default SpecContainer;
