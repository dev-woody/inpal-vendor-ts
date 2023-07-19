import styled from "styled-components";
import {
  BreadCrumb,
  Button,
  Responsive,
  StyledSelect,
  Table,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";
import { useNavigate } from "react-router-dom";
import { response } from "types/globalTypes";

const GoodsGorupListBlock = styled(Responsive)``;

type listProps = {
  goodsGroupList: response;
  goodsGroupColumns: ColumnsType[];
};

const GoodsGorupList = ({ goodsGroupList, goodsGroupColumns }: listProps) => {
  const navigate = useNavigate();
  return (
    <>
      <GoodsGorupListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹관리",
                  url: "/goods/groups",
                },
              ]}
            />
          }
          extra={
            <Button onClick={() => navigate("/goods/groups/register")}>
              상품그룹 등록
            </Button>
          }
        />
      </GoodsGorupListBlock>
      <GoodsGorupListBlock>
        <Table
          columns={goodsGroupColumns}
          content={goodsGroupList.data}
          url="/goods/groups/detail"
          moveKey="id"
          pagenation
          filter
          filterInput={
            <>
              <StyledSelect
                placeholder="품목별"
                optionList={[]}
                actions={function () {}}
              />
              <StyledSelect
                placeholder="제조사별"
                optionList={[]}
                actions={function () {}}
              />
            </>
          }
        />
      </GoodsGorupListBlock>
    </>
  );
};

export default GoodsGorupList;
