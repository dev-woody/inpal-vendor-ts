import styled from "styled-components";
import {
  BreadCrumb,
  Button,
  Description,
  DescriptionContent,
  ErrorMsg,
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

const DeliveryDetailBlock = styled(Responsive)``;

type detailProps = {
  update: response;
  dcode: { [key: string]: any };
  productId: response;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  basicFee: yup.string().required("배송료를 입력해주세요."),
  freeCondition: yup.string().required("무료배송조건을 입력해주세요."),
});

const DeliveryDetail = ({
  update,
  dcode,
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
      basicFee: "",
      freeCondition: "",
    },
  });

  useEffect(() => {
    if (update) {
      reset();
    }

    setValue("basicFee", dcode?.info?.basicFee);
    setValue("freeCondition", dcode?.info?.freeCondition);
  }, [update, dcode, reset, setValue]);

  return (
    <>
      <DeliveryDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "배송코드관리 /",
                  url: "/dcode/dcode",
                },
                { name: "상세정보", url: "" },
              ]}
            />
          }
        />
      </DeliveryDetailBlock>
      <DeliveryDetailBlock>
        <PageHeader title="" />
        <StyledForm onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Description>
            <DescriptionContent label="코드" content={dcode?.info?.code} />
            <DescriptionContent
              label="품목명"
              content={productId?.data?.info?.nameKr}
            />
            <DescriptionContent
              span="12"
              label="배송료"
              content={
                <>
                  <StyledInput
                    align="vertical"
                    placeholder={dcode?.basicFee}
                    label="basicFee"
                    register={register}
                    errors={errors.basicFee?.message}
                    status={errors.basicFee}
                  />
                  <span style={{ marginLeft: "0.5rem" }}>원</span>
                </>
              }
            />
            <DescriptionContent
              span="12"
              label="무료배송조건"
              content={
                <>
                  <StyledInput
                    align="vertical"
                    placeholder={dcode?.freeCondition}
                    label="freeCondition"
                    register={register}
                    errors={errors.freeCondition?.message}
                    status={errors.freeCondition}
                  />
                  <span style={{ marginLeft: "0.5rem" }}>원</span>
                </>
              }
            />
            <DescriptionContent
              label="생성일"
              content={changeDays(dcode?.base?.createdAt)}
            />
            <DescriptionContent
              label="수정일"
              content={changeDays(dcode?.base?.updatedAt)}
            />
          </Description>
          <ErrorMsg>{update.message}</ErrorMsg>
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
      </DeliveryDetailBlock>
    </>
  );
};

export default DeliveryDetail;
