import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type Props = {
  indicator: {
    name: string;
    url: String;
  }[];
};

const BreadCrumbBlock = styled.div`
  display: flex;

  & div:nth-last-child(1) {
    font-weight: bold;
    color: #333;
  }
`;

const BreadCrumbItem = styled.div`
  font-size: 0.875rem;

  & + & {
    margin-left: 0.5rem;
  }

  &:hover {
    cursor: pointer;
    color: #faad14 !important;
  }
`;

export const BreadCrumb = ({ indicator }: Props) => {
  const navigate = useNavigate();
  return (
    <BreadCrumbBlock>
      {indicator.map((list, index) => (
        <BreadCrumbItem key={index} onClick={() => navigate(`${list.url}`)}>
          {list.name}
        </BreadCrumbItem>
      ))}
    </BreadCrumbBlock>
  );
};
