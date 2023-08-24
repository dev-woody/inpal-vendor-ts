import styled from "styled-components";
import { BreadCrumb, Button, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { response } from "types/globalTypes";

const GoodsGorupListBlock = styled(Responsive)``;

type listProps = {
  goodsGroupList: response;
  countGroup: response;
  goodsGroupColumns: ColumnsType[];
};

const GoodsGorupList = ({
  goodsGroupList,
  countGroup,
  goodsGroupColumns,
}: listProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(searchParams.get("pageNum") || "0");
  const { isDesc } = JSON.parse(
    sessionStorage.getItem("groupPageInfo") || "{}"
  );
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
          searchParams={searchParams}
          setSearchParams={(page: number) =>
            setSearchParams({
              pageNum: String(newPageNum + page),
              isDesc: isDesc,
            })
          }
          moveKey={["base", "id"]}
          pagenation
          pageCount={countGroup.data}
        />
      </GoodsGorupListBlock>
    </>
  );
};

export default GoodsGorupList;
