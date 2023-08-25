import GoodsGorupList from "components/goodsGroup/list";
import { ColumnsType } from "lib/columns/columnsList";
import { changeDays } from "lib/functions/changeInput";
import { StyledToggle } from "lib/styles";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const GoodsGroupListContainer = () => {
  const { user, goodsGroup, countGroup, setOpenStatus } = useAppSelector(
    (store) => ({
      user: store.user,
      goodsGroup: store.vendorGoodsGroup.pageGroup,
      countGroup: store.vendorGoodsGroup.countGroup,
      setOpenStatus: store.vendorGoodsGroup.setOpenStatus,
    })
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onSetStatus = (data: object) => {
    dispatch(vendorGoodsGroupActions.setOpenStatus(data));
  };

  useEffect(() => {
    dispatch(vendorGoodsGroupActions.countGroup({ vendorId: user.vendorId }));
  }, []);

  useEffect(() => {
    dispatch(
      vendorGoodsGroupActions.pageGroup({
        vendorId: user.vendorId,
        page: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
        size: 10,
      })
    );
  }, [setOpenStatus]);

  useEffect(() => {
    sessionStorage.setItem(
      "groupPageInfo",
      JSON.stringify({
        pageNum: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
      })
    );
    dispatch(
      vendorGoodsGroupActions.pageGroup({
        vendorId: user.vendorId,
        page: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
        size: 10,
      })
    );
    return () => {
      dispatch(vendorGoodsGroupActions.reset("findAll"));
    };
  }, [searchParams.get("pageNum"), searchParams.get("isDesc")]);

  useEffect(() => {
    navigate(`?pageNum=0&isDesc=false`);
  }, []);

  const goodsGroupColumns: ColumnsType[] = [
    {
      title: "번호",
      dataIndex: "",
      render: (_, __, index) => index,
    },
    {
      title: "코드",
      dataIndex: "info",
      render: (info) => info.code,
    },
    {
      title: "그룹명",
      dataIndex: "info",
      render: (info) => info.basic.info.name,
    },
    {
      title: "제조사명",
      dataIndex: "info",
      render: (info) => info.basic.info.manufacturer.info.basic.info.nameKr,
    },
    {
      title: "생성일",
      dataIndex: "base",
      isDesc: false,
      render: (base) => changeDays(base.createdAt),
    },
    {
      title: "수정일",
      dataIndex: "base",
      isDesc: false,
      render: (base) => changeDays(base.updatedAt),
    },
    {
      title: "판매상태",
      dataIndex: "info",
      render: (info: any, contentList: any) => {
        const action = () => {
          onSetStatus({
            vendorId: user.vendorId,
            id: contentList.base.id,
            openStatus: info.openStatus == "OPEN" ? "close" : "open",
          });
        };
        return (
          <StyledToggle
            data={info.openStatus}
            openStatus="OPEN"
            action={action}
          />
        );
      },
    },
  ];

  return (
    <GoodsGorupList
      goodsGroupList={goodsGroup}
      countGroup={countGroup}
      goodsGroupColumns={goodsGroupColumns}
    />
  );
};

export default GoodsGroupListContainer;
