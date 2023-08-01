import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { ReactElement } from "react";
import { BiChevronLeft } from "react-icons/bi";

const PageHeaderBlock = styled.div`
  box-sizing: border-box;
  margin: 0;
  color: #000;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  padding: 0 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & + * {
    margin-top: 0.75rem !important;
  }
`;

const Area = styled.div`
  display: flex;
  align-items: center;
`;

const TitleSpan = styled.span`
  margin-bottom: 0;
  color: #000000d9;
  font-weight: 600;
  font-size: 1rem;
  line-height: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SubTitleSpan = styled.span`
  margin-left: 12px;
  color: #00000073;
  font-size: 0.75rem;
  line-height: 1.5;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const UndoStyled = styled.div`
  display: flex;
  padding: 0 1rem;

  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizelegibility;

  &:hover {
    cursor: pointer;
    color: #faad14;
  }
`;

const PageHeader = ({
  title,
  subTitle,
  undo,
  url,
  breadCrumb,
  extra,
}: {
  title?: string | ReactElement;
  subTitle?: string | ReactElement;
  undo?: boolean;
  url?: string;
  breadCrumb?: JSX.Element;
  extra?: JSX.Element | boolean;
}) => {
  const navigate = useNavigate();
  return (
    <PageHeaderBlock>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {breadCrumb}
        <Area>
          {undo && (
            <UndoStyled onClick={() => navigate(`${url}`)}>
              <BiChevronLeft />
            </UndoStyled>
          )}
          <TitleSpan>{title}</TitleSpan>
          <SubTitleSpan>{subTitle}</SubTitleSpan>
        </Area>
      </div>
      <Area>{extra}</Area>
    </PageHeaderBlock>
  );
};

export default PageHeader;
