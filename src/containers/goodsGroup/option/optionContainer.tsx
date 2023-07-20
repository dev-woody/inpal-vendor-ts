import GoodsGroupOption from "components/goodsGroup/option/option";
import { ColumnsType } from "lib/columns/columnsList";
import { changeDays } from "lib/functions/changeInput";
import { StyledToggle } from "lib/styles";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { optionFindAllActions } from "reducers/goodsGroup/option/optionFindAll";
import { optionSetSellStatusActions } from "reducers/goodsGroup/option/optionSetSellStatus";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const GoodsGroupOptionContainer = () => {
  const { optionList, setSellStatus, user } = useAppSelector((state) => ({
    optionList: state.optionFindAll,
    setSellStatus: state.optionSetSellStatus,
    user: state.user,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSetStatus = (data: object) => {
    dispatch(optionSetSellStatusActions.getSetSellStatus({ data }));
  };

  useEffect(() => {
    dispatch(
      optionFindAllActions.getFindAll({
        data: { goodGroupId: id, isDesc: false },
      })
    );
  }, [setSellStatus]);

  useEffect(() => {
    dispatch(
      optionFindAllActions.getFindAll({
        data: { goodGroupId: id, isDesc: false },
      })
    );
    return () => {
      dispatch(optionFindAllActions.reset({}));
    };
  }, []);

  const goodsGroupOptionColumns: ColumnsType[] = [
    {
      title: "옵션명",
      dataIndex: "name",
    },
    {
      title: "가격",
      dataIndex: "price",
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
            vendorId: user.vendorId,
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
    <GoodsGroupOption
      optionList={optionList}
      goodsGroupOptionColumns={goodsGroupOptionColumns}
    />
  );
};

export default GoodsGroupOptionContainer;
