import GoodsGroupItemRegister from "components/goodsGroup/items/itemRegister";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findAllUnitActions } from "reducers/admin/findAllUnit";
import { vendorDeliveryCodeActions } from "reducers/deliveryCode/vendorDeliveryCode";
import { itemRegisterActions } from "reducers/goodsGroup/items/register";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const GoodsGroupItemRegisterContainer = () => {
  const { user, dcode, goodsGroup, colorCode, registerResult, unitCode } =
    useAppSelector((state) => ({
      user: state.user,
      dcode: state.vendorDeliveryCode.findAllByProductId,
      goodsGroup: state.vendorGoodsGroup.findById,
      colorCode: state.vendorProduct.findAllColorCode,
      registerResult: state.itemRegister,
      unitCode: state.findAllUnit,
    }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = ({ data }: { data: any }) => {
    const newData = {
      ...data,
      vendorId: user.vendorId,
      goodGroupId: id,
      stock: Number(data.stock),
      colorItem: {
        colorRgb: data.colorItem.colorRgb,
        capacity: Number(data.colorItem.capacity),
        unit: data.colorItem.unit,
        basicPrice: Number(data.colorItem.basicPrice),
        saleRatio: Number(data.colorItem.saleRatio),
        pointRatio: Number(data.colorItem.pointRatio),
      },
    };
    dispatch(itemRegisterActions.postRegister({ data: newData }));
  };

  useEffect(() => {
    if (goodsGroup.success) {
      dispatch(
        vendorDeliveryCodeActions.findAllByProductId({
          data: {
            vendorId: user.vendorId,
            productId: goodsGroup.data.product.id,
            isDesc: false,
          },
        })
      );
      dispatch(
        findAllUnitActions.getFindAll({
          data: {
            productId: goodsGroup.data.product.id,
            isDesc: false,
          },
        })
      );
    }
  }, [goodsGroup]);

  useEffect(() => {
    if (registerResult.success) {
      setModalVisible(true);
      dispatch(itemRegisterActions.postRegister({}));
    }
  }, [registerResult]);

  useEffect(() => {
    dispatch(vendorGoodsGroupActions.findAll(id));
    dispatch(vendorProductActions.findAllColorCode({ isDesc: false }));
    return () => {
      dispatch(vendorDeliveryCodeActions.reset("findAllByProductId"));
      dispatch(itemRegisterActions.reset({}));
      dispatch(vendorGoodsGroupActions.reset("findAll"));
      dispatch(vendorProductActions.reset("findAllColorCode"));
    };
  }, []);

  return (
    <GoodsGroupItemRegister
      dcode={dcode}
      isColorItem={goodsGroup.data?.product?.name === "페인트"}
      colorCode={colorCode}
      unitCode={unitCode}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
      id={id}
    />
  );
};

export default GoodsGroupItemRegisterContainer;
