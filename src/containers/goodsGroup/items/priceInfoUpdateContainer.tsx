import PriceUpdate from "components/goodsGroup/items/priceUpdate";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorGoodsItemsActions } from "reducers/goodsGroup/vendorGoodsItems";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const PriceInfoUpdateContainer = ({ priceInfo }: { priceInfo: any }) => {
  const { user } = useAppSelector((state) => ({
    user: state.user,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, itemId } = useParams();

  const onSubmit = (data: any) => {
    dispatch(
      vendorGoodsItemsActions.priceUpdate({
        vendorId: user.vendorId,
        id: itemId,
        goodGroupId: id,
        priceInfo: {
          priceNumId: data.priceInfo.priceNumId,
          price: Number(data.priceInfo.price),
          salePrice: Number(data.priceInfo.salePrice),
          deliveryId: data.priceInfo.deliveryId,
        },
      })
    );
  };

  return <PriceUpdate priceInfo={priceInfo} onSubmit={onSubmit} />;
};

export default PriceInfoUpdateContainer;
