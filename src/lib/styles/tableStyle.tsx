import styled, { css } from "styled-components";
import { propsTypes } from "types/globalTypes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlignBox } from "./globalStyles";

import { StyledSearchInput } from "./inputStyles";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaRegCaretSquareDown,
  FaRegCaretSquareUp,
  FaRegSquare,
} from "react-icons/fa";
import { CheckBox } from "./checkBoxStyled";

type trProps = {
  isHover?: boolean;
  isSelected?: boolean;
};

type pagenationProps = {
  disabled?: boolean;
  isFocus?: boolean;
};

const FilterBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.825rem;
  margin-bottom: 0.5rem;
`;

const FilterBtn = styled.span`
  margin-left: 0.25rem;
  color: #666;
  transition: 0s;

  &:hover {
    cursor: pointer;
    color: #faad14;
  }
`;

const StyledTableBlock = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  * {
    font-size: 0.75rem;
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  box-sizing: border-box;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  th {
    font-weight: bold;
  }

  th,
  td {
    padding: 0.875rem;
    font-size: 0.75rem;
    box-sizing: border-box;
  }

  td + td,
  th + th {
    border-left: 1px solid rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
  }

  th {
    background-color: #fafafa;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  /* tr:nth-child(2n + 0) {
    background-color: #dadada;
  } */
  tbody tr.category td {
    width: 50% !important;
    height: 46px !important;
  }

  tbody.smallBy3 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }
`;

const RowTable = styled.tr`
  box-sizing: border-box;

  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }

  ${(props: trProps) =>
    props.isSelected &&
    css`
      background-color: #d9d9d9 !important;
    `}

  ${(props: trProps) =>
    props.isHover &&
    css`
      &:hover {
        cursor: pointer;
        /* background-color: #d9d9d9; */
      }
    `}
`;

const PageNationBlock = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: end;
`;

const PageNationSection = styled.div``;

const PageNationButton = styled.button`
  border: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 0.75rem;
  background-color: inherit;

  & + & {
    margin-left: 1rem;
  }

  &:hover {
    background-color: #fafafa;
    cursor: pointer;
  }

  ${(props: pagenationProps) =>
    props.disabled &&
    css`
      border: 0 !important;
      box-shadow: 0 !important;
      color: #d9d9d9 !important;

      &:hover {
        cursor: not-allowed;
        background-color: inherit;
      }
    `}

  ${(props: pagenationProps) =>
    props.isFocus &&
    css`
      border: 1px solid #faad14;
      box-shadow: 0 0 0 2px rgb(250 173 20 / 10%);
      color: #faad14;
    `}
`;

export const Table = (props: propsTypes) => {
  const {
    columns,
    content,
    url,
    moveKey,
    pagenation,
    doNoting,
    action,
    align,
    filter,
    filterInput,
  } = props;
  const navigate = useNavigate();
  const [isDesc, setIsDesc] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [currPage, setCurrPage] = useState(page);
  const [selectedRow, setSelectedRow] = useState<string>("");
  const [allcheck, setAllCheck] = useState<boolean>(false);
  let firstNum = currPage - (currPage % 5) + 1;
  let lastNum = currPage - (currPage % 5) + 5;
  const limit = 10;

  const useSliceData = (posts: any) => {
    const offset = (page - 1) * limit;
    const result = posts?.slice(offset, offset + limit);
    return result;
  };
  const data = useSliceData(content);

  const onClickCheck = () => {
    if (content.length !== 0) {
      data.map((dataList: any) => {
        dataList.isChecked = !allcheck;
      });
      setAllCheck(!allcheck);
    }
  };

  const Pagenation = ({ data }: { data: any }) => {
    const numPages = Math.ceil(data?.length / limit) || 1;
    const dataArray = (dataLength: number) => {
      let data = [];
      for (let i = 0; i < dataLength; i++) {
        data.push({ index: i });
      }
      return data;
    };
    return (
      <PageNationBlock>
        <PageNationButton
          onClick={() => {
            setPage(page - 1);
            setCurrPage(page - 2);
          }}
          disabled={page === 1}
        >
          <FaAngleDoubleLeft />
        </PageNationButton>
        {data ? (
          dataArray(numPages).map((_, i) => {
            return (
              <PageNationButton
                key={i + 1}
                isFocus={page === i + 1 && content.length > limit}
                disabled={content.length <= limit}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </PageNationButton>
            );
          })
        ) : (
          <PageNationButton key={1} disabled={true}>
            {1}
          </PageNationButton>
        )}
        <PageNationButton
          onClick={() => {
            setPage(page + 1);
            setCurrPage(page);
          }}
          disabled={page === numPages}
        >
          <FaAngleDoubleRight />
        </PageNationButton>
      </PageNationBlock>
    );
  };

  useEffect(() => {
    const allListChecked =
      content &&
      content.length !== 0 &&
      data
        .map((dataList: any) => dataList.isChecked)
        .filter((list: boolean) => list === false);
    if (data && allListChecked.length === 0) {
      setAllCheck(true);
    } else setAllCheck(false);
  }, [data]);

  useEffect(() => {
    setSelectedRow("");
  }, [content]);

  return (
    <AlignBox align={align}>
      {filter && (
        <FilterBlock>
          <div style={{ display: "flex" }}>{filterInput}</div>
          <StyledSearchInput />
        </FilterBlock>
      )}
      <StyledTableBlock>
        <StyledTable>
          <thead>
            <tr>
              {columns?.map((list: any, index: number) => (
                <th
                  key={index}
                  style={{ width: (1 / columns.length) * 100 + "%" }}
                >
                  {list.isCheck ? (
                    <div
                      style={{ marginRight: "0.5rem", display: "inline-block" }}
                    >
                      <CheckBox isChecked={allcheck} onClick={onClickCheck} />
                    </div>
                  ) : null}
                  {list.title}
                  {filter && list.isDesc ? (
                    <FilterBtn>
                      {isDesc ? (
                        <FaRegCaretSquareUp />
                      ) : (
                        <FaRegCaretSquareDown />
                      )}
                    </FilterBtn>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map((contentList: any, index: number) => (
                <RowTable
                  isHover
                  key={index}
                  className={action ? "category" : undefined}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (action && url && moveKey) {
                      action(contentList.id);
                      setSelectedRow(contentList?.id);
                    } else if (doNoting) {
                      return;
                    } else {
                      if (typeof moveKey === "object") {
                        if (moveKey.length > 2) {
                          navigate(
                            `${url}/${
                              contentList[moveKey[0]][moveKey[1]][moveKey[2]]
                            }`
                          );
                        } else {
                          navigate(
                            `${url}/${contentList[moveKey[0]][moveKey[1]]}`
                          );
                        }
                      } else if (typeof moveKey === "string") {
                        navigate(`${url}/${contentList.moveKey}`);
                      }
                    }
                  }}
                  isSelected={
                    action
                      ? contentList.id === selectedRow
                        ? true
                        : false
                      : false
                  }
                >
                  {columns.map((list: any, index: number) => {
                    return list.render ? (
                      <td style={{ height: "46px" }} key={index}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {list.render(
                            contentList[list.dataIndex],
                            contentList
                          )}
                        </div>
                      </td>
                    ) : (
                      <td key={index}>{contentList[list.dataIndex]}</td>
                    );
                  })}
                </RowTable>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </StyledTableBlock>
      {pagenation && <Pagenation data={content} />}
    </AlignBox>
  );
};
