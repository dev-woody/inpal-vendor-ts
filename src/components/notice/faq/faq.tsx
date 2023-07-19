import styled from "styled-components";
import { BreadCrumb, Button, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { FAQColumns } from "lib/columns/columnsList";
import { useNavigate } from "react-router-dom";
import { response } from "types/globalTypes";

const FaqBlock = styled(Responsive)``;

type listProps = {
  faq?: response;
};

// const Faq = ({ faq }: listProps) => {
const Faq = ({ faq }: listProps) => {
  const navigate = useNavigate();
  return (
    <>
      <FaqBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "FAQ",
                  url: "/notice/faq",
                },
              ]}
            />
          }
          extra={
            <Button onClick={() => navigate("/notice/faq/register")}>
              FAQ 등록
            </Button>
          }
        />
      </FaqBlock>
      <FaqBlock>
        <Table
          columns={FAQColumns}
          // content={faq}
          url="/notice/detail"
          moveKey="id"
          pagenation
          filter
        />
      </FaqBlock>
    </>
  );
};

export default Faq;
