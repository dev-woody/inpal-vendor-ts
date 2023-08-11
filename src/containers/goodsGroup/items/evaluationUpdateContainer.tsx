import EvaluationUpdate from "components/goodsGroup/items/evaluationUpdata";
import { ColumnsType } from "lib/columns/columnsList";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorGoodsEvaluationActions } from "reducers/goodsGroup/vendorGoodsEvaluation";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const EvaluationUpdateContainer = ({
  evaluationSummary,
}: {
  evaluationSummary: any;
}) => {
  const { user, evaluationList } = useAppSelector((store) => ({
    user: store.user,
    evaluationList: store.vendorGoodsEvaluation.findByGoodItemId,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, itemId } = useParams();

  useEffect(() => {
    dispatch(
      vendorGoodsEvaluationActions.findByGoodItemId({
        goodItemId: evaluationSummary?.vendorGoodItemId,
        isDesc: true,
      })
    );
  }, [evaluationSummary]);

  const evaluationColumn: ColumnsType[] = [
    {
      title: "번호",
      dataIndex: "",
      render: (_, __, index) => index,
    },
    {
      title: "번호",
      dataIndex: "",
      render: (_, __, index) => index,
    },
    {
      title: "작성자 아이디",
      dataIndex: "info",
      render: (info) => info.clientUserId,
    },
    {
      title: "작성자 타입",
      dataIndex: "info",
      render: (info) => info.clientType,
    },
    {
      title: "평점",
      dataIndex: "info",
      render: (info) => info.score + "점",
    },
  ];

  return (
    <EvaluationUpdate
      evaluationSummary={evaluationSummary}
      evaluationList={evaluationList}
      evaluationColumn={evaluationColumn}
    />
  );
};

export default EvaluationUpdateContainer;
