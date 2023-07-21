import GoodsGroupItemRegister from "components/goodsGroup/items/itemRegister";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findAllUnitActions } from "reducers/admin/findAllUnit";
import { vendorDeliveryCodeActions } from "reducers/deliveryCode/vendorDeliveryCode";
import { itemRegisterActions } from "reducers/goodsGroup/items/register";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { vendorGoodsItemsActions } from "reducers/goodsGroup/vendorGoodsItems";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const GoodsGroupItemRegisterContainer = () => {
  const { user, dcode, goodsGroup, colorCode, registerResult } = useAppSelector(
    (state) => ({
      user: state.user,
      dcode: state.vendorDeliveryCode.findAllByProductId,
      goodsGroup: state.vendorGoodsGroup.findById,
      colorCode: state.vendorProduct.findAllColorCode,
      registerResult: state.vendorGoodsItems.register,
    })
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = (data: any) => {
    dispatch(vendorGoodsItemsActions.register({ ...data }));
  };

  useEffect(() => {
    if (goodsGroup.success) {
      dispatch(
        vendorDeliveryCodeActions.findAllByProductId({
          vendorId: user.vendorId,
          // productId: goodsGroup.data.product.id,
          isDesc: false,
        })
      );
    }
  }, [goodsGroup]);

  useEffect(() => {
    if (registerResult.success) {
      setModalVisible(true);
    }
  }, [registerResult]);

  useEffect(() => {
    dispatch(vendorGoodsGroupActions.findAll(false));
    dispatch(vendorProductActions.findAllColorCode(false));
    return () => {
      dispatch(vendorDeliveryCodeActions.reset("findAllByProductId"));
      dispatch(vendorGoodsItemsActions.reset("register"));
      dispatch(vendorGoodsGroupActions.reset("findAll"));
      dispatch(vendorProductActions.reset("findAllColorCode"));
    };
  }, []);

  return (
    <GoodsGroupItemRegister
      dcode={dcode}
      isColorItem={goodsGroup.data?.product?.name === "페인트"}
      colorCode={colorCode}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
      id={id}
    />
  );
};

export default GoodsGroupItemRegisterContainer;
