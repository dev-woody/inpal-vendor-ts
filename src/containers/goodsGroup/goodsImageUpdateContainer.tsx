import GoodsImageUpdate from "components/goodsGroup/goodsImageUpdate";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { vendorGoodsSpecActions } from "reducers/goodsGroup/vendorGoodsSpec";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

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
    if (goodsImageUpdate.success) {
      dispatch(vendorGoodsGroupActions.findById(id));
    }
  }, [goodsImageUpdate]);

  return <GoodsImageUpdate goodsIamge={goodsIamge} onSubmit={onSubmit} />;
};

export default GoodsImageUpdateContainer;
