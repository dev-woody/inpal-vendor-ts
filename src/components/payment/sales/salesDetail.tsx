import styled from "styled-components";
import {
  BreadCrumb,
  Button,
  Description,
  DescriptionContent,
  Modal,
  Responsive,
  StyledForm,
  StyledInput,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { changeDays } from "lib/functions/changeInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { response } from "types/globalTypes";

const SalesDetailBlock = styled(Responsive)``;

type detailProps = {
  update: boolean;
  data: { [key: string]: any };
  productId: response;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  sellStatus: yup.string().required("주문상태를 선택해주세요."),
});

const SalesDetail = ({
  update,
  data,
  productId,
  onSubmit,
  modalVisible,
  setModalVisible,
}: detailProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sellStatus: "",
    },
  });

  useEffect(() => {
    if (update) {
      reset();
    }

    setValue("sellStatus", data?.freeCondition);
  }, [update]);

  return (
    <>
      <SalesDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "정산내역 /",
                  url: "/payment/sales",
                },
                { name: "상세정보", url: "" },
              ]}
            />
          }
        />
      </SalesDetailBlock>
      <SalesDetailBlock>
        <PageHeader title="" />
        <StyledForm onSubmit={handleSubmit((data) => onSubmit({ data }))}>
          <Description>
            <DescriptionContent label="코드" content={data?.code} />
            <DescriptionContent
              label="품목명"
              content={productId?.data?.name}
            />
            <DescriptionContent span="12" label="배송료" content={data?.data} />
            <DescriptionContent
              span="12"
              label="주문상태"
              content={
                <StyledInput
                  align="vertical"
                  placeholder={data?.sellStatus}
                  label="sellStatus"
                  register={register}
                  errors={errors.sellStatus?.message}
                  status={errors.sellStatus}
                />
              }
            />
            <DescriptionContent
              label="생성일"
              content={changeDays(data?.createdAt)}
            />
            <DescriptionContent
              label="수정일"
              content={changeDays(data?.updatedAt)}
            />
          </Description>
          <Button
            disabled={isSubmitting}
            type="submit"
            status="primary"
            needMarginTop
            withInput
          >
            수정
          </Button>
        </StyledForm>
        <Modal
          title="배송코드 수정"
          msg="수정을 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </SalesDetailBlock>
    </>
  );
};

export default SalesDetail;
