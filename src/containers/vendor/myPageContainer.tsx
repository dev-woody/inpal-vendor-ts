import MyPage from "components/vendor/myPage";
import { changePostPhone } from "lib/functions/changeInput";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorAdminActions } from "reducers/admin/vendorAdmin";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const MyPageContainer = () => {
  const { user, findAll, master, changePass, updateResult } = useAppSelector(
    (store) => ({
      findAll: store.vendorAdmin.findAll,
      user: store.user,
      master: store.vendorAdmin.findByUserId,
      changePass: store.vendorAdmin.changePass,
      updateResult: store.vendorAdmin.update,
    })
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    dispatch(
      vendorAdminActions.update({
        ...data,
        name: master.data.info.name,
        id: master.data.base.id,
        phone: changePostPhone(data?.phone),
      })
    );
  };

  const onEditPass = (data: any) => {
    dispatch(vendorAdminActions.changePass({ ...data }));
  };

  const onReset = (type: string) => {
    dispatch(vendorAdminActions.reset(type));
  };

  useEffect(() => {
    if (checkStatus(updateResult.status)) {
      dispatch(vendorAdminActions.reset("update"));
      setModalVisible(true);
    }
  }, [updateResult]);

  useEffect(() => {
    dispatch(
      vendorAdminActions.findByUserId({
        vendorId: user?.vendorId,
        userId: user?.signInfo?.userId,
      })
    );
    dispatch(
      vendorAdminActions.findAll({
        vendorId: id,
        isDesc: true,
      })
    );
    return () => {
      dispatch(vendorAdminActions.reset("findByUserId"));
    };
  }, []);

  return (
    <MyPage
      user={user}
      findAll={findAll}
      master={master}
      changePass={changePass}
      onSubmit={onSubmit}
      onReset={onReset}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      onEditPass={onEditPass}
    />
  );
};

export default MyPageContainer;
