import { useState } from "react";
import styled, { css } from "styled-components";
import { propsTypes } from "types/globalTypes";
import { AlignBox, ErrorMsg } from "./globalStyles";
import { Label } from "./uploadStyles";
import { ErrorMessage } from "@hookform/error-message";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type formProps = {
  fullWidth?: boolean;
  disable?: boolean;
  status?: any;
};

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormItem = styled.span`
  position: relative;
  display: flex;
  /* flex-wrap: wrap; */
  box-sizing: border-box;
  min-width: 200px;
  margin: 0.25rem 0;
  padding: 0.375rem 12px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5;
  list-style: none;
  position: relative;
  min-width: 0;
  background-color: #fff;
  background-image: none;
  border-width: 1px;
  border-style: solid;
  border-color: #d9d9d9;
  border-radius: 0.75rem;
  transition: all 0.2s;
  /* overflow: hidden; */

  * {
    font-size: 0.75rem;
  }

  ${(props: formProps) =>
    props.fullWidth &&
    css`
      width: 100% !important;
    `}

  ${(props: formProps) =>
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

    ${(props: formProps) =>
    props.status &&
    css`
      border: 1px solid #ff4d4f !important;
      box-shadow: 0 0 0 2px rgb(255 77 79 / 10%) !important;
      border-inline-end-width: 1px;
      outline: 0;
    `}

  &:focus-within {
    border-color: #faad14;
    box-shadow: 0 0 0 2px rgb(250 173 20 / 10%);
    border-inline-end-width: 1px;
    outline: 0;
  }

  & + & {
    margin-top: 2rem;
  }
`;

const StyledLabel = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  height: 32px;
  color: rgba(0, 0, 0, 0.88);
  text-align: start;
`;

const FrontIcon = styled.div`
  margin-right: 0.5rem;
`;

const BackIcon = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const StyledInputBlock = styled.input`
  flex-grow: 1;
  border: 0 !important;
  background-color: inherit;
  color: inherit;
  /* cursor: inherit; */
  &:focus-visible {
    border: none;
    outline: none;
  }
`;

const CapsLockBlock = styled.div`
  position: absolute;
  background-color: #fff;
  top: -120%;
  right: -60%;
  border: 1px solid #faad14;
  padding: 0.25rem 1rem;
  border-radius: 0.75rem 0.75rem 0.75rem 0;
  z-index: 1000;
`;

export const PassShowBlock = ({
  isPassShow,
  setIsPassShow,
}: {
  isPassShow: boolean;
  setIsPassShow: (status: boolean) => void;
}) => {
  return isPassShow ? (
    <AiFillEye onClick={() => setIsPassShow(false)} />
  ) : (
    <AiFillEyeInvisible onClick={() => setIsPassShow(true)} />
  );
};

export const StyledInput = (props: propsTypes) => {
  const [isCapslock, setIsCapslock] = useState<boolean>(false);
  const {
    startItem,
    endItem,
    fullWidth,
    label,
    register,
    errors,
    status,
    disable,
    align,
    ...rest
  } = props;

  const passwordKeyPress = (e: KeyboardEvent) => {
    if (e.getModifierState("CapsLock")) {
      setIsCapslock(true);
      return;
    } else {
      setIsCapslock(false);
    }
  };

  return (
    <AlignBox align={align}>
      <FormItem fullWidth={fullWidth} disable={disable} status={status}>
        {startItem && <FrontIcon>{startItem}</FrontIcon>}
        <StyledInputBlock
          disabled={disable}
          {...rest}
          autoComplete="off"
          {...register(label)}
          onKeyPress={label === "password" ? passwordKeyPress : null}
        />
        {endItem && <BackIcon>{endItem}</BackIcon>}
        {label === "password" && isCapslock && (
          <CapsLockBlock>
            CapsLock이
            <br />
            켜져있습니다.
          </CapsLockBlock>
        )}
      </FormItem>
      {errors && (
        <ErrorMessage
          errors={errors}
          name={label}
          render={({ message }) => (
            <ErrorMsg align={align}>{message ? message : "\u00A0"}</ErrorMsg>
          )}
        />
      )}
    </AlignBox>
  );
};

export const StyledSearchInput = (props: propsTypes) => {
  const {
    fullWidth,
    label,
    register,
    errors,
    status,
    disable,
    action,
    align,
    ...rest
  } = props;
  return (
    <AlignBox align={align}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormItem fullWidth status={status}>
          {register ? (
            <StyledInputBlock
              disabled={disable}
              {...rest}
              autoComplete="off"
              {...register(label)}
            />
          ) : (
            <StyledInputBlock disabled={disable} {...rest} autoComplete="off" />
          )}
        </FormItem>
        <Label
          status="primary"
          onClick={action}
          style={{ marginLeft: "0.25rem", minWidth: "60px" }}
        >
          검색
        </Label>
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
    </AlignBox>
  );
};
