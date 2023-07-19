import GoodsGroupOptionRegister from "components/goodsGroup/option/optionRegister";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { optionRegisterActions } from "reducers/goodsGroup/option/optionRegister";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const GoodsGroupOptionRegisterContainer = () => {
  const { user, registerResult } = useAppSelector((state) => ({
    user: state.user,
    registerResult: state.optionRegister,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = ({ data }: { data: any }) => {
    const { name, spec, price, stock } = data;
    dispatch(
      optionRegisterActions.postRegister({
        data: {
          vendorId: user.vendorId,
          goodGroupId: id,
          name,
          spec,
          price: Number(price),
          stock: Number(stock),
        },
      })
    );
  };

  useEffect(() => {
    if (registerResult.success) {
      setModalVisible(true);
      dispatch(optionRegisterActions.reset({}));
    }
  }, [dispatch, registerResult]);

  useEffect(() => {
    dispatch(optionRegisterActions.reset({}));
    return () => {
      dispatch(optionRegisterActions.reset({}));
    };
  }, [dispatch]);

  return (
    <GoodsGroupOptionRegister
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
      id={id}
    />
  );
};

export default GoodsGroupOptionRegisterContainer;
