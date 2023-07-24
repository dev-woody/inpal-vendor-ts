import GoodsGroupItemDetail from "components/goodsGroup/items/itemDetail";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorDeliveryCodeActions } from "reducers/deliveryCode/vendorDeliveryCode";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { itemUpdateActions } from "reducers/goodsGroup/items/update";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { vendorGoodsItemsActions } from "reducers/goodsGroup/vendorGoodsItems";

const GoodsGroupItemDetailContainer = () => {
  const { user, itemData, dcode, goodsGroup, colorCode, updateResult } =
    useAppSelector((state) => ({
      user: state.user,
      itemData: state.vendorGoodsItems.findById,
      dcode: state.vendorDeliveryCode.findAllByProductId,
      goodsGroup: state.vendorGoodsGroup.findById,
      colorCode: state.vendorProduct.findAllColorCode,
      updateResult: state.itemUpdate,
    }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, itemId } = useParams();

  const onSubmit = ({ data }: { data: any }) => {
    const newData = {
      ...data,
      id: itemId,
      vendorId: user.vendorId,
      goodGroupId: id,
    };
    dispatch(
      itemUpdateActions.postUpdate({
        data: newData,
      })
    );
  };

  useEffect(() => {
    if (updateResult.success) {
      setModalVisible(true);
      dispatch(itemUpdateActions.reset({}));
    }
  }, [updateResult]);

  // useEffect(() => {
  //   if (itemData.success) {
  //     dispatch(
  //       vendorDeliveryCodeActions.findAllByProductId({
  //         data: {
  //           vendorId: user.vendorId,
  //           productId: goodsGroup.data.product.id,
  //           isDesc: false,
  //         },
  //       })
  //     );
  //   }
  // }, [goodsGroup]);

  useEffect(() => {
    dispatch(vendorGoodsGroupActions.findById(id));
    dispatch(vendorGoodsItemsActions.findById(itemId));
    dispatch(vendorProductActions.findAllColorCode(false));
    return () => {
      dispatch(itemUpdateActions.reset({}));
      dispatch(vendorDeliveryCodeActions.reset("fincAllByProductId"));
      dispatch(vendorGoodsGroupActions.reset("findById"));
      dispatch(vendorGoodsItemsActions.reset("findById"));
      dispatch(vendorProductActions.reset("findAllColorCode"));
    };
  }, []);

  return (
    <GoodsGroupItemDetail
      itemData={itemData}
      dcode={dcode}
      colorCode={colorCode}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
      id={id}
    />
  );
};

export default GoodsGroupItemDetailContainer;
