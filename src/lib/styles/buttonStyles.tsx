import styled, { css } from "styled-components";

export const primaryColor = "#faad14";

type styledProps = {
  fullWidth?: boolean;
  needMarginTop?: boolean;
  status?: string;
  disable?: boolean;
  withInput?: boolean;
  search?: boolean;
};

export const Button = styled.button`
  & + & {
    margin-left: 0.5rem;
  }

  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid #d9d9d9;
  color: #000;
  background-color: #fff;
  box-sizing: border-box;
  text-align: center;
  font-size: 0.75rem;

  ${(props: styledProps) =>
    props.fullWidth &&
    css`
      width: 100% !important;
    `}

  ${(props: styledProps) =>
    props.needMarginTop &&
    css`
      margin-top: 1rem;
    `}

    ${(props: styledProps) =>
    props.status === "primary" &&
    css`
      background-color: #faad14 !important;
      color: #fff !important;
      border: 0px !important;
      font-weight: 600;

      &:hover {
        border: 0px !important;
        background-color: rgb(250 173 20 / 80%) !important;
      }
    `}

    ${(props: styledProps) =>
    props.withInput &&
    css`
      width: 200px;
    `}

    ${(props: styledProps) =>
    props.search &&
    css`
      min-width: 0;
      width: 65px !important;
      border-radius: 0 0.75rem 0.75rem 0;
    `}

  &:hover {
    border: 1px solid #faad14;
    box-shadow: 0 0 0 2px rgb(250 173 20 / 10%);
    color: #faad14;
    cursor: pointer;
  }

  ${(props: styledProps) =>
    props.disable &&
    css`
      border: 0px !important;
      box-shadow: 0 0 0 0 !important;
      color: #d9d9d9 !important;
      background-color: #f9f9f9 !important;

      &:hover {
        cursor: not-allowed !important;
        background-color: #f9f9f9 !important;
      }
    `}
`;
