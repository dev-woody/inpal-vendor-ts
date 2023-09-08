import { client } from "api/createAPI";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { propsTypes } from "types/globalTypes";
import { ErrorMsg } from "./globalStyles";
import { BiTrash } from "react-icons/bi";
import { ErrorMessage } from "@hookform/error-message";
import Loading from "loading.gif"

type formProps = {
  fullWidth?: boolean;
  disable?: boolean;
  status?: string;
};
/* #region style */
export const Label = styled.label`
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #d9d9d9;
  color: #000;
  background-color: #fff;
  box-sizing: border-box;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  overflow: hidden !important;

  ${(props: { status?: string }) =>
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

  &:hover {
    /* border: 1px solid #faad14; */
    /* box-shadow: 0 0 0 2px rgb(250 173 20 / 10%); */
    color: inherit;
    cursor: inherit;
  }
`;

const BoxBlock = styled.div`
margin: 0.25rem 0;
* {
  transition: none;
}
  ${(props: formProps) =>
    props.fullWidth &&
    css`
      width: 100% !important;
    `}
  & + & {
    margin-left: 0.75rem;
  }
`;

const FormItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  padding: 0.375rem 12px;
  color: rgba(0, 0, 0, 0.88);
  font-size: 0.75rem;
  line-height: 1.5;
  list-style: none;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 0.75rem;
  transition: all 0.2s;
  box-sizing: border-box;
  overflow: hidden;

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

  &:hover {
    border: 1px solid #faad14;
    box-shadow: 0 0 0 2px rgb(250 173 20 / 10%);
      color: #faad14;
      cursor: pointer;
  }

  & + & {
    margin-top: 2rem;
  }
`;

const StyledInputBlock = styled.input`
  align-self: center;
  border: 0 !important;
  font-size: 0.75rem;
  background-color: inherit;
  margin: 0;

  color: inherit;
  cursor: inherit;
  &:focus-visible {
    border: none;
    outline: none;
  }
`;

const DeleteBlock = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);

  &:hover {
    color: #faad14;
    cursor: pointer;
  }

  .icon {
    box-sizing: border-box;
    transition: 0.1s;
    &:hover {
      color: #faad14;
      cursor: pointer;
    }
  }
`;
/* #endregion */

const ImageArray = ({
  isSrc,
  align,
  setIsSrc,
}: {
  isSrc: { imageId: string }[];
  align: string;
  setIsSrc: React.Dispatch<React.SetStateAction<{ imageId: string }[]>>;
}) => {
  return (
    <>
      {isSrc.length > 0 &&
        isSrc?.map((imageSrc: { imageId: string }, index: number) => {
          return (
            <BoxBlock
              key={index}
              style={{
                width: "100px",
                justifyContent: "start",
              }}
            >
              <Label
                style={{
                  position: "relative",
                  padding: "0.5rem",
                  width: "100px",
                  height: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "400",
                  fontSize: "0.75rem",
                }}
              >
                <img
                  src={`http://49.247.31.111:8080/api/v000/common/image/display?id=${imageSrc.imageId}&isThumbnail=true`}
                  style={{ width: "100%", WebkitFilter: "blur(1px)" }}
                />
                <DeleteBlock
                  onClick={() => {
                    const deleteImageList = isSrc;
                    setIsSrc(
                      deleteImageList.filter(
                        (imageList) => imageList.imageId !== imageSrc.imageId
                      )
                    );
                  }}
                >
                  <BiTrash className="icon" />
                </DeleteBlock>
              </Label>
            </BoxBlock>
          );
        })}
    </>
  );
};

export const StyledUpload = (props: propsTypes) => {
  const [isSrc, setIsSrc] = useState<{ imageId: string }[]>([]);
  const [isErrorMsg, setIsErrorMsg] = useState<string>("");
  const [isRequest, setIsRequest] = useState<boolean>(false)
  const {
    fullWidth,
    label,
    register,
    errors,
    status,
    disable,
    action,
    image,
    deleteImage,
    subject,
    type,
    align,
    isBox,
    maxLength,
    num,
    params,
    isThumbnailImage,
    successAction,
    ...rest
  } = props;
  //todo 이미지 등록
  const onImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    subject: string,
    type: string
  ) => {
    setIsErrorMsg("");
    setIsRequest(true);
    const files = e.target.files ? e.target.files : "";
    await client
      .post(
        `/common/image/upload`,
        { image: files[0], subject, type },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setIsRequest(false)
          e.target.value = "";
          let newSrcList = [...isSrc];
          newSrcList?.push({ imageId: res.data.data.base.id });
          setIsSrc(newSrcList);
        } else {
          setIsRequest(false)
          setIsErrorMsg("이미지 용량이 너무 큽니다.");
        }
      });
  };
  useEffect(() => {
    if (isThumbnailImage) {
      setIsSrc(isThumbnailImage);
    }
  }, [isThumbnailImage]);

  useEffect(() => {
    if (isSrc.length > 0) {
      successAction(isSrc);
    }
  }, [isSrc]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {isSrc?.length < maxLength ? (
          isBox ? (
            <BoxBlock
              fullWidth
              style={{
                padding: "0",
                display: "flex",
              }}
            >
              <FormItem
                fullWidth={fullWidth}
                disable={isRequest}
                status={status}
                style={{
                  width: "100px",
                  height: "100px",
                  fontWeight: "400",
                  fontSize: "2rem",
                  padding: "0",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  disabled={isRequest}
                  id={type}
                  {...rest}
                  autoComplete="off"
                  onChange={(e) => onImageUpload(e, subject, type)}
                />
                <Label
                  htmlFor={type}
                  style={{
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "400",
                    fontSize: "2rem",
                    border: "0",
                    color: "inherit"
                  }}
                >
                  {isRequest ? <img src={Loading} style={{width: "inherit"}} />: "+"}
                </Label>
              </FormItem>
            </BoxBlock>
          ) : (
            <BoxBlock>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0.25rem 0",
                }}
              >
                <FormItem fullWidth>
                  <StyledInputBlock
                    disabled={disable}
                    {...rest}
                    value={isSrc[0].imageId}
                  />
                </FormItem>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  disabled={disable}
                  id={type}
                  {...rest}
                  autoComplete="off"
                  onChange={(e) => {
                    action(e, subject, type);
                  }}
                />
                <Label
                  status="primary"
                  htmlFor={type}
                  style={{ marginLeft: "0.25rem", minWidth: "60px" }}
                >
                  등록
                </Label>
              </div>
            </BoxBlock>
          )
        ) : null}

        <ImageArray isSrc={isSrc} align={align} setIsSrc={setIsSrc} />
      </div>
      {(errors || isErrorMsg) && (
        <ErrorMessage
          errors={errors}
          name={label}
          render={({ message }) => (
            <ErrorMsg align={align}>{message || isErrorMsg}</ErrorMsg>
          )}
        />
      )}
    </div>
  );
};
