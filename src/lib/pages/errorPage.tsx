import styled from "styled-components";
import { Responsive } from "lib/styles";
import { Link } from "react-router-dom";

const ErrorPageBlock = styled(Responsive)`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const ErrorPage = () => {
  return (
    <ErrorPageBlock>
      <h1 style={{ marginBottom: "0.5rem" }}>Error Page</h1>
      <div style={{ marginBottom: "2rem" }}>not found 404</div>
      <h4>존재하지 않는 페이지입니다. 다른 페이지로 이동해주세요.</h4>
      <Link to="/">홈화면으로 이동하기</Link>
    </ErrorPageBlock>
  );
};

export default ErrorPage;
