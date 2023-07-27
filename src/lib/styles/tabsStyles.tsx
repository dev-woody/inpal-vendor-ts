import { useState } from "react";
import styled from "styled-components";

type TabsProps = {
  page?: any;
};

const TabsBlock = styled.div`
  * {
    font-size: 0.875rem;
  }
`;

const TabsHead = styled.div`
  padding: 1rem;
  border-bottom: 2px solid #dedede;
  cursor: pointer;

  &.active {
    color: #faad14;
    border-bottom: 2px solid #faad14;
  }

  &:hover {
    color: #faad14;
    border-bottom: 2px solid #faad14;
  }
`;

const Tabs = ({ page }: TabsProps) => {
  const [pageData, setPageData] = useState(page[0].data);
  const [clickedTitle, setClickedTitle] = useState<string>(page[0].title);
  return (
    <TabsBlock>
      <div style={{ display: "flex" }}>
        {page.map((list: any) => (
          <TabsHead
            key={list.title}
            onClick={() => {
              setPageData(list.data);
              setClickedTitle(list.title);
            }}
            className={clickedTitle === list.title ? "active" : ""}
          >
            {list.title}
          </TabsHead>
        ))}
      </div>
      <div style={{ marginTop: "1rem" }}>{pageData}</div>
    </TabsBlock>
  );
};

export default Tabs;
