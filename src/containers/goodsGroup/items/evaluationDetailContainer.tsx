import EvaluationDetail from "components/goodsGroup/items/evaluationDetail";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vendorGoodsEvaluationActions } from "reducers/goodsGroup/vendorGoodsEvaluation";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const EvaluationDetailContainer = () => {
  const { user, findById } = useAppSelector((store) => ({
    user: store.user,
    findById: store.vendorGoodsEvaluation.findById,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { evaluationId } = useParams();

  useEffect(() => {
    dispatch(vendorGoodsEvaluationActions.findById(evaluationId));
  }, []);

  return <EvaluationDetail evaluationInfo={findById} navigate={navigate} />;
};

export default EvaluationDetailContainer;
