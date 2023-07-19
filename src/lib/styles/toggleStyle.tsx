import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

type toggleProps = {
  data: string;
  openStatus: string;
  action: (data?: any) => void;
};

interface toggleStatus {
  isOpen: boolean;
}

const StyledToggleBlock = styled.div`
  position: relative;
  background-color: #d9d9d9 !important;
  width: 44px;
  min-width: 44px !important;
  min-height: 22px !important;
  border-radius: 22px;
  padding: 2px !important;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.5s;
  /* margin: 0 auto; */

  ${(props: toggleStatus) =>
    props.isOpen &&
    css`
      background-color: #f2bd21 !important;
    `}

  &:hover {
    border: 0px !important;
    background-color: rgb(250 173 20 / 80%) !important;
  }
`;

const ToggleSwitch = styled.div`
  position: absolute;
  top: 2px;
  background-color: #fff !important;
  width: 18px !important;
  height: 18px !important;
  border-radius: 18px;
  padding: 0 !important;
  inset-inline-start: 2px;

  ${(props: toggleStatus) =>
    props.isOpen &&
    css`
      inset-inline-start: calc(100% - 20px);
    `};
`;

const ToggleText = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 7px !important;
`;

export const StyledToggle = ({ data, openStatus, action }: toggleProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    if (data === openStatus) {
      setIsOpen(true);
    } else setIsOpen(false);
  }, [data]);
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    action(data);
  };
  return (
    <StyledToggleBlock isOpen={isOpen} onClick={onClick}>
      <ToggleSwitch isOpen={isOpen} />
    </StyledToggleBlock>
  );
};
