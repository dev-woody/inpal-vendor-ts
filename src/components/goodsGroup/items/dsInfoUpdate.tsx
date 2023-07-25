import styled from "styled-components";
import {
  Button,
  Description,
  DescriptionContent,
  Responsive,
  StyledForm,
  StyledInput,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

type DsInfoUpdateProps = {
  dsInfo: any;
  onSubmit: (data: object) => void;
};

const DsInfoUpdateBlock = styled(Responsive)``;

const schema = yup.object({
  rgb: yup.string().required(),
});

const DsInfoUpdate = ({ dsInfo, onSubmit }: DsInfoUpdateProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rgb: "",
    },
  });

  useEffect(() => {
    setValue("rgb", dsInfo?.info?.rgb);
  }, []);

  return (
    <DsInfoUpdateBlock>
      <PageHeader title="디자인 시뮬레이션 정보" />
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <Description>
          <DescriptionContent
            span="12"
            label="색상정보"
            content={
              <StyledInput
                align="vertical"
                placeholder={dsInfo?.info?.rgb}
                label="rgb"
                register={register}
                errors={errors}
                status={errors.rgb}
              />
            }
          />
        </Description>
        <Button type="submit" status="primary" withInput needMarginTop>
          수정
        </Button>
      </StyledForm>
    </DsInfoUpdateBlock>
  );
};

export default DsInfoUpdate;
