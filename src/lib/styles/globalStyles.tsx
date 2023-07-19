import styled, { css } from "styled-components";

type propsType = {
  align?: string;
};

export const AlignBox = styled.div`
  display: flex;
  flex-direction: column;
  ${(props: propsType) =>
    props.align === "vertical" &&
    css`
      flex-direction: row;
    `}

  & + & {
    /* margin-left: 1rem; */
  }
`;

export const ErrorMsg = styled.div`
  display: flex;
  align-items: center;
  color: #ff4d4f;
  margin: 0.25rem 0.25rem;
  font-size: 0.75rem;

  ${(props: propsType) =>
    props.align === "vertical" &&
    css`
      margin-left: 1rem;
    `}
`;
