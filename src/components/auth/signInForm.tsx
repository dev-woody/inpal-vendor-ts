import { useState } from "react";
import styled from "styled-components";
import {
  Button,
  StyledForm,
  StyledInput,
  PassShowBlock,
  ErrorMsg,
} from "lib/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PageHeader from "lib/pages/pageHeader";
import { Link } from "react-router-dom";
import LogoTypo from "logo-typo.png";

import { BiBarcode, BiUser, BiLock } from "react-icons/bi";
import { response } from "types/globalTypes";

const SignInBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignInFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 0.75rem;
  background-color: #fff;
  max-width: 400px;
`;

type SignInProps = {
  signInResult: response;
  onSubmit: (data: any) => void;
};

const schema = yup.object({
  vendorCode: yup.string().required("판매사코드를 입력해주세요."),
  userId: yup.string().required("아이디를 입력해주세요."),
  password: yup.string().required("비밀번호를 입력해주세요."),
});

function SignInForm({ signInResult, onSubmit }: SignInProps) {
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      vendorCode: "",
      userId: "",
      password: "",
    },
  });

  return (
    <SignInBlock>
      <SignInFormBlock>
        <Link
          to="/"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <img src={LogoTypo} width={"65%"} />
        </Link>
        <StyledForm onSubmit={handleSubmit((data) => onSubmit(data))}>
          <StyledInput
            placeholder="판매사 코드"
            fullWidth
            startItem={<BiBarcode />}
            label="vendorCode"
            register={register}
            errors={errors}
            status={errors.vendorCode}
          />
          <StyledInput
            placeholder="아이디"
            fullWidth
            startItem={<BiUser />}
            label="userId"
            register={register}
            errors={errors}
            status={errors.userId}
          />
          <StyledInput
            placeholder="비밀번호"
            type={isPassShow ? "text" : "password"}
            fullWidth
            startItem={<BiLock />}
            endItem={
              <PassShowBlock
                isPassShow={isPassShow}
                setIsPassShow={setIsPassShow}
              />
            }
            label="password"
            register={register}
            errors={errors}
            status={errors.password}
          />
          <ErrorMsg>{signInResult.message}</ErrorMsg>
          <Button
            type="submit"
            status="primary"
            fullWidth
            disabled={isSubmitting}
            style={{ marginTop: "2rem" }}
          >
            로그인
          </Button>
        </StyledForm>
        <p style={{ margin: "0.5rem 0", fontSize: "0.75rem" }}>
          아직 회원이 아니신가요?
        </p>
        <Link to="/auth/register" style={{ width: "100%" }}>
          <Button type="button" fullWidth>
            회원가입
          </Button>
        </Link>
      </SignInFormBlock>
    </SignInBlock>
  );
}

export default SignInForm;
