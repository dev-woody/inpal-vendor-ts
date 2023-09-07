export function changeDays(inputDays: string | undefined) {
  const year = inputDays?.substring(0, 4);
  const month = inputDays?.substring(4, 6);
  const days = inputDays?.substring(6, 8);
  const fulldays = year + "." + month + "." + days;
  return inputDays ? fulldays : "";
}

export function changePhone(inputPhone: string | undefined) {
  const firstNum = inputPhone?.substring(0, 3);
  const middleNum = inputPhone?.substring(3, 7);
  const lastNum = inputPhone?.substring(7, 11);
  const fullNum = firstNum + "-" + middleNum + "-" + lastNum;
  return inputPhone ? fullNum : "";
}

export function changeTextCut(text: string | undefined) {
  if (text && text?.length > 5) {
    return text.substring(0, 5) + "...";
  }
}

export function changeStatus(status: string | undefined) {
  switch (status) {
    case "APPROVING":
      return "승인대기";
    case "WAIT":
      return "휴면";
    case "USE":
      return "사용중";
    case "STOP":
      return "사용중지";
  }
}

export function changeSellStatus(status: string | undefined) {
  switch (status) {
    case "READY":
      return "준비중";
    case "SELL":
      return "판매중";
    case "STOP":
      return "판매중지";
  }
}

export function changeDeliveryStatus(status: string | undefined) {
  switch (status) {
    case "CART":
      return "카트";
    case "ORDER_REGISTER":
      return "주문등록";
    case "PAYMENT_WAIT":
      return "입금대기";
    case "PAYMENT_COMPLETE":
      return "결제완료";
    case "ITEM_READY":
      return "배송대기중";
    case "DELIVERY_START":
      return "배송처리";
    case "DELIVERY_END":
      return "배송완료";
    case "CANCEL_REQUEST":
      return "취소요청";
    case "CANCEL_COMPLETE":
      return "취소완료";
    case "EXCHANGE_REQUEST":
      return "교환요청";
    case "EXCHANGE_COMPLETE":
      return "교환완료";
    case "RETURN_REQUEST":
      return "반품요청";
    case "RETURN_COMPLETE":
      return "반품완료";
    case "REFUND_REQUEST":
      return "환불요청";
    case "REFUND_COMPLETE":
      return "환불완료";
    case "CONFIRM":
      return "구매확정";
  }
}

export function changeOrderPathStatus(status: string | undefined) {
  switch (status) {
    case "allList":
      return "주문 조회";
    case "beforePayment":
      return "무통장입금 현황";
    case "paymentComplete":
      return "결제완료";
    case "cancel":
      return "취소관리";
    case "return":
      return "반품관리";
    case "exchange":
      return "교환관리";
    case "refund":
      return "환불관리";
    case "confirmation":
      return "구매확정";
  }
}

export function isUseProduct(productList: any) {
  const useProduct = productList?.info?.bizInfo?.info?.basic?.info?.handleProductOwner?.info?.productNums?.filter((item: any) => item?.info?.openStatus === "OPEN" && item?.info?.product?.info?.openStatus === "OPEN")

  return useProduct?.map((item:any) => {
    return { id: item?.info?.product?.id, name: item?.info?.product?.info?.nameKr}
  })
}

export function priceToString(price: number) {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function changePostPhone(phone: string) {
  return phone.replace(/\-/g, "");
}

export const regexId =
  /^(?=.*[a-z])(?=.*\d)(?!.*[^a-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]])/;

export const regexPasswd =
  /^(?=.*[A-z])(?=.*[a-z])(?=.*\d)(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+])/;

export const regexEmail =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
