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
  StyledSelect,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { changeDays, changeSellStatus } from "lib/functions/changeInput";
import { sellStatusOption } from "lib/columns/statusColumns";
import { NavigateFunction } from "react-router-dom";

const GoodsGroupOptionDetailBlock = styled(Responsive)``;

type OptionProps = {
  optionData: response;
  onSubmit: ({ data }: { data: object }) => void;
  onSetSellStatus: (status: string) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
  id: string | undefined;
};

const schema = yup.object({
  name: yup.string().required("옵션명을 입력해주세요."),
  spec: yup.string().required("사양을 입력해주세요."),
});

const GoodsGroupOptionDetail = ({
  optionData,
  onSubmit,
  onSetSellStatus,
  modalVisible,
  setModalVisible,
  navigate,
  id,
}: OptionProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: optionData.data?.name,
      spec: optionData.data?.spec,
    },
  });
  return (
    <>
      <GoodsGroupOptionDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹관리 /",
                  url: "/goods/groups",
                },
                {
                  name: "상세정보 및 수정 /",
                  url: `/goods/groups/detail/${id}`,
                },
                {
                  name: "옵션 상세정보",
                  url: "",
                },
              ]}
            />
          }
        />
      </GoodsGroupOptionDetailBlock>
      <GoodsGroupOptionDetailBlock>
        <PageHeader title="옵션 상세정보" />
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit({ data }),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent
              span="12"
              label="옵션명"
              content={
                <StyledInput
                  align="vertical"
                  placeholder={optionData?.data?.name}
                  label="name"
                  register={register}
                  errors={errors}
                  status={errors.name}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="옵션사양"
              content={
                <StyledInput
                  align="vertical"
                  placeholder={optionData?.data?.spec}
                  label="spec"
                  register={register}
                  errors={errors}
                  status={errors.spec}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="가격"
              content={optionData?.data?.price}
            />
            <DescriptionContent
              label="재고"
              content={optionData?.data?.stock}
            />
            <DescriptionContent
              label="판매량"
              content={optionData?.data?.sellCount}
            />
            <DescriptionContent
              span="12"
              label="판매상태"
              content={
                <StyledSelect
                  placeholder={changeSellStatus(optionData?.data?.sellStatus)}
                  // label="productId"
                  optionList={sellStatusOption}
                  // register={register}
                  // setValue={setValue}
                  align="vertical"
                  actions={onSetSellStatus}
                  index="2"
                />
              }
            />
            <DescriptionContent
              label="등록일"
              content={changeDays(optionData?.data?.createdAt)}
            />
            <DescriptionContent
              label="수정일"
              content={changeDays(optionData?.data?.updatedAt)}
            />
          </Description>
          <Button type="submit" status="primary" withInput needMarginTop>
            수정
          </Button>
        </StyledForm>
        <Modal
          title="옵션 수정"
          msg="옵션 수정을 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => {
            if (typeof id === "string") {
              navigate(`/goods/detail/${id}`);
            }
          }}
        />
      </GoodsGroupOptionDetailBlock>
    </>
  );
};

export default GoodsGroupOptionDetail;
