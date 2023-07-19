import GoodsGroupItemDetail from "components/goodsGroup/items/itemDetail";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deliveryFindByPIdActions } from "reducers/deliveryCode/findByPId";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { itemFindByIdActions } from "reducers/goodsGroup/items/findById";
import { itemUpdateActions } from "reducers/goodsGroup/items/update";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const GoodsGroupItemDetailContainer = () => {
  const { user, itemData, dcode, goodsGroup, colorCode, updateResult } =
    useAppSelector((state) => ({
      user: state.user,
      itemData: state.itemFindById,
      dcode: state.deliveryFindByPId,
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

  useEffect(() => {
    if (itemData.success) {
      dispatch(
        deliveryFindByPIdActions.getFindByPId({
          data: {
            vendorId: user.vendorId,
            productId: goodsGroup.data.product.id,
            isDesc: false,
          },
        })
      );
    }
  }, [goodsGroup]);

  useEffect(() => {
    dispatch(vendorGoodsGroupActions.findById(id));
    dispatch(itemFindByIdActions.getFindById({ id: itemId }));
    dispatch(vendorProductActions.findAllColorCode({ isDesc: false }));
    return () => {
      dispatch(itemUpdateActions.reset({}));
      dispatch(deliveryFindByPIdActions.reset({}));
      dispatch(vendorGoodsGroupActions.reset("findById"));
      dispatch(itemFindByIdActions.reset({}));
      dispatch(vendorProductActions.reset("findAllColorCode"));
    };
  }, [dispatch]);

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
