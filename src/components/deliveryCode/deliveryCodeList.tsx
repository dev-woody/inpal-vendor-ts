import styled from "styled-components";
import { BreadCrumb, Button, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { deliveryCodeColumns } from "lib/columns/columnsList";
import { useNavigate } from "react-router-dom";

const DeliveryCodeListBlock = styled(Responsive)``;

type codeProps = {
  productList: object[];
};

const DeliveryCodeList = ({ productList }: codeProps) => {
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
          content={productList}
          pagenation
          url="/dcode/dcode/detail"
          moveKey="id"
        />
      </DeliveryCodeListBlock>
    </>
  );
};

export default DeliveryCodeList;
