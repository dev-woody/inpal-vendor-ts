import SpecList from "components/goodsGroup/spec/specList";
import { ColumnsType } from "lib/columns/columnsList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { vendorGoodsSpecActions } from "reducers/goodsGroup/vendorGoodsSpec";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const SpecContainer = () => {
  const { user, specList, productList } = useAppSelector((state) => ({
    user: state.user,
    specList: state.vendorGoodsSpec.findAllByProductId,
    productList: state.vendorProduct.findAll,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSelect = (id: string) => {
    dispatch(
      vendorGoodsSpecActions.findAllByProductId({
        vendorId: user.vendorId,
        productId: id,
        isDesc: false,
      })
    );
  };

  useEffect(() => {
    dispatch(vendorProductActions.findAll(false));
    return () => {
      dispatch(vendorProductActions.reset("findAll"));
      dispatch(vendorGoodsSpecActions.reset("findAllByProductId"));
    };
  }, []);

  const specColunms: ColumnsType[] = [
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
      title: "배송코드",
      dataIndex: "info",
      render: (info) => info.delivery.info.code,
    },
    {
      title: "용량",
      dataIndex: "info",
      render: (info) => info.quantity,
    },
    {
      title: "단위",
      dataIndex: "info",
      render: (info) => info.unit.info.nameKr,
    },
    // {
    //   title: "사용상태",
    //   dataIndex: "info",
    //   render: (info: any, contentList: any) => {
    //     const action = () => {
    //       onSetOpenStatus({
    //         vendorId: user.vendorId,
    //         id: contentList.id,
    //         openStatus: info.openStatus == "OPEN" ? "close" : "open",
    //       });
    //     };
    //     return (
    //       <StyledToggle
    //         data={info.openStatus}
    //         openStatus="OPEN"
    //         action={action}
    //       />
    //     );
    //   },
    // },
  ];

  return (
    <SpecList
      productList={productList}
      specList={specList}
      specColunms={specColunms}
      onSelect={onSelect}
      navigate={navigate}
    />
  );
};

export default SpecContainer;
