import styled from "styled-components";
import {
  BreadCrumb,
  Button,
  Responsive,
  StyledSelect,
  Table,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { deliveryCodeColumns } from "lib/columns/columnsList";
import { useNavigate } from "react-router-dom";
import { response } from "types/globalTypes";

const DeliveryCodeListBlock = styled(Responsive)``;

type codeProps = {
  deliveryCodeList: object[];
  productList: response;
  onSelect: (id: string) => void;
};

const DeliveryCodeList = ({
  deliveryCodeList,
  productList,
  onSelect,
}: codeProps) => {
  const navigate = useNavigate();
  return (
    <>
      <DeliveryCodeListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "배송코드 관리",
                  url: "/dcode/dcode",
                },
              ]}
            />
          }
          extra={
            <Button onClick={() => navigate("/dcode/dcode/register")}>
              배송코드 등록
            </Button>
          }
        />
      </DeliveryCodeListBlock>
      <DeliveryCodeListBlock>
        <Table
          filter
          columns={deliveryCodeColumns}
          content={deliveryCodeList}
          url="/dcode/dcode/detail"
          moveKey={["base", "id"]}
          filterInput={
            <StyledSelect
              placeholder="품목 선택"
              optionList={productList}
              actions={onSelect}
            />
          }
        />
      </DeliveryCodeListBlock>
    </>
  );
};

export default DeliveryCodeList;
