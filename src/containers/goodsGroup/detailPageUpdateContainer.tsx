import DetailPageUpdate from "components/goodsGroup/detailPageUpdate";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const DetailUpdateContainer = ({ detailPage }: { detailPage: any }) => {
  const { user, goodsGroupInfo, detailUpdate } = useAppSelector((store) => ({
    user: store.user,
    goodsGroupInfo: store.vendorGoodsGroup.findById,
    detailUpdate: store.vendorGoodsGroup.detailUpdate,
  }));

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    dispatch(
      vendorGoodsGroupActions.detailUpdate({
        vendorId: user.vendorId,
        id: id,
        ...data,
      })
    );
  };

  useEffect(() => {
    if (checkStatus(detailUpdate.status)) {
      setModalVisible(true);
      dispatch(vendorGoodsGroupActions.findById(id));
      dispatch(vendorGoodsGroupActions.reset("detailUpdate"));
    }
  }, [detailUpdate]);

  return (
    <DetailPageUpdate
      detailPage={detailPage}
      detailUpdate={detailUpdate}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default DetailUpdateContainer;
