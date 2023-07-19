import GoodsGorupList from "components/goodsGroup/list";
import { ColumnsType } from "lib/columns/columnsList";
import { changeDays } from "lib/functions/changeInput";
import { StyledToggle } from "lib/styles";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const GoodsGroupListContainer = () => {
  const { user, goodsGroup, setOpenStatus } = useAppSelector((state) => ({
    user: state.user,
    goodsGroup: state.vendorGoodsGroup.findAll,
    setOpenStatus: state.vendorGoodsGroup.setOpenStatus,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSetStatus = (data: object) => {
    dispatch(vendorGoodsGroupActions.setOpenStatus(data));
  };

  useEffect(() => {
    const data = {
      vendorId: user.vendorId,
      isDesc: true,
    };
    dispatch(vendorGoodsGroupActions.findAll(data));
  }, [setOpenStatus]);

  useEffect(() => {
    const data = {
      vendorId: user.vendorId,
      isDesc: true,
    };
    dispatch(vendorGoodsGroupActions.findAll(data));
    return () => {
      dispatch(vendorGoodsGroupActions.reset("findAll"));
    };
  }, [dispatch]);

  const goodsGroupColumns: ColumnsType[] = [
    {
      title: "코드",
      dataIndex: "code",
    },
    {
      title: "그룹명",
      dataIndex: "name",
    },
    {
      title: "품목명",
      dataIndex: "productName",
    },
    {
      title: "제조사명",
      dataIndex: "manufacturerName",
    },
    {
      title: "생성일",
      dataIndex: "createdAt",
      isDesc: true,
      render: (createdAt) => changeDays(createdAt),
    },
    {
      title: "수정일",
      dataIndex: "updatedAt",
      isDesc: true,
      render: (updatedAt) => changeDays(updatedAt),
    },
    {
      title: "판매상태",
      dataIndex: "sellStatus",
      render: (openStatus: string, contentList: any) => {
        const action = () => {
          onSetStatus({
            vendorId: contentList.vendorId,
            id: contentList.id,
            status: openStatus == "SELL" ? "stop" : "sell",
          });
        };
        return (
          <StyledToggle data={openStatus} openStatus="SELL" action={action} />
        );
      },
    },
  ];

  return (
    <GoodsGorupList
      goodsGroupList={goodsGroup}
      goodsGroupColumns={goodsGroupColumns}
    />
  );
};

export default GoodsGroupListContainer;
