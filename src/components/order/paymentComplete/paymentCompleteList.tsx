import styled from "styled-components";
import { BreadCrumb, Modal, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";
import { response } from "types/globalTypes";
import { NavigateFunction, useSearchParams } from "react-router-dom";

const PaymentCompleteListBlock = styled(Responsive)``;

type listProps = {
  paymentComplete: response;
  countOrder: response;
  paymentCompleteOrderColumns: ColumnsType[];
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
};

const PaymentCompleteList = ({
  paymentComplete,
  countOrder,
  paymentCompleteOrderColumns,
  modalVisible,
  setModalVisible,
  navigate,
}: listProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(atob(searchParams.get("n") || btoa("0")));
  const { n, d } = JSON.parse(sessionStorage.getItem("orderPageInfo") || "{}");
  return (
    <>
      <PaymentCompleteListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "결제완료",
                  url: `?n=${n}&d=${d}`,
                },
              ]}
            />
          }
        />
      </PaymentCompleteListBlock>
      <PaymentCompleteListBlock>
        <Table
          columns={paymentCompleteOrderColumns}
          // content={paymentcompleteList}
          content={paymentComplete?.data}
          url="/order/paymentComplete/detail"
          searchParams={searchParams}
          setSearchParams={(page: number) =>
            setSearchParams({
              n: btoa(String(newPageNum + page)),
              d: d,
            })
          }
          moveKey={["base", "id"]}
          pagenation
          pageCount={countOrder.data}
        />
      </PaymentCompleteListBlock>
      <Modal
        title="배송상태 변경"
        msg="배송대기중으로 변경되었습니다."
        submitMsg="확인"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        // action={() => navigate(`/admin/cupon`)}
      />
    </>
  );
};

export default PaymentCompleteList;
