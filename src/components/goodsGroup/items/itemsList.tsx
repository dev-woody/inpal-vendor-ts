import styled from "styled-components";
import { Button, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import { NavigateFunction, useParams } from "react-router-dom";
import { ColumnsType } from "lib/columns/columnsList";

const GoodsGroupItemsBlock = styled(Responsive)``;

type optionProps = {
  itemList: response;
  goodsGroupItemsColumns: ColumnsType[];
  navigate: NavigateFunction;
};

const GoodsGroupItems = ({
  itemList,
  goodsGroupItemsColumns,
  navigate,
}: optionProps) => {
  const { id } = useParams();
  return (
    <GoodsGroupItemsBlock>
      <PageHeader
        title="상품 아이템"
        extra={
          <Button onClick={() => navigate("items/register")}>
            아이템 등록
          </Button>
        }
      />
      <Table
        columns={goodsGroupItemsColumns}
        content={itemList.data}
        url={`/goods/groups/detail/${id}/items`}
        moveKey="id"
        pagenation
        filter
      />
    </GoodsGroupItemsBlock>
  );
};

export default GoodsGroupItems;
