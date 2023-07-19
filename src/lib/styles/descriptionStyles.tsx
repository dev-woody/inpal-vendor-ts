import styled, { css } from "styled-components";

type descriptionProps = {
  span?: string;
};

export const Description = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 0.75rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const DescriptionLabel = styled.div`
  display: flex;
  width: 50%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  text-align: center;

  /* &:nth-child(2n + 1) + & {
    border-left: 1px solid rgba(0, 0, 0, 0.06);
  } */

  &:nth-last-child(2) {
    border: none;
  }

  &:nth-last-child(1) {
    border: none;
  }

  div.des {
    box-sizing: border-box;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }

  div.label {
    background-color: #fafafa;
    width: 200px;
    display: flex;
    justify-content: center;
  }

  div.contants {
    display: flex;
    align-items: center;
    flex-grow: 1;
    text-align: left;
    justify-content: flex-start;
  }

  div.label + div.contants {
    border-left: 1px solid rgba(0, 0, 0, 0.06);
  }

  ${(props: descriptionProps) => {
    switch (props.span) {
      case "12":
        return css`
          width: 100%;
          border-left: 0 !important;

          &:nth-last-child(2) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          }
        `;
      case "3":
        return css`
          width: 25%;
        `;
    }
  }}
`;

export const DescriptionContent = ({
  label,
  content,
  span,
}: {
  label: string;
  content: any;
  span?: string;
}) => {
  return (
    <DescriptionLabel span={span}>
      <div className="label des">
        <div
          style={{
            padding: "0.375rem 0",
            fontSize: "0.875rem",
          }}
        >
          {label}
        </div>
      </div>
      <div className="contants des">{content}</div>
    </DescriptionLabel>
  );
};
