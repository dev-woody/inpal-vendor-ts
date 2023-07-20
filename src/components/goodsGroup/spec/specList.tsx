import styled from "styled-components";
import {
  BreadCrumb,
  Button,
  Responsive,
  StyledSelect,
  Table,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import { specColunms } from "lib/columns/columnsList";
import { NavigateFunction } from "react-router-dom";

const SpecListBlock = styled(Responsive)``;

type SpecProps = {
  specList: response;
  navigate: NavigateFunction;
};

const SpecList = ({ specList, navigate }: SpecProps) => {
  return (
    <>
      <SpecListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품사양 관리",
                  url: "/goods/spec",
                },
              ]}
            />
          }
          extra={
            <Button
              onClick={() => {
                navigate("/goods/spec/register");
              }}
            >
              상품사양 등록
            </Button>
          }
        />
      </SpecListBlock>
      <SpecListBlock>
        <Table
          filter
          columns={specColunms}
          content={specList.data}
          pagenation
          url="/dcode/dcode/detail"
          moveKey={["base", "id"]}
          // filterInput={
          //   <StyledSelect
          //     placeholder="품목 선택"
          //     optionList={productList}
          //     actions={onSelect}
          //   />
          // }
        />
      </SpecListBlock>
    </>
  );
};

export default SpecList;
