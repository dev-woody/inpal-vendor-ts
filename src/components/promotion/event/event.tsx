import styled from "styled-components";
import { BreadCrumb, Button, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { eventColumns } from "lib/columns/columnsList";
import { useNavigate } from "react-router-dom";
import { response } from "types/globalTypes";

const EventBlock = styled(Responsive)``;

type listProps = {
  event?: response;
};

// const Event = ({ event }: listProps) => {
const Event = ({ event }: listProps) => {
  const navigate = useNavigate();
  return (
    <>
      <EventBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "이벤트",
                  url: "/promotion/event",
                },
              ]}
            />
          }
          extra={
            <Button onClick={() => navigate("/promotion/event/register")}>
              이벤트 등록
            </Button>
          }
        />
      </EventBlock>
      <EventBlock>
        <Table
          columns={eventColumns}
          // content={event}
          url="/promotion/event"
          moveKey="id"
          pagenation
          filter
        />
      </EventBlock>
    </>
  );
};

export default Event;
