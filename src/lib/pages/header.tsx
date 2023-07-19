import styled from "styled-components";
import { Button } from "lib/styles";
import { Link, useNavigate } from "react-router-dom";
import IconLogo from "IconLogo.png";
import LogoTypo from "logo-typo.png";
import { Dispatch, SetStateAction } from "react";
import { FaBars } from "react-icons/fa";

type headerProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const HeaderBlock = styled.div`
  width: 100%;
  height: 80px !important;
  padding: 16px 24px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 98;
  font-size: 0.875rem;
`;

const LogoBlock = styled.div`
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderText = styled.div`
  font-size: 0.875rem;
`;

const HeaderBtn = styled(Link)`
  text-decoration: none;
  color: #000;
  font-weight: 700;
  font-size: 1.5rem;
  display: flex;

  &:hover {
    cursor: pointer;
  }
`;

const SidebarBtn = styled.button`
  border: 0;
  height: 40px;
  width: 40px;
  border-radius: 0.75rem;
  overflow: hidden;
  padding-bottom: 0.25rem;

  &:hover {
    cursor: pointer;
  }
`;

const UserSection = styled.div`
  align-items: center;
  justify-content: flex-end;
  font-size: inherit;
  font-weight: 500;
`;

const Header = ({ visible, setVisible }: headerProps) => {
  const navigate = useNavigate();
  const localStorageGet = localStorage.getItem("user");
  const localData = localStorageGet && JSON.parse(localStorageGet);

  function logout() {
    localStorage.clear();
    navigate("/auth/signIn");
  }

  return (
    <HeaderBlock>
      <LogoBlock>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={IconLogo}
            style={{ maxWidth: "40px", marginRight: "10px" }}
          />
          <img src={LogoTypo} style={{ maxWidth: "100px", height: "auto" }} />
        </Link>
        {localData ? (
          <SidebarBtn onClick={() => setVisible(!visible)}>
            <FaBars />
          </SidebarBtn>
        ) : null}
      </LogoBlock>
      <UserSection>
        {localData && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {localData?.isTopLevel ? (
              <div style={{ display: "flex" }}>
                <HeaderText style={{ fontWeight: "800", color: "#faad14" }}>
                  최고관리자
                </HeaderText>
                <HeaderText style={{ marginLeft: "0.5rem" }}>
                  {localData.signInfo.userId}님 환영합니다.
                </HeaderText>
              </div>
            ) : (
              <HeaderText>{localData.signInfo.userId}님 환영합니다.</HeaderText>
            )}
            <Button style={{ marginLeft: "1rem" }} onClick={logout}>
              로그아웃
            </Button>
          </div>
        )}
      </UserSection>
    </HeaderBlock>
  );
};

export default Header;
