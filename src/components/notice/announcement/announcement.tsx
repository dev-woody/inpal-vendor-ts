import styled from "styled-components";
import { BreadCrumb, Button, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { announcementColumns } from "lib/columns/columnsList";
import { useNavigate } from "react-router-dom";
import { response } from "types/globalTypes";

const AnnouncementBlock = styled(Responsive)``;

type listProps = {
  announcement?: response;
};

// const Announcement = ({ announcement }: listProps) => {
const Announcement = ({ announcement }: listProps) => {
  const navigate = useNavigate();
  return (
    <>
      <AnnouncementBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "공지사항",
                  url: "/notice/announcement",
                },
              ]}
            />
          }
          extra={
            <Button onClick={() => navigate("/notice/announcement/register")}>
              공지사항 등록
            </Button>
          }
        />
      </AnnouncementBlock>
      <AnnouncementBlock>
        <Table
          columns={announcementColumns}
          // content={announcement}
          url="/notice/announcement"
          moveKey="id"
          pagenation
          filter
        />
      </AnnouncementBlock>
    </>
  );
};

export default Announcement;
