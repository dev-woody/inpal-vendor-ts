import { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";

import { propsTypes } from "types/globalTypes";
import { ErrorMsg } from "./globalStyles";
import { BiChevronDown } from "react-icons/bi";
import { ErrorMessage } from "@hookform/error-message";

type styledSelectTyps = {
  isOpen?: boolean;
  status?: any;
  isheight?: any;
  fullWidth?: boolean;
  disable?: any;
};

type formProps = {
  fullWidth?: any;
  align?: string;
};

const SelectBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  /* z-index: 100; */
  min-width: 200px;
  user-select: none;

  & * {
    font-size: 0.75rem;
  }

  ${(props: formProps) =>
    props.fullWidth &&
    css`
      width: 100% !important;
    `}

  ${(props: formProps) =>
    props.align === "vertical" &&
    css`
      flex-direction: row;
    `}

    & + & {
    margin-left: 0.5rem;
  }
`;

const SelectedBlock = styled.div`
  box-sizing: border-box;
  color: #737373;
  background-color: #fff;
  width: 100%;
  min-width: 200px;
  border: 1px solid #d9d9d9;
  border-radius: 0.75rem;
  padding: 0.375rem 0.75rem;
  display: flex;
  justify-content: space-between;
  transition: 0s;
  margin: 0.25rem 0;

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
    props.disable &&
    css`
      border: 1px solid #d9d9d9 !important;
      box-shadow: 0 0 0 0 !important;
      color: #d9d9d9 !important;
      background-color: #f9f9f9;

      &:hover {
        cursor: not-allowed !important;
      }
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
  z-index: 100;
`;

const OptionTitle = styled.div`
  flex-grow: 1;
`;

const OptionMenuList = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0;
  height: 0;
  opacity: 0;
  transition: 0.2s;
  min-width: 200px;
  overflow: hidden;
  margin: 0;

  ${(props: styledSelectTyps) =>
    props.isOpen &&
    css`
      height: ${props.isheight};
      opacity: 100;
    `};

  ${(props: styledSelectTyps) =>
    props.fullWidth &&
    css`
      width: 100% !important;
    `}
`;

const OptionItemList = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 0.75rem;
  width: 100%;
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
  text-align: start;
`;

const MultipleItem = styled.div`
  background-color: #faad14;
  color: #fff;
  padding: 0 0.5rem;
  border-radius: 0.25rem;

  & + & {
    margin-left: 0.125rem;
  }
`;

export const StyledSelect = (props: propsTypes) => {
  const {
    placeholder,
    fullWidth,
    optionList,
    isDepth,
    actions,
    register,
    label,
    multiple,
    setValue,
    getValues,
    errors,
    status,
    index,
    align,
    disable,
    ...rest
  } = props;
  //todo 중복선택 방지
  const [isOpen, setIsOpen] = useState(false);
  const [isTitle, setIsTitle] = useState<string>("");
  const [isheight, setIsHeight] = useState<any>(0);
  const [isMultiple, setIsMultiple] = useState<{ [key: string]: string }[]>([]);
  const newList = isMultiple.map((item) => item.id);
  const ref: any = useRef();
  const selectMenu: any = useRef();
  const OptionItems = ({ keyName, id }: { keyName: string; id: string }) => {
    const onClick = () => {
      setIsOpen(false);
      if (id !== "") {
        setIsTitle(keyName);
        if (actions) {
          actions(id);
        }
        if (label && multiple) {
          const newArray = JSON.parse(JSON.stringify(isMultiple));
          newArray.push({ id: id, keyName: keyName });
          const selectedItemInfos = newArray.map(
            (selectedItemInfo: any, index: number) => {
              return { id: selectedItemInfo.id, num: index };
            }
          );
          setIsMultiple(newArray);
          setValue(label, selectedItemInfos);
        } else if (label) {
          setValue(label, id);
        }
      }
    };
    return (
      <OptionMenu onClick={onClick}>
        <OptionLabel>
          <OptionsLabelText className="hoverColor">{keyName}</OptionsLabelText>
        </OptionLabel>
      </OptionMenu>
    );
  };

  const onMultipleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.currentTarget;
    setIsMultiple(isMultiple.filter((list) => list.id !== id.id));
    setIsTitle(placeholder);
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
    <SelectBlock
      ref={selectMenu}
      style={index ? { zIndex: `${index}` } : undefined}
      fullWidth={fullWidth}
      align={align}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
      }}
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
          isOpen={isOpen}
          status={status}
          disable={disable}
          onClick={disable ? undefined : () => setIsOpen(!isOpen)}
        >
          <div style={{ display: "flex" }}>
            {isMultiple.length > 0 ? (
              isMultiple.map((item) => {
                return (
                  <MultipleItem
                    key={item.id}
                    id={item.id}
                    onClick={onMultipleClick}
                  >
                    {item.keyName}
                  </MultipleItem>
                );
              })
            ) : (
              <OptionTitle
                style={placeholder !== isTitle ? { color: "#000" } : undefined}
              >
                {isTitle}
              </OptionTitle>
            )}
          </div>
          <BiChevronDown
            style={
              placeholder !== isTitle
                ? { color: "#000", marginLeft: "1rem" }
                : { marginLeft: "1rem" }
            }
          />
        </SelectedBlock>
        <OptionBlock>
          <OptionMenuList
            isOpen={isOpen}
            isheight={isheight}
            fullWidth={fullWidth}
          >
            <OptionItemList ref={ref}>
              {optionList && optionList.length > 0 ? (
                optionList.length === newList.length ? (
                  <OptionItems
                    key={index}
                    keyName={"데이터가 없습니다."}
                    id=""
                  />
                ) : (
                  optionList.map((list: any, index: number) => {
                    if (!newList.includes(list.id || list.base.id)) {
                      return (
                        <OptionItems
                          key={index}
                          keyName={
                            list.name ||
                            list.desc ||
                            list.info.property ||
                            list.info.nameKr ||
                            list.info.code ||
                            list.info.basic.nameKr
                          }
                          id={list.id || list.base.id}
                        />
                      );
                    }
                  })
                )
              ) : (
                <OptionItems key={index} keyName={"데이터가 없습니다."} id="" />
              )}
            </OptionItemList>
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
  );
};
