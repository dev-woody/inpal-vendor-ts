import GoodsImageUpdate from "components/goodsGroup/goodsImageUpdate";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { vendorGoodsSpecActions } from "reducers/goodsGroup/vendorGoodsSpec";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const GoodsImageUpdateContainer = ({ goodsIamge }: { goodsIamge: any }) => {
  const { user, goodsGroupInfo, goodsImageUpdate } = useAppSelector(
    (store) => ({
      user: store.user,
      goodsGroupInfo: store.vendorGoodsGroup.findById,
      goodsImageUpdate: store.vendorGoodsGroup.goodsImageUpdate,
    })
  );

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(
      vendorGoodsGroupActions.goodsImageUpdate({
        vendorId: user.vendorId,
        id: goodsGroupInfo.data.base.id,
        ...data,
      })
    );
  };

  useEffect(() => {
    if (checkStatus(goodsImageUpdate.status)) {
      setModalVisible(true);
      dispatch(vendorGoodsGroupActions.findById(id));
      dispatch(vendorGoodsGroupActions.reset("goodsImageUpdate"));
    }
  }, [goodsImageUpdate]);

  return (
    <GoodsImageUpdate
      goodsImageUpdate={goodsImageUpdate}
      goodsIamge={goodsIamge}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default GoodsImageUpdateContainer;
