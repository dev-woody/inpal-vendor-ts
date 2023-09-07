import DeliveryCodeList from "components/deliveryCode/deliveryCodeList";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { vendorAdminActions } from "reducers/admin/vendorAdmin";
import { vendorDeliveryCodeActions } from "reducers/deliveryCode/vendorDeliveryCode";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const DeliveryFindAllContainer = () => {
  const { user,mypage, deliveryCodeList } = useAppSelector((store) => ({
    user: store.user,
    mypage: store.vendorAdmin.mypage,
    deliveryCodeList: store.vendorDeliveryCode.findAllByProductId,
  }));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const onSelect = (id: string) => {
    setSearchParams({ p: btoa(id), d: searchParams.get("d") || btoa("false") });
  };

  useEffect(() => {
    dispatch(dispatch(vendorAdminActions.mypage(user.vendorId)));
    return () => {
      dispatch(vendorDeliveryCodeActions.reset("findAllByProductId"));
    };
  }, []);

  useEffect(() => {
    if (searchParams.get("p") === btoa("none")) {
      return;
    } else {
      sessionStorage.setItem(
        "deliveryCode",
        JSON.stringify({ p: searchParams.get("p"), d: searchParams.get("d") })
      );
      dispatch(
        vendorDeliveryCodeActions.findAllByProductId({
          vendorId: user.vendorId,
          productId: atob(searchParams.get("p") || btoa("")),
          isDesc: atob(searchParams.get("d") || btoa("false")),
        })
      );
    }
  }, [searchParams.get("p"), searchParams.get("d")]);

  useEffect(() => {
    if ((searchParams.get("p") || searchParams.get("d")) === null) {
      navigate(`?p=${btoa("none")}&d=${btoa("false")}`);
    }
  }, [searchParams.get("p"), searchParams.get("d")]);

  return (
    <DeliveryCodeList
      deliveryCodeList={deliveryCodeList}
      productList={mypage}
      onSelect={onSelect}
    />
  );
};

export default DeliveryFindAllContainer;
