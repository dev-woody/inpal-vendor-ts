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
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavigateFunction } from "react-router-dom";

type optionProps = {
  onSubmit: ({ data }: { data: any }) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
  id: string | undefined;
};

const schema = yup.object({
  name: yup.string().required("옵션명을 입력해주세요."),
  spec: yup.string().required("사양을 입력해주세요."),
  price: yup.string().required("가격을 입력해주세요."),
  stock: yup.string().required("재고를 입력해주세요."),
});

const GoodsGroupOptionRegisterBlock = styled(Responsive)``;

const GoodsGroupOptionRegister = ({
  onSubmit,
  modalVisible,
  setModalVisible,
  navigate,
  id,
}: optionProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      spec: "",
      price: "",
      stock: "",
    },
  });
  return (
    <>
      <GoodsGroupOptionRegisterBlock>
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
                  name: "옵션 등록",
                  url: "",
                },
              ]}
            />
          }
        />
      </GoodsGroupOptionRegisterBlock>
      <GoodsGroupOptionRegisterBlock>
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
                  placeholder="옵션명"
                  label="name"
                  register={register}
                  errors={errors}
                  status={errors.name}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="사양"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="사양"
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
              content={
                <StyledInput
                  align="vertical"
                  placeholder="가격"
                  label="price"
                  register={register}
                  errors={errors}
                  status={errors.price}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="재고"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="재고"
                  label="stock"
                  register={register}
                  errors={errors}
                  status={errors.stock}
                />
              }
            />
          </Description>
          <Button type="submit" status="primary" withInput needMarginTop>
            등록
          </Button>
        </StyledForm>
        <Modal
          title="옵션등록"
          msg="옵션등록을 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => {
            if (typeof id === "string") {
              navigate(`/goods/detail/${id}`);
            }
          }}
        />
      </GoodsGroupOptionRegisterBlock>
    </>
  );
};

export default GoodsGroupOptionRegister;
