import GoodsGroupItemRegister from "components/goodsGroup/items/itemRegister";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorDeliveryCodeActions } from "reducers/deliveryCode/vendorDeliveryCode";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { vendorGoodsItemsActions } from "reducers/goodsGroup/vendorGoodsItems";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const GoodsGroupItemRegisterContainer = () => {
  const { user, goodsGroup, colorCode, registerResult } = useAppSelector(
    (state) => ({
      user: state.user,
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
    dispatch(
      vendorGoodsItemsActions.register({
        vendorId: user.vendorId,
        goodGroupId: goodsGroup.data.base.id,
        ...data,
      })
    );
  };

  // useEffect(() => {
  //   if (checkStatus(goodsGroup.status)) {
  //     dispatch(
  //       vendorGoodsSpecActions.findAllByProductId({
  //         vendorId: user.vendorId,
  //         productId: goodsGroup.data.info.basic.info.product.id,
  //         isDesc: false,
  //       })
  //     );
  //     // dispatch(
  //     //   vendorDeliveryCodeActions.findAllByProductId({
  //     //     vendorId: user.vendorId,
  //     //     // productId: goodsGroup.data.product.id,
  //     //     isDesc: false,
  //     //   })
  //     // );
  //   }
  // }, [goodsGroup]);

  useEffect(() => {
    if (checkStatus(registerResult.status)) {
      setModalVisible(true);
    }
  }, [registerResult]);

  useEffect(() => {
    dispatch(vendorGoodsGroupActions.findById(id));
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
      registerResult={registerResult}
      isColorItem={goodsGroup.data?.info?.dsType}
      colorCode={colorCode}
      goodsGroup={goodsGroup}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
      id={id}
    />
  );
};

export default GoodsGroupItemRegisterContainer;
