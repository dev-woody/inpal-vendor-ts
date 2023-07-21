import GoodsGroupItems from "components/goodsGroup/items/itemsList";
import { ColumnsType } from "lib/columns/columnsList";
import { changeDays } from "lib/functions/changeInput";
import { StyledToggle } from "lib/styles";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { itemsFindAllActions } from "reducers/goodsGroup/items/findAll";
import { itemSetSellStatusActions } from "reducers/goodsGroup/items/setSellStatus";
import { vendorGoodsItemsActions } from "reducers/goodsGroup/vendorGoodsItems";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const GoodsGroupItemsContainer = () => {
  const { user, itemList, setSellStatus } = useAppSelector((state) => ({
    user: state.user,
    itemList: state.itemsFindAll,
    setSellStatus: state.itemSetSellStatus,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSetStatus = (data: object) => {
    dispatch(itemSetSellStatusActions.getSetSellStatus({ data }));
  };

  useEffect(() => {
    dispatch(
      vendorGoodsItemsActions.findByGoodsGroupId({
        goodGroupId: id,
        isDesc: false,
      })
    );
  }, [setSellStatus]);

  useEffect(() => {
    dispatch(
      itemsFindAllActions.getFindAll({
        data: {
          goodGroupId: id,
          isDesc: false,
        },
      })
    );
    return () => {
      dispatch(itemsFindAllActions.reset({}));
    };
  }, [dispatch, id]);

  const goodsGroupItemsColumns: ColumnsType[] = [
    {
      title: "모델명",
      dataIndex: "model",
    },
    {
      title: "아이템명",
      dataIndex: "name",
    },
    {
      title: "재고",
      dataIndex: "stock",
    },
    {
      title: "판매량",
      dataIndex: "sellCount",
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
            goodGroupId: contentList.goodGroupId,
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
    <GoodsGroupItems
      itemList={itemList}
      navigate={navigate}
      goodsGroupItemsColumns={goodsGroupItemsColumns}
    />
  );
};

export default GoodsGroupItemsContainer;
