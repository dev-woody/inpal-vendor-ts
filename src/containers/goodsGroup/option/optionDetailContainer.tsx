import GoodsGroupOptionDetail from "components/goodsGroup/option/optionDetail";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { optionFindByIdActions } from "reducers/goodsGroup/option/optionFindById";
import { optionSetSellStatusActions } from "reducers/goodsGroup/option/optionSetSellStatus";
import { optionUpdateActions } from "reducers/goodsGroup/option/optionUpdate";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const GoodsGroupOptionDetailContainer = () => {
  const { user, optionData, updateResult } = useAppSelector((state) => ({
    user: state.user,
    optionData: state.optionFindById,
    updateResult: state.optionUpdate,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, optionId } = useParams();

  const onSetSellStatus = (status: string) => {
    dispatch(
      optionSetSellStatusActions.getSetSellStatus({
        data: {
          vendorId: user.vendorId,
          goodGroupId: optionData.data?.goodGroupId,
          id: optionData.data?.id,
          status,
        },
      })
    );
  };

  const onSubmit = ({ data }: { data: any }) => {
    const { name, spec } = data;
    dispatch(
      optionUpdateActions.postUpdate({
        data: {
          vendorId: user.vendorId,
          goodGroupId: optionData.data.goodGroupId,
          id: optionData.data.id,
          name,
          spec,
        },
      })
    );
  };

  useEffect(() => {
    if (updateResult.success) {
      setModalVisible(true);
      dispatch(optionUpdateActions.reset({}));
    }
  }, [dispatch, updateResult]);

  useEffect(() => {
    dispatch(optionFindByIdActions.getFindById({ id: optionId }));
    return () => {
      dispatch(optionFindByIdActions.reset({}));
      dispatch(optionUpdateActions.reset({}));
      dispatch(optionSetSellStatusActions.reset({}));
    };
  }, [dispatch]);

  return (
    <GoodsGroupOptionDetail
      optionData={optionData}
      onSubmit={onSubmit}
      onSetSellStatus={onSetSellStatus}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
      id={id}
    />
  );
};

export default GoodsGroupOptionDetailContainer;
