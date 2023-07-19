import CancelList from "components/order/cancel/cancelList";
import {
  changeDays,
  changeDeliveryStatus,
  changePhone,
} from "lib/functions/changeInput";
import { StyledSelect } from "lib/styles";
import { CheckBox } from "lib/styles/checkBoxStyled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { testVendorOrderData } from "types/data.test";

const CancelListContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [newList, setNewList] = useState<any[]>([]);

  const onChangeCheck = (list: any) => {
    const dataList = JSON.parse(JSON.stringify(newList));
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].code === list.code) {
        dataList[i].isChecked = !dataList[i].isChecked;
      }
    }
    setNewList(dataList);
  };

  useEffect(() => {
    setNewList(
      testVendorOrderData.map((list) => {
        return { ...list, isChecked: false };
      })
    );
  }, []);

  //* cancel
  const cancelOrderColumns = [
    {
      title: "전체선택",
      dataIndex: "isChecked",
      isCheck: true,
      render: (isChecked: boolean, _: any) => {
        const onClick = (e: React.MouseEvent<SVGElement>) => {
          e.stopPropagation();
          onChangeCheck(_);
        };
        return <CheckBox isChecked={isChecked} onClick={onClick} />;
      },
    },
    {
      title: "코드",
      dataIndex: "code",
    },
    {
      title: "주문자 연락처",
      dataIndex: "addr_phone",
      render: (addr_phone: string) => changePhone(addr_phone),
    },
    {
      title: "상품명",
      dataIndex: "dealerOrderItem",
      render: (dealerOrderItem: any) => dealerOrderItem?.goodsItem.name,
    },
    {
      title: "생성일",
      dataIndex: "createdAt",
      isDesc: true,
      render: (createdAt: string) => changeDays(createdAt),
    },
    {
      title: "수정일",
      dataIndex: "updatedAt",
      isDesc: true,
      render: (updatedAt: string) => changeDays(updatedAt),
    },
    {
      title: "취소사유",
      dataIndex: "delivery_memo",
    },
    {
      title: "주문금액",
      dataIndex: "dealerOrderItem",
      render: (dealerOrderItem: any) =>
        dealerOrderItem?.countedTotalPrice + "원",
    },
    {
      title: "주문상태",
      dataIndex: "orderStatus",
      render: (orderStatus: string) => {
        const action = () => {};
        return (
          <StyledSelect
            placeholder={changeDeliveryStatus(orderStatus)}
            optionList={[
              {
                name: "취소완료",
                key: "CANCEL_COMPLETE",
              },
            ]}
            actions={action}
          />
        );
      },
    },
  ];

  return (
    <CancelList cancelList={newList} cancelOrderColumns={cancelOrderColumns} />
  );
};

export default CancelListContainer;
