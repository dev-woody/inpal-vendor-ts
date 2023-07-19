import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, Outlet, redirect } from "react-router-dom";
import Header from "lib/pages/header";
import Sidebar from "lib/pages/sidebar";

const AppBlock = styled.div`
  height: 100vh;
  background-color: #f5f5f5;
`;

const Content = styled.div`
  height: calc(100vh - 80px);
  width: 100vw;
`;

const HasSidebar = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  overflow-y: hidden;
  width: 100%;
`;

const Section = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: calc(100% - 260px);
  height: calc(100vh - 80px);
  box-sizing: border-box;
  background-color: #fff;
  overflow-y: hidden;
`;

const BorderRadius = styled.div`
  background-color: #eef2f6;
  /* border-radius: 0.75rem 0.75rem 0 0;
  margin-right: 20px; */
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
`;

const Main = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [url, setUrl] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const localStorageGet = localStorage.getItem("user");
  const localData = localStorageGet && JSON.parse(localStorageGet);

  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     navigate("/dashboard");
  //   }
  // }, [location, navigate]);

  useEffect(() => {
    setUrl([location.pathname.split("/")[1], location.pathname.split("/")[2]]);
  }, [location]);
  return (
    <AppBlock>
      {!location.pathname.includes("/auth/signIn") && (
        <Header visible={visible} setVisible={setVisible} />
      )}
      <Content
        style={
          location.pathname.includes("/auth/signIn")
            ? { height: "100vh" }
            : undefined
        }
      >
        <HasSidebar
          style={
            location.pathname.includes("/auth/signIn")
              ? { height: "100vh" }
              : undefined
          }
        >
          {localData && <Sidebar activeUrl={url} visible={visible} />}
          <Section
            //todo 로그인 상태에 따라서 높이 조절 적용했음.
            style={
              localData
                ? { paddingRight: "20px" }
                : location.pathname.includes("/auth/signIn")
                ? { height: "100vh" }
                : undefined
            }
          >
            <BorderRadius
              style={localData && { borderRadius: "0.75rem 0.75rem 0 0" }}
            >
              <Outlet />
            </BorderRadius>
          </Section>
        </HasSidebar>
      </Content>
    </AppBlock>
  );
};

export default Main;
