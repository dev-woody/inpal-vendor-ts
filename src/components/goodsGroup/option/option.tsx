import styled from "styled-components";
import { Button, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import { ColumnsType } from "lib/columns/columnsList";
import { useNavigate, useParams } from "react-router-dom";

const GoodsGroupOptionBlock = styled(Responsive)``;

type optionProps = {
  optionList: response;
  goodsGroupOptionColumns: ColumnsType[];
};

const GoodsGroupOption = ({
  optionList,
  goodsGroupOptionColumns,
}: optionProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <GoodsGroupOptionBlock>
      <PageHeader
        title="옵션"
        extra={
          <Button onClick={() => navigate("option/register")}>옵션 추가</Button>
        }
      />
      <Table
        columns={goodsGroupOptionColumns}
        content={optionList?.data}
        url={`/goods/groups/detail/${id}/option`}
        moveKey="id"
        pagenation
        filter
      />
    </GoodsGroupOptionBlock>
  );
};

export default GoodsGroupOption;
