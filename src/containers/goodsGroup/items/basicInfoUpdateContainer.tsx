import BasicUpdate from "components/goodsGroup/items/basicUpdate";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorGoodsItemsActions } from "reducers/goodsGroup/vendorGoodsItems";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const BasicInfoUpdateContainer = ({ basicInfo }: { basicInfo: any }) => {
  const { user, colorCode } = useAppSelector((state) => ({
    user: state.user,
    colorCode: state.vendorProduct.findAllColorCode,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, itemId } = useParams();

  const onSubmit = (data: object) => {
    dispatch(
      vendorGoodsItemsActions.basicUpdate({
        vendorId: user.vendorId,
        id: itemId,
        goodGroupId: id,
        basicInfo: { ...data },
      })
    );
  };

  useEffect(() => {
    dispatch(vendorProductActions.findAllColorCode(false));
  }, []);

  return (
    <BasicUpdate
      basicInfo={basicInfo}
      colorCode={colorCode}
      onSubmit={onSubmit}
    />
  );
};

export default BasicInfoUpdateContainer;
