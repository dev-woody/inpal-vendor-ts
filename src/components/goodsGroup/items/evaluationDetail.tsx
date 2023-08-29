import styled from "styled-components";
import {
  BreadCrumb,
  Button,
  Description,
  DescriptionContent,
  Responsive,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import { NavigateFunction, useParams } from "react-router-dom";

type EvaluationDetailProps = {
  evaluationInfo: response;
  navigate: NavigateFunction;
};

const EvaluationDetailBlock = styled(Responsive)``;

const EvaluationDetail = ({
  evaluationInfo,
  navigate,
}: EvaluationDetailProps) => {
  const { id, itemId, evaluationId } = useParams();
  const { n, d } = JSON.parse(sessionStorage.getItem("groupPageInfo") || "{}");

  return (
    <>
      <EvaluationDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹관리 /",
                  url: `/goods/groups?n=${n}&d=${d}`,
                },
                {
                  name: "상세정보 및 수정 /",
                  url: `/goods/groups/detail/${id}`,
                },
                {
                  name: "아이템 상세정보 /",
                  url: `/goods/groups/detail/${id}/items/${itemId}`,
                },
                {
                  name: "리뷰 상세정보",
                  url: `/goods/groups/detail/${id}/items/${itemId}/${evaluationId}`,
                },
              ]}
            />
          }
        />
      </EvaluationDetailBlock>
      <EvaluationDetailBlock>
        <Description style={{ marginBottom: "1rem" }}>
          <DescriptionContent
            label="작성자 아이디"
            content={evaluationInfo?.data?.info?.clientUserId}
          />
          <DescriptionContent
            label="평점"
            content={evaluationInfo?.data?.info?.score + "점"}
          />
          <DescriptionContent
            span="12"
            label="작성 내용"
            content={evaluationInfo?.data?.info?.description}
          />
        </Description>

        <Button
          type="button"
          onClick={() => navigate(`/goods/groups/detail/${id}/items/${itemId}`)}
          withInput
        >
          뒤로가기
        </Button>
      </EvaluationDetailBlock>
    </>
  );
};

export default EvaluationDetail;
