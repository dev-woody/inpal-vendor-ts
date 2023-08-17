import styled from "styled-components";
import { BreadCrumb, Modal, Responsive, Table } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { ColumnsType } from "lib/columns/columnsList";
import { response } from "types/globalTypes";
import { NavigateFunction } from "react-router-dom";

const PaymentCompleteListBlock = styled(Responsive)``;

type listProps = {
  paymentComplete: response;
  paymentCompleteOrderColumns: ColumnsType[];
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
};

const PaymentCompleteList = ({
  paymentComplete,
  paymentCompleteOrderColumns,
  modalVisible,
  setModalVisible,
  navigate,
}: listProps) => {
  return (
    <>
      <PaymentCompleteListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "결제완료",
                  url: "/order/paymentComplete",
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
          content={paymentComplete?.data?.filter(
            (list: any) => list?.info?.orderStatus === "PAYMENT_COMPLETE"
          )}
          url="/order/paymentComplete/detail"
          moveKey={["base", "id"]}
          pagenation
          filter
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
