import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  StyledForm,
  StyledInput,
  StyledSearchInput,
  ErrorMsg,
  PassShowBlock,
  Responsive,
  Modal,
  StyledSelect,
  StyledTimePicker,
  StyledUpload,
} from "lib/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PageHeader from "lib/pages/pageHeader";
import ModalPostCode from "lib/functions/postCode";
import { response } from "types/globalTypes";
import { NavigateFunction } from "react-router-dom";

const RegisterBlock = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: center;
`;

const RegiSection = styled(Responsive)`
  max-width: 576px;
`;

type RegisterProps = {
  productList: object[] | null;
  isRegister: response;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
};

const schema = yup.object({
  bizInfo: yup.object({
    basicInfo: yup.object({
      name: yup.string().required("기업명을 선택해주세요."),
      ceo: yup.string().required("대표명을 입력해주세요."),
      handleProduct: yup.object({
        productNumInfos: yup
          .array()
          .of(
            yup.object({
              num: yup.number(),
              productId: yup.string(),
            })
          )
          .min(1, "판매 품목을 선택해주세요."),
      }),
      logoImageInfo: yup.object({
        id: yup.string().required("로고이미지를 등록해주세요."),
      }),
    }),
    registrationInfo: yup.object({
      number: yup.string().required("사업자등록번호를 입력해주세요."),
      sector: yup.string().required("업태를 입력해주세요."),
      detail: yup.string().required("업종을 입력해주세요."),
      emailOrderNumber: yup.string().required("통신판매업번호를 입력해주세요."),
      registrationImageInfo: yup.object({
        id: yup.string().required("사업자등록증을 등록해주세요."),
      }),
    }),
    accountInfo: yup.object({
      name: yup.string().required("예금주를 입력해주세요."),
      bank: yup.string().required("은행명을 입력해주세요."),
      number: yup.string().required("계좌번호를 입력해주세요."),
      accountImageInfo: yup.object({
        id: yup.string().required("통장사본을 등록해주세요"),
      }),
    }),
    serviceInfo: yup.object({
      phone: yup.string().required("상담문의번호를 입력해주세요."),
      startTime: yup.string().required("상담시작시간을 입력해주세요."),
      endTime: yup.string().required("상담마감시간을 입력해주세요."),
    }),
    addressInfo: yup.object({
      zipCode: yup.string().required("우편번호를 입력해주세요."),
      basic: yup.string().required("우편번호를 입력해주세요."),
      detail: yup.string().required("상세주소를 입력해주세요."),
      manager: yup.string().required("관리자 성함을 입력해주세요."),
      phone: yup.string().required("관리자 번호를 입력해주세요."),
      mobile: yup.string().required("관리자 휴대전화번호를 입력해주세요."),
    }),
  }),
  adminInfo: yup.object({
    signInfo: yup.object({
      userId: yup.string().required("아이디를 입력해주세요."),
      password: yup.string().required("비밀번호를 입력해주세요."),
    }),
    name: yup.string().required("이름을 입력해주세요."),
    email: yup.string().required("이메일를 입력해주세요."),
    phone: yup.string().required("전화번호를 입력해주세요."),
  }),
});

function RegisterForm({
  productList,
  isRegister,
  onSubmit,
  modalVisible,
  setModalVisible,
  navigate,
}: RegisterProps) {
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  const [postCodeVisible, setPostCodeVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      bizInfo: {
        basicInfo: {
          name: "",
          ceo: "",
          handleProduct: {
            productNumInfos: new Array(),
          },
          logoImageInfo: { id: "" },
        },
        registrationInfo: {
          number: "",
          sector: "",
          detail: "",
          emailOrderNumber: "",
          registrationImageInfo: { id: "" },
        },
        accountInfo: {
          name: "",
          bank: "",
          number: "",
          accountImageInfo: { id: "" },
        },
        serviceInfo: {
          phone: "",
          startTime: "",
          endTime: "",
        },
        addressInfo: {
          zipCode: "",
          basic: "",
          detail: "",
          manager: "",
          phone: "",
          mobile: "",
        },
      },
      adminInfo: {
        signInfo: {
          userId: "",
          password: "",
        },
        name: "",
        email: "",

        phone: "",
      },
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <RegisterBlock>
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <RegiSection>
          <PageHeader title="회원가입" subTitle="모든 항목은 필수항목입니다" />
          <StyledInput
            placeholder="기업명"
            label="bizInfo.basicInfo.name"
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.basicInfo?.name}
          />
          <StyledInput
            placeholder="대표명"
            label="bizInfo.basicInfo.ceo"
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.basicInfo?.ceo}
          />
          <StyledSelect
            placeholder="판매 품목"
            label="bizInfo.basicInfo.handleProduct.productNumInfos"
            optionList={productList}
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.basicInfo?.handleProduct?.productNumInfos}
            setValue={(
              label: "bizInfo.basicInfo.handleProduct.productNumInfos",
              id: string
            ) => {
              setValue(`${label}`, [{ productId: id, num: 0 }]);
              clearErrors("bizInfo.basicInfo.handleProduct.productNumInfos");
            }}
            index="100"
          />
          <StyledUpload
            readOnly
            placeholder="로고이미지"
            label="bizInfo.basicInfo.logoImageInfo.id"
            fullWidth
            isBox
            maxLength={1}
            register={register}
            errors={errors}
            status={errors?.bizInfo?.basicInfo?.logoImageInfo?.id}
            subject="vendor"
            type="logo"
            successAction={(result: any) => {
              const imageArray = result.map((image: any) => {
                return { id: image?.imageId };
              });
              setValue("bizInfo.basicInfo.logoImageInfo.id", imageArray[0].id);
              clearErrors("bizInfo.basicInfo.logoImageInfo.id");
            }}
          />
        </RegiSection>
        <RegiSection>
          <PageHeader title="기업정보" />
          <StyledInput
            placeholder="사업자등록번호"
            label="bizInfo.registrationInfo.number"
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.registrationInfo?.number}
          />
          <StyledInput
            placeholder="업태"
            label="bizInfo.registrationInfo.sector"
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.registrationInfo?.sector}
          />
          <StyledInput
            placeholder="업종"
            label="bizInfo.registrationInfo.detail"
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.registrationInfo?.detail}
          />
          <StyledInput
            placeholder="통신판매번호"
            label="bizInfo.registrationInfo.emailOrderNumber"
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.registrationInfo?.emailOrderNumber}
          />
          <StyledUpload
            readOnly
            placeholder="사업자등록증"
            label="bizInfo.registrationInfo.registrationImageInfo.id"
            fullWidth
            isBox
            maxLength={1}
            register={register}
            errors={errors}
            status={errors.bizInfo?.registrationInfo?.registrationImageInfo?.id}
            subject="vendor"
            type="registration"
            successAction={(result: any) => {
              const imageArray = result.map((image: any) => {
                return { id: image?.imageId };
              });
              setValue(
                "bizInfo.registrationInfo.registrationImageInfo.id",
                imageArray[0].id
              );
              clearErrors("bizInfo.registrationInfo.registrationImageInfo.id");
            }}
          />
        </RegiSection>
        <RegiSection>
          <PageHeader title="계좌정보" />
          <StyledInput
            placeholder="예금주명"
            label="bizInfo.accountInfo.name"
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.accountInfo?.name}
          />
          <StyledInput
            placeholder="은행명"
            label="bizInfo.accountInfo.bank"
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.accountInfo?.bank}
          />
          <StyledInput
            placeholder="계좌번호"
            label="bizInfo.accountInfo.number"
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.accountInfo?.number}
          />
          <StyledUpload
            readOnly
            placeholder="통장사본"
            label="bizInfo.accountInfo.accountImageInfo.id"
            fullWidth
            isBox
            maxLength={1}
            register={register}
            errors={errors}
            status={errors.bizInfo?.accountInfo?.accountImageInfo?.id}
            subject="vendor"
            type="account"
            successAction={(result: any) => {
              const imageArray = result.map((image: any) => {
                return { id: image?.imageId };
              });
              setValue(
                "bizInfo.accountInfo.accountImageInfo.id",
                imageArray[0].id
              );
              clearErrors("bizInfo.accountInfo.accountImageInfo.id");
            }}
          />
        </RegiSection>
        <RegiSection>
          <PageHeader title="고객상담정보" />
          <StyledInput
            placeholder="상담번호"
            label="bizInfo.serviceInfo.phone"
            fullWidth
            register={register}
            errors={errors}
            status={errors?.bizInfo?.serviceInfo?.phone}
          />
          <StyledTimePicker
            placeholder="상담시작시간"
            label="bizInfo.serviceInfo.startTime"
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.serviceInfo?.startTime}
            setValue={(label: "bizInfo.serviceInfo.startTime", data: any) => {
              setValue(`${label}`, data);
              clearErrors("bizInfo.serviceInfo.startTime");
            }}
            index="99"
          />
          <StyledTimePicker
            placeholder="상담종료시간"
            label="bizInfo.serviceInfo.endTime"
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.serviceInfo?.endTime}
            setValue={(label: "bizInfo.serviceInfo.endTime", data: any) => {
              setValue(`${label}`, data);
              clearErrors("bizInfo.serviceInfo.endTime");
            }}
            index="98"
          />
        </RegiSection>
        <RegiSection>
          <PageHeader title="주소정보" />
          <StyledSearchInput
            placeholder="우편번호"
            label="bizInfo.addressInfo.zipCode"
            fullWidth
            register={register}
            disable={true}
            // errors={errors}
            status={errors.bizInfo?.addressInfo?.zipCode}
            action={() => setPostCodeVisible(true)}
          />
          <Modal
            title="우편번호 조회"
            msg={
              <ModalPostCode
                setIsModalVisible={setPostCodeVisible}
                action={(zipCode: any, address: any) => {
                  setValue("bizInfo.addressInfo.zipCode", `${zipCode}`);
                  setValue("bizInfo.addressInfo.basic", `${address}`);
                  clearErrors("bizInfo.addressInfo.zipCode");
                  clearErrors("bizInfo.addressInfo.basic");
                }}
              />
            }
            modalVisible={postCodeVisible}
            setModalVisible={setPostCodeVisible}
            submitMsg="닫기"
          />
          <StyledInput
            placeholder="상세주소"
            label="bizInfo.addressInfo.basic"
            fullWidth
            register={register}
            readOnly
            errors={errors}
            status={errors.bizInfo?.addressInfo?.basic}
          />
          <StyledInput
            placeholder="상세주소"
            label="bizInfo.addressInfo.detail"
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.addressInfo?.detail}
          />
          <StyledInput
            placeholder="관리자성함"
            label="bizInfo.addressInfo.manager"
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.addressInfo?.manager}
          />
          <StyledInput
            placeholder="관리자번호"
            label="bizInfo.addressInfo.phone"
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.addressInfo?.phone}
          />
          <StyledInput
            placeholder="관리자휴대전화"
            label="bizInfo.addressInfo.mobile"
            fullWidth
            register={register}
            errors={errors}
            status={errors.bizInfo?.addressInfo?.mobile}
          />
        </RegiSection>
        <RegiSection>
          <PageHeader title="관리자정보" />
          <StyledInput
            placeholder="이름"
            label="adminInfo.name"
            fullWidth
            register={register}
            errors={errors}
            status={errors.adminInfo?.name}
          />
          <StyledInput
            placeholder="아이디"
            label="adminInfo.signInfo.userId"
            fullWidth
            register={register}
            errors={errors}
            status={errors.adminInfo?.signInfo?.userId}
          />
          <StyledInput
            placeholder="비밀번호"
            type={isPassShow ? "text" : "password"}
            endItem={
              <PassShowBlock
                isPassShow={isPassShow}
                setIsPassShow={setIsPassShow}
              />
            }
            label="adminInfo.signInfo.password"
            fullWidth
            register={register}
            errors={errors}
            status={errors.adminInfo?.signInfo?.password}
          />
          <StyledInput
            placeholder="이메일"
            label="adminInfo.email"
            fullWidth
            register={register}
            errors={errors}
            status={errors.adminInfo?.email}
          />
          <StyledInput
            placeholder="전화번호"
            label="adminInfo.phone"
            fullWidth
            register={register}
            errors={errors}
            status={errors.adminInfo?.phone}
          />
          <ErrorMsg>{isRegister.message}</ErrorMsg>
          <Button
            type="submit"
            fullWidth
            status="primary"
            disabled={isSubmitting}
            needMarginTop
          >
            회원가입 요청
          </Button>
        </RegiSection>
      </StyledForm>
      <Modal
        title="회원가입 요청"
        msg="회원가입 요청을 완료하였습니다. 승인완료 후 로그인가능합니다."
        submitMsg="확인"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        action={() => navigate(`/auth/signIn`)}
      />
    </RegisterBlock>
  );
}

export default RegisterForm;
