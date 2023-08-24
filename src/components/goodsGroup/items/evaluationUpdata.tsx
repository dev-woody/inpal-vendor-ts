import styled from "styled-components";
import { Description, DescriptionContent, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import { ColumnsType } from "lib/columns/columnsList";
import { useParams } from "react-router-dom";

type EvaluationUpdateProps = {
  evaluationSummary: any;
  evaluationList: response;
  countReview: response;
  evaluationColumn: ColumnsType[];
};

const EvaluationUpdateBlock = styled(Responsive)``;

const EvaluationUpdate = ({
  evaluationSummary,
  evaluationList,
  countReview,
  evaluationColumn,
}: EvaluationUpdateProps) => {
  const { id, itemId } = useParams();

  return (
    <EvaluationUpdateBlock>
      <PageHeader title="리뷰정보" />
      <Description style={{ marginBottom: "1rem" }}>
        <DescriptionContent
          span="12"
          label="리뷰평균(리뷰 수)"
          content={
            evaluationSummary?.evaluationAvg +
            " ( " +
            evaluationSummary?.evaluationCount +
            " ) "
          }
        />
      </Description>
      <PageHeader title="리뷰목록" />
      <Table
        columns={evaluationColumn}
        content={evaluationList?.data?.filter(
          (item: any) => item.info.openStatus === "OPEN"
        )}
        url={`/goods/groups/detail/${id}/items/${itemId}`}
        moveKey={["base", "id"]}
        pagenation
        pageCount={countReview.data}
      />
    </EvaluationUpdateBlock>
  );
};

export default EvaluationUpdate;
