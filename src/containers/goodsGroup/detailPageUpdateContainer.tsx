import DetailPageUpdate from "components/goodsGroup/detailPageUpdate";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const DetailUpdateContainer = ({ detailPage }: { detailPage: any }) => {
  const { user, goodsGroupInfo, detailUpdate } = useAppSelector((store) => ({
    user: store.user,
    goodsGroupInfo: store.vendorGoodsGroup.findById,
    detailUpdate: store.vendorGoodsGroup.detailUpdate,
  }));

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const onSubmit = (data: any) => {
    dispatch(
      vendorGoodsGroupActions.detailUpdate({
        vendorId: user.vendorId,
        id: goodsGroupInfo.data.base.id,
        ...data,
      })
    );
  };

  useEffect(() => {
    if (detailUpdate.success) {
      dispatch(vendorGoodsGroupActions.findById(id));
    }
  }, [detailUpdate]);

  return <DetailPageUpdate detailPage={detailPage} onSubmit={onSubmit} />;
};

export default DetailUpdateContainer;
