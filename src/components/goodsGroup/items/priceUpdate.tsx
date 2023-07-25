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

type PriceUpdateProps = {
  priceInfo: any;
  onSubmit: (data: object) => void;
};

const PriceUpdateBlock = styled(Responsive)``;

const PriceItem = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
`;

const PriceSpan = styled.span`
  font-size: 0.75rem;
  margin-left: 0.25rem;
`;

const schema = yup.object({
  priceInfo: yup.array().of(
    yup.object({
      priceNumId: yup.string(),
      price: yup.number(),
      salePrice: yup.number(),
      deliveryId: yup.string(),
    })
  ),
});

const PriceUpdate = ({ priceInfo, onSubmit }: PriceUpdateProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      priceInfo: {},
    },
  });

  useEffect(() => {
    const newItemList = priceInfo?.info?.priceNums.map((item: any) => {
      return {
        priceNumId: item.id,
        price: item.info.price,
        salePrice: item.info.salePrice,
        deliveryId: item.info.specNum?.info?.spec?.info?.delivery?.id,
      };
    });
    setValue("priceInfo", newItemList);
  }, [priceInfo]);

  return (
    <PriceUpdateBlock>
      <PageHeader title="가격정보" />
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <Description>
          {priceInfo?.info?.priceNums.map((item: any, index: number) => {
            return (
              <DescriptionContent
                key={index}
                span="12"
                label={`${
                  item.info.specNum.info.spec.info.quantity +
                  item.info.specNum.info.spec.info.unit.info.nameKr
                } `}
                content={
                  <div style={{ display: "flex" }}>
                    <PriceItem>정상가</PriceItem>
                    <PriceItem>
                      <StyledInput
                        align="vertical"
                        placeholder={item.info.price}
                        label={`priceInfo[${index}].price`}
                        register={register}
                      />
                      <PriceSpan>원 |</PriceSpan>
                    </PriceItem>
                    <PriceItem>세일가</PriceItem>
                    <PriceItem>
                      <StyledInput
                        align="vertical"
                        placeholder={item.info.salePrice}
                        label={`priceInfo[${index}].salePrice`}
                        register={register}
                      />
                      <PriceSpan>원</PriceSpan>
                    </PriceItem>
                  </div>
                }
              />
            );
          })}
        </Description>
        <Button type="submit" status="primary" withInput needMarginTop>
          수정
        </Button>
      </StyledForm>
    </PriceUpdateBlock>
  );
};

export default PriceUpdate;
