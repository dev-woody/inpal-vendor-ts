import { sidebarList } from "lib/columns/columnsList";
import styled, { css } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type ItemProps = {
  disable?: boolean;
  isSelect?: boolean;
};

type sideBarProps = {
  visible: boolean;
  activeUrl: string[];
};

const SidebarBlock = styled.div`
  position: relative;
  padding: 0 8px;
  width: 0;
  height: 100%;
  max-height: calc(100vh - 80px);
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #fff;
  box-sizing: border-box;

  ${(props: { visible: boolean }) =>
    props.visible &&
    css`
      padding: 0 16px;
      width: 260px;
    `}
`;

const SidebarOnOff = styled.div`
  width: 100%;
  overflow: hidden;
`;

const MenuGroup = styled.ul<{ itemList: any }>`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #121926;
  width: calc(260px - 2rem);
  height: 42px;
  overflow: hidden;
  transition: 0.5s !important;
  margin: 2px 0;

  &.active {
    /* height: ${(props) => props.itemList}*46px; */
    height: calc(${(props) => props.itemList} * 46px + 42px);
  }
`;

const GroupTitle = styled.div`
  display: flex;
  font-size: 0.875rem;
  font-weight: 700;
  color: #121926;
  padding: 10px 16px;
  border-radius: 0.75rem;
  line-height: 1.5;
  box-sizing: border-box;
  height: 42px;

  &:hover {
    cursor: pointer;
    background-color: #f2bd21;
    color: #fff;
  }
  &.selected {
    background-color: #f2bd21 !important;
    color: #fff;

    & svg {
      color: #fff;
    }
  }

  &.active {
    background-color: #f2bd21 !important;
    color: #fff;

    & svg {
      color: #fff;
    }
  }
`;

const Items = styled.div`
  font-weight: 300;
  text-align: center;
  min-height: 26px;
  color: #364152;
  padding: 10px 16px 10px 24px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: content-box;

  & > div {
    font-size: 0.875rem;
  }

  &:hover {
    cursor: pointer;
    & > div {
      color: #f2bd21;
    }
  }

  ${(props: ItemProps) =>
    props.disable &&
    css`
      color: #d9d9d9 !important;

      &:hover {
        cursor: not-allowed;
        & > div {
          background-color: inherit !important;
          color: #d9d9d9 !important;
        }
      }
    `}

  ${(props: ItemProps) =>
    props.isSelect &&
    css`
      & > div {
        font-weight: bold;
        color: #f2bd21;
      }
      & svg {
        color: #f2bd21;
      }
    `}
`;

const IconBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  margin-right: 20px;
`;

const Sidebar = ({ activeUrl, visible }: sideBarProps) => {
  const navigate = useNavigate();
  const nowURL = window.location.pathname;
  const [isOpen, setIsOpen] = useState<string>();
  const [isSelect, setIsSelect] = useState<string>();
  const mainMenu = window.location.pathname;
  useEffect(() => {
    for (let i = 0; i < sidebarList.length; i++) {
      if (mainMenu.startsWith(sidebarList[i].url)) {
        setIsSelect(sidebarList[i].name);
        setIsOpen(sidebarList[i].name);
      }
    }
  }, [mainMenu]);
  return (
    <SidebarBlock visible={visible}>
      <SidebarOnOff>
        {sidebarList.map((list) => {
          const active = list.name === isOpen ? "active" : "";
          const selected = list.name === isSelect ? "selected" : "";
          return (
            <MenuGroup
              key={list.name}
              className={active}
              itemList={list?.children?.length}
            >
              <GroupTitle
                className={"title " + selected + " " + active}
                onClick={() => {
                  if (isOpen === list.name) {
                    setIsOpen("");
                  } else {
                    setIsOpen(list.name);
                  }
                }}
              >
                {list.name}
              </GroupTitle>
              {list.children?.map((subMenu, index) => {
                const SubMenuUrl = list.url + subMenu.url;
                const urlArray = [
                  SubMenuUrl.split("/")[1],
                  SubMenuUrl.split("/")[2],
                ];
                if (subMenu?.disable) {
                  return (
                    <Items key={index} disable={subMenu.disable}>
                      {subMenu.icon ? (
                        <IconBlock>{subMenu.icon}</IconBlock>
                      ) : null}
                      <div>{subMenu.menuName}</div>
                    </Items>
                  );
                } else
                  return (
                    <Items
                      key={index}
                      onClick={() => {
                        if (nowURL === `${list.url}${subMenu.url}`) {
                          navigate(`${list.url}${subMenu.url}`);
                          navigate(0);
                        } else {
                          navigate(`${list.url}${subMenu.url}`);
                        }
                      }}
                      isSelect={
                        activeUrl[0] === urlArray[0] &&
                        activeUrl[1] === urlArray[1]
                          ? true
                          : false
                      }
                    >
                      {subMenu.icon ? (
                        <IconBlock>{subMenu.icon}</IconBlock>
                      ) : null}
                      <div style={{ fontSize: "0.75rem" }}>
                        {subMenu.menuName}
                      </div>
                    </Items>
                  );
              })}
              {/* <hr style={{ border: "0.75px solid #e3e8ef" }} /> */}
            </MenuGroup>
          );
        })}
      </SidebarOnOff>
    </SidebarBlock>
  );
};

export default Sidebar;
