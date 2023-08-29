import EvaluationUpdate from "components/goodsGroup/items/evaluationUpdata";
import { ColumnsType } from "lib/columns/columnsList";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { vendorGoodsEvaluationActions } from "reducers/goodsGroup/vendorGoodsEvaluation";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const EvaluationUpdateContainer = ({
  evaluationSummary,
}: {
  evaluationSummary: any;
}) => {
  const { user, evaluationList, countReview } = useAppSelector((store) => ({
    user: store.user,
    evaluationList: store.vendorGoodsEvaluation.findByGoodItemId,
    countReview: store.vendorGoodsEvaluation.countReview,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(vendorGoodsEvaluationActions.countReview(itemId));
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "reviewPageInfo",
      JSON.stringify({
        n: searchParams.get("p"),
        d: searchParams.get("d"),
      })
    );
    dispatch(
      vendorGoodsEvaluationActions.findByGoodItemId({
        goodItemId: evaluationSummary?.vendorGoodItemId,
        page: atob(searchParams.get("n") || btoa("0")),
        isDesc: atob(searchParams.get("d") || btoa("false")),
        size: 10,
      })
    );
  }, [
    evaluationSummary,
    searchParams.get("pageNum"),
    searchParams.get("isDesc"),
  ]);

  useEffect(() => {
    navigate(`?n=${btoa("0")}&d=${btoa("false")}`);
  }, []);

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
      countReview={countReview}
      evaluationColumn={evaluationColumn}
    />
  );
};

export default EvaluationUpdateContainer;
