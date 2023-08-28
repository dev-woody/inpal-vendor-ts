import GoodsGroupItems from "components/goodsGroup/items/itemsList";
import { ColumnsType } from "lib/columns/columnsList";
import { changeDays, priceToString } from "lib/functions/changeInput";
import { StyledToggle } from "lib/styles";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { vendorGoodsItemsActions } from "reducers/goodsGroup/vendorGoodsItems";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const GoodsGroupItemsContainer = () => {
  const { user, itemList, countItem, setSellStatus } = useAppSelector(
    (store) => ({
      user: store.user,
      itemList: store.vendorGoodsItems.findByGoodsGroupId,
      countItem: store.vendorGoodsItems.countItem,
      setSellStatus: store.vendorGoodsItems.setSellStatus,
    })
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const onSetStatus = (data: object) => {
    dispatch(vendorGoodsItemsActions.setSellStatus({ ...data }));
  };

  useEffect(() => {
    dispatch(vendorGoodsItemsActions.countItem({ goodGroupId: id }));
  }, []);

  useEffect(() => {
    dispatch(
      vendorGoodsItemsActions.findByGoodsGroupId({
        goodGroupId: id,
        page: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
        size: 10,
      })
    );
  }, [setSellStatus]);

  useEffect(() => {
    navigate("?pageNum=0&isDesc=false");
    sessionStorage.setItem(
      "itemPageInfo",
      JSON.stringify({
        pageNum: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
      })
    );
    dispatch(
      vendorGoodsItemsActions.findByGoodsGroupId({
        goodGroupId: id,
        page: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
        size: 10,
      })
    );
    return () => {
      dispatch(vendorGoodsItemsActions.reset("findByGoodsGroupId"));
    };
  }, [dispatch, id, searchParams.get("pageNum"), searchParams.get("isDesc")]);

  const goodsGroupItemsColumns: ColumnsType[] = [
    {
      title: "번호",
      dataIndex: "",
      render: (_, __, index) => index,
    },
    {
      title: "모델명",
      dataIndex: "info",
      render: (info) => info.basic.info.model,
    },
    {
      title: "아이템명",
      dataIndex: "info",
      render: (info) => info.basic.info.name,
    },
    {
      title: "재고",
      dataIndex: "info",
      render: (info) => priceToString(info.stock),
    },
    {
      title: "판매량",
      dataIndex: "info",
      render: (info) => priceToString(info.sellCount),
    },
    {
      title: "생성일",
      dataIndex: "base",
      isDesc: false,
      render: (base) => changeDays(base.createdAt),
    },
    {
      title: "수정일",
      dataIndex: "base",
      isDesc: false,
      render: (base) => changeDays(base.updatedAt),
    },
    {
      title: "판매상태",
      dataIndex: "info",
      render: (info: any, contentList: any) => {
        const action = () => {
          onSetStatus({
            vendorId: user.vendorId,
            goodGroupId: contentList.info.goodGroupId,
            id: contentList.base.id,
            sellStatus: info.sellStatus == "SELL" ? "stop" : "sell",
          });
        };
        return (
          <StyledToggle
            data={info.sellStatus}
            openStatus="SELL"
            action={action}
          />
        );
      },
    },
  ];

  return (
    <GoodsGroupItems
      itemList={itemList}
      countItem={countItem}
      navigate={navigate}
      goodsGroupItemsColumns={goodsGroupItemsColumns}
    />
  );
};

export default GoodsGroupItemsContainer;
