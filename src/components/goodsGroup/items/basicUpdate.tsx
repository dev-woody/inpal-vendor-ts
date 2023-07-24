import styled from "styled-components";
import {
  Button,
  Description,
  DescriptionContent,
  Responsive,
  StyledForm,
  StyledInput,
  StyledSelect,
  StyledToggle,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { response } from "types/globalTypes";

type BasicUpdateProps = {
  basicInfo: any;
  colorCode: response;
  onSubmit: (data: object) => void;
};

const BasicUpdateBlock = styled(Responsive)``;

const schema = yup.object({
  model: yup.string().required(),
  name: yup.string().required(),
  isOrderMade: yup.boolean(),
  colorCodeId: yup.string().required(),
});

const BasicUpdate = ({ basicInfo, colorCode, onSubmit }: BasicUpdateProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      model: "",
      name: "",
      isOrderMade: false,
      colorCodeId: "",
    },
  });

  const [isToggle, setIsToggle] = useState(basicInfo?.info?.isOrderMade);

  useEffect(() => {
    setValue("model", basicInfo?.info?.model);
    setValue("name", basicInfo?.info?.name);
    setValue("isOrderMade", basicInfo?.info?.isOrderMade);
    setValue("colorCodeId", basicInfo?.info?.colorCode.id);
  }, []);

  return (
    <BasicUpdateBlock>
      <PageHeader title="기본정보" />
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <Description>
          <DescriptionContent
            span="12"
            label="모델명"
            content={
              <StyledInput
                align="vertical"
                placeholder={basicInfo?.info?.model}
                label="model"
                register={register}
                errors={errors}
                status={errors.model}
              />
            }
          />
          <DescriptionContent
            span="12"
            label="상품명"
            content={
              <StyledInput
                align="vertical"
                placeholder={basicInfo?.info?.name}
                label="name"
                register={register}
                errors={errors}
                status={errors.name}
              />
            }
          />
          <DescriptionContent
            span="12"
            label="주문시 환불 불가"
            content={
              <StyledToggle
                data={isToggle ? "사용" : "미사용"}
                openStatus="사용"
                action={(data) => {
                  setIsToggle(data === "사용" ? false : true);
                  setValue("isOrderMade", data === "사용" ? false : true);
                }}
              />
            }
          />
          <DescriptionContent
            span="12"
            label="색상계열"
            content={
              <StyledSelect
                optionList={colorCode.data}
                placeholder={basicInfo?.info?.colorCode?.info?.name}
                label="colorCodeId"
                register={register}
                errors={errors}
                status={errors?.colorCodeId}
                setValue={setValue}
                align="vertical"
                index="2"
              />
            }
          />
        </Description>
        <Button type="submit" status="primary" withInput needMarginTop>
          수정
        </Button>
      </StyledForm>
    </BasicUpdateBlock>
  );
};

export default BasicUpdate;
