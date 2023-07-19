import styled from "styled-components";

type Responsive = {
  [key: string]: any;
};

export const ResponsiveFlex = styled.div`
  display: inline-flex;
  /* align-items: stretch; */
  margin-top: 1.15rem;
  & > div {
    margin-top: 0 !important;
    /* flex-grow: 1; */
  }

  & > div + div {
    margin-left: 1rem;
  }
`;

const ResponsiveBlock = styled.div`
  margin: 0;
  background: #fff;
  padding: 1.125rem;
  box-sizing: border-box;
  border-radius: 0.75rem;
  text-align: left;
  flex-grow: 1;
  box-shadow: 5px 5px 8px 5px #e1e1e1;

  & + & {
    margin-top: 1rem;
  }
`;

export const Responsive = ({ children, ...rest }: Responsive) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};
