import GoodsGroupItemDetail from "components/goodsGroup/items/itemDetail";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorDeliveryCodeActions } from "reducers/deliveryCode/vendorDeliveryCode";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { vendorGoodsItemsActions } from "reducers/goodsGroup/vendorGoodsItems";

const GoodsGroupItemDetailContainer = () => {
  const { itemData } = useAppSelector((state) => ({
    user: state.user,
    itemData: state.vendorGoodsItems.findById,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, itemId } = useParams();

  // useEffect(() => {
  //   if (itemData.success) {
  //     dispatch(
  //       vendorDeliveryCodeActions.findAllByProductId({
  //         data: {
  //           vendorId: user.vendorId,
  //           productId: goodsGroup.data.product.id,
  //           isDesc: true,
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
      dispatch(vendorDeliveryCodeActions.reset("fincAllByProductId"));
      dispatch(vendorGoodsGroupActions.reset("findById"));
      dispatch(vendorGoodsItemsActions.reset("findById"));
      dispatch(vendorProductActions.reset("findAllColorCode"));
    };
  }, []);

  return <GoodsGroupItemDetail itemData={itemData} id={id} />;
};

export default GoodsGroupItemDetailContainer;
