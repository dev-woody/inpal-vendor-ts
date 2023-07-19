import { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";

import { propsTypes } from "types/globalTypes";
import { ErrorMsg } from "./globalStyles";
import { Button } from "./buttonStyles";
import { AiOutlineClockCircle } from "react-icons/ai";
import { ErrorMessage } from "@hookform/error-message";

const hour: { name: string; id: string }[] = [];
const minute: { name: string; id: string }[] = [];
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    hour.push({ name: `0${i}`, id: `0${i}` });
  } else {
    hour.push({ name: `${i}`, id: `${i}` });
  }
}
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    minute.push({ name: `0${i}`, id: `0${i}` });
  } else {
    minute.push({ name: `${i}`, id: `${i}` });
  }
}

type styledSelectTyps = {
  isOpen?: boolean;
  status?: any;
  isheight?: any;
};

type formProps = {
  fullWidth?: any;
  disable?: any;
  align?: string;
};

const SelectBlock = styled.div`
  position: relative;
  z-index: 10;
  width: 200px;
  user-select: none;

  ${(props: formProps) =>
    props.fullWidth &&
    css`
      width: 100% !important;
    `};
`;

const SelectedBlock = styled.div`
  background-color: #fff;
  color: #737373;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 0.75rem;
  padding: 0.375rem 0.75rem;
  display: flex;
  justify-content: space-between;
  transition: 0s;

  &:hover {
    border: 1px solid #faad14;
    box-shadow: 0 0 0 2px rgb(250 173 20 / 10%);
    cursor: pointer;
  }

  ${(props: styledSelectTyps) =>
    props.isOpen &&
    css`
      border: 1px solid #faad14;
      color: #d9d9d9;
    `}

  ${(props: styledSelectTyps) =>
    props.status &&
    css`
      border: 1px solid #ff4d4f !important;
      box-shadow: 0 0 0 2px rgb(255 77 79 / 10%) !important;
      border-inline-end-width: 1px;
      outline: 0;
    `}
`;

const OptionBlock = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 200px;
  z-index: 100;
`;

const OptionTitle = styled.div`
  flex-grow: 1;
  font-size: 0.75rem;
`;

const OptionMenuList = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0;
  height: 0;
  opacity: 0;
  transition: 0.5s;
  width: 200px;
  overflow: hidden;

  ${(props: styledSelectTyps) =>
    props.isOpen &&
    css`
      height: ${props.isheight};
      opacity: 100;
      overflow: visible;
    `};
`;

const MenuBox = styled.div`
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 0.75rem;
  overflow: hidden;
`;

const OptionItemList = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  width: 200px;
  height: 200px;
  overflow: scroll;

  & + & {
    border-left: 1px solid #d9d9d9;
  }
`;

const OptionMenu = styled.div`
  box-sizing: border-box;
  & + & {
    border-top: 1px dashed #d9d9d9;
  }
`;

const OptionLabel = styled.div`
  padding: 0 0.5rem;
  border-radius: 0.75rem;
  &:hover {
    & > div.hoverColor {
      background-color: rgb(250 173 20 / 60%) !important;
      cursor: pointer;
    }

    & > div.isSubMenu {
      display: block !important;
    }
  }
`;

const OptionsLabelText = styled.div`
  box-sizing: border-box;
  border-radius: 0.75rem;
  margin: 0.2rem 0;
  padding: 0.5rem 0.5rem;
  font-size: 0.875rem;
`;

export const StyledTimePicker = (props: propsTypes) => {
  const {
    placeholder,
    fullWidth,
    optionList,
    isDepth,
    register,
    label,
    setValue,
    getValues,
    errorMsg,
    status,
    index,
    align,
    errors,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isTitle, setIsTitle] = useState<string>("");
  const [isheight, setIsHeight] = useState<string>("");
  const [isHour, setIsHoure] = useState("");
  const [isMinute, setIsMinute] = useState("");
  const ref: any = useRef();
  const selectMenu: any = useRef();
  const onClick = () => {
    setIsOpen(false);
    setValue(label, isHour + isMinute);
  };

  useEffect(() => {
    function handleClickOutside(e: any): void {
      if (selectMenu.current && !selectMenu.current.contains(e.target)) {
        e.stopPropagation();
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectMenu]);

  useEffect(() => {
    if (!getValues) {
      setIsTitle(placeholder);
    }
  }, [placeholder, getValues]);

  useEffect(() => {
    const optionHeight = ref.current.getBoundingClientRect().height;
    setIsHeight(optionHeight + "px");
  }, [optionList]);

  return (
    <div style={{ padding: "0.25rem 0" }}>
      <SelectBlock
        ref={selectMenu}
        style={{ zIndex: `${index}` }}
        fullWidth={fullWidth}
        align={align}
      >
        {label && (
          <input
            style={{ display: "none" }}
            readOnly
            status={status}
            {...rest}
            {...register(label)}
          />
        )}
        <div>
          <SelectedBlock
            onClick={() => setIsOpen(!isOpen)}
            isOpen={isOpen}
            status={status}
          >
            <OptionTitle>{isTitle}</OptionTitle>
            <AiOutlineClockCircle style={{ marginLeft: "1rem" }} />
          </SelectedBlock>
          <OptionBlock>
            <OptionMenuList isOpen={isOpen} isheight={isheight}>
              <MenuBox style={{ backgroundColor: "#fff" }}>
                <div
                  style={{ display: "flex", borderBottom: "1px solid #d9d9d9" }}
                >
                  <OptionItemList ref={ref}>
                    {hour?.map((list: any, index: number) => (
                      <OptionMenu
                        key={index}
                        onClick={() => {
                          setIsHoure(list.id);
                          setIsTitle(list.id + ":" + isMinute);
                        }}
                      >
                        <OptionLabel>
                          <OptionsLabelText className="hoverColor">
                            {list.name}
                          </OptionsLabelText>
                        </OptionLabel>
                      </OptionMenu>
                    ))}
                  </OptionItemList>
                  <OptionItemList>
                    {minute?.map((list: any, index: number) => (
                      <OptionMenu
                        key={index}
                        onClick={() => {
                          setIsMinute(list.id);
                          setIsTitle(isHour + ":" + list.id);
                        }}
                      >
                        <OptionLabel>
                          <OptionsLabelText className="hoverColor">
                            {list.name}
                          </OptionsLabelText>
                        </OptionLabel>
                      </OptionMenu>
                    ))}
                  </OptionItemList>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    style={{
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.5rem",
                      margin: "0.25rem 0.5rem",
                    }}
                    type="button"
                    onClick={onClick}
                  >
                    선택
                  </Button>
                </div>
              </MenuBox>
            </OptionMenuList>
          </OptionBlock>
        </div>
        {errors && (
          <ErrorMessage
            errors={errors}
            name={label}
            render={({ message }) => (
              <ErrorMsg align={align}>{message ? message : "\u00A0"}</ErrorMsg>
            )}
          />
        )}
      </SelectBlock>
    </div>
  );
};
