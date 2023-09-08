import { ErrorMessage } from "@hookform/error-message";
import { useRef } from "react";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import styled, { css } from "styled-components";
import { ErrorMsg } from "./globalStyles";

type checkboxProps = {
  category: any;
  newCategory?: { [key: string]: any }[];
  setNewCategory: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: any;
      }[]
    >
  >;
  style?: any;
};

type categoryProps = {
  disable: any;
  label: string;
  align?: string;
  register: any;
  status: any;
  errors: any;
  newCategory?: { [ket: string]: any }[];
  setNewCategory: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: any;
      }[]
    >
  >;
};

type formProps = {
  fullWidth?: boolean;
  disable?: boolean;
  status?: string;
};

const DescriptionBlock = styled.div`
  margin: 0.25rem 0;
  font-size: 0.875rem;

  & + & {
    margin-left: 0.25rem;
  }
`;

const CheckboxCategoryBlock = styled.div`
width: inherit;
`


const FormItem = styled.div`
    margin: 0.25rem 0;
  padding: 0.75rem;
  width: inherit;
  color: rgba(0, 0, 0, 0.88);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 0.75rem;
  box-sizing: border-box;
  * {
    transition: none;
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
      background-color: #f9f9f9;

      * {
        color: #d9d9d9 !important;
      }

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
`;

const CheckboxBlock = styled.div`
  padding: 0.5rem 0;
  min-width: 200px;
  /* border: 1px solid red; */
  //! 구분선 추가할지 결정할 것.
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  width: inherit;
  &:hover {
    cursor: pointer;
  }
`;

const CheckboxText = styled.div`
  margin-left: 0.5rem;
  font-size: 0.75rem;
`;

const Title = styled.div`
  min-width: 200px;
  flex-grow: 1;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const LineFlex = styled.div`
  display: flex;
`;

const ColFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledCheckBox = ({
  category,
  newCategory,
  setNewCategory,
  style,
}: checkboxProps) => {
  const onClick = () => {
    category.checked = !category.checked;
    if (category.category2nd && !category.checked) {
      category.category2nd.map((list2nd: any) => {
        list2nd.checked = false;
        list2nd.category3rd?.map((list3rd: any) => {
          list3rd.checked = false;
        });
      });
    } else if (category.category3rd && !category.checked) {
      category.category3rd?.map((list3rd: any) => {
        list3rd.checked = false;
      });
    }
    if (category.category2ndId && category.checked) {
      newCategory &&
        newCategory.map((list1st: any) => {
          list1st.category2nd.map((list2nd: any) => {
            if (list2nd.id === category.category2ndId) {
              list1st.checked = true;
              list2nd.checked = true;
            }
          });
        });
    } else if (category.category1stId && category.checked) {
      newCategory &&
        newCategory.map((list1st: any) => {
          if (list1st.id === category.category1stId) {
            list1st.checked = true;
          }
        });
    }
    newCategory && setNewCategory(newCategory);
  };

  return (
    <CheckboxBlock style={style}>
      <CheckboxLabel htmlFor="checkBox" onClick={onClick}>
        {category.checked ? (
          <BiCheckboxChecked color="#faad14" />
        ) : (
          <BiCheckbox />
        )}
        <CheckboxText>{category.description}</CheckboxText>
      </CheckboxLabel>
    </CheckboxBlock>
  );
};

export const StyledCategory = ({
  disable,
  label,
  register,
  status,
  newCategory,
  errors,
  align,
  setNewCategory,
}: categoryProps) => {
  const titleWidth = useRef<HTMLDivElement>(null);
  const title1stWidth = titleWidth.current?.offsetWidth

  const DivideDepth = () => <DescriptionBlock>{">"}</DescriptionBlock>;

  function createDescriptionElement(category: any) {
    const descriptionElements = [];

    if (category.checked) {
      if (category.category2nd?.some((item: any) => item.checked)) {
        category.category2nd.forEach((secondItem: any) => {
          if (secondItem.checked) {
            if (
              secondItem.category3rd?.some((subItem: any) => subItem.checked)
            ) {
              category.category2nd?.forEach((secondItem: any) => {
                secondItem.category3rd?.forEach((thirdItem: any) => {
                  if (thirdItem.checked) {
                    descriptionElements.push(
                      <div
                        key={
                          category.description +
                          secondItem.description +
                          thirdItem.description
                        }
                        style={{ display: "flex" }}
                      >
                        <DescriptionBlock>
                          {category.description}
                        </DescriptionBlock>
                        <DivideDepth />
                        <DescriptionBlock>
                          {secondItem.description}
                        </DescriptionBlock>
                        <DivideDepth />
                        <DescriptionBlock>
                          {thirdItem.description}
                        </DescriptionBlock>
                      </div>
                    );
                  }
                });
              });
            } else {
              descriptionElements.push(
                <div
                  key={category.description + secondItem.description}
                  style={{ display: "flex" }}
                >
                  <DescriptionBlock>{category.description}</DescriptionBlock>
                  <DivideDepth />
                  <DescriptionBlock>{secondItem.description}</DescriptionBlock>
                </div>
              );
            }
          }
        });
      } else {
        descriptionElements.push(
          <div key={category.description}>
            <DescriptionBlock>{category.description}</DescriptionBlock>
          </div>
        );
      }
    }

    return descriptionElements;
  }

  const DisplayDescription = () => {
    const renderDescription = newCategory?.map((categorys: any) => {
      return (
        <div key={categorys.description} style={{ marginTop: "0.5rem" }}>
          {createDescriptionElement(categorys)}
        </div>
      );
    });
    return typeof renderDescription === "object" ? <>{renderDescription}</> : <></>
  };

  return (
    <CheckboxCategoryBlock>
      <FormItem status={status} disable={disable}>
        <input
          type="text"
          style={{ display: "none" }}
          disabled={true}
          autoComplete="off"
          {...register(label)}
        />
        <div style={{ display: "flex", width: "inherit" }}>
          <Title ref={titleWidth}>1차 품목분류</Title>
          <Title>2차 품목분류</Title>
          <Title>3차 품목분류</Title>
        </div>
        <ColFlex>
          {newCategory?.map((c1st, index) => (
            <LineFlex key={index} >
              <StyledCheckBox
                category={c1st}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                style={{width: `${title1stWidth}px`}}
              />
              <ColFlex>
                {c1st.category2nd?.map((c2nd: any, index: number) => (
                  <LineFlex key={index}>
                    <StyledCheckBox
                      category={c2nd}
                      newCategory={newCategory}
                      setNewCategory={setNewCategory}
                      style={{width: `${title1stWidth}px`}}
                    />
                    <ColFlex>
                      {c2nd.category3rd?.map((c3rd: any, index: number) => (
                        <LineFlex key={index}>
                          <StyledCheckBox
                            category={c3rd}
                            newCategory={newCategory}
                            setNewCategory={setNewCategory}
                            style={{width: `${title1stWidth}px`}}
                          />
                        </LineFlex>
                      ))}
                    </ColFlex>
                  </LineFlex>
                ))}
              </ColFlex>
            </LineFlex>
          ))}
        </ColFlex>
      </FormItem>
      <DisplayDescription/>
      {errors && (
        <ErrorMessage
          errors={errors}
          name={label}
          render={({ message }) => (
            <ErrorMsg align={align}>{message ? message : "\u00A0"}</ErrorMsg>
          )}
        />
      )}
    </CheckboxCategoryBlock>
  );
};

export const CheckBox = ({
  isChecked,
  onClick,
}: {
  isChecked: boolean;
  onClick: (data: any) => void;
}) => {
  return isChecked ? (
    <FaCheckSquare onClick={onClick} />
  ) : (
    <FaRegSquare onClick={onClick} />
  );
};
