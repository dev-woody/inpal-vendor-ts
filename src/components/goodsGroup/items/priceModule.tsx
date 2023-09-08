import {
  Button,
  DescriptionContent,
  StyledForm,
  StyledInput,
} from "lib/styles";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

type PriceUpdateProps = {
  priceInfo: any;
  onSubmit: (data: object) => void;
};

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
  priceInfo: yup.object({
    priceNumId: yup.string(),
    price: yup.string(),
    salePrice: yup.string(),
    deliveryId: yup.string(),
  }),
});

export const PriceModule = ({ priceInfo, onSubmit }: PriceUpdateProps) => {
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
    setValue("priceInfo", {
      priceNumId: priceInfo?.id,
      price: priceInfo?.info?.price,
      salePrice: priceInfo?.info?.salePrice,
      deliveryId: priceInfo?.info?.specNum?.info?.spec?.info?.delivery?.id,
    });
  }, [priceInfo]);

  return (
      <div
      >
        <DescriptionContent
          span="12"
          label={`${
            priceInfo?.info?.specNum?.info?.spec?.info?.quantity +
            priceInfo?.info?.specNum?.info?.spec?.info?.unit?.info?.nameKr
          } `}
          content={
            <div style={{ display: "flex" }}>
              <PriceItem>정상가</PriceItem>
              <PriceItem>
                <StyledInput
                  align="vertical"
                  placeholder={priceInfo?.info?.price}
                  label={`priceInfo.price`}
                  register={register}
                  endItem="원"
                />
              </PriceItem>
              <PriceItem>세일가</PriceItem>
              <PriceItem>
                <StyledInput
                  align="vertical"
                  placeholder={priceInfo?.info?.salePrice}
                  label={`priceInfo.salePrice`}
                  register={register}
                  endItem="원"
                />
              </PriceItem>
              <Button
                type="submit"
                status="primary"
                style={{ margin: "0.25rem 0" }}
                onClick={handleSubmit(
                  (data) => onSubmit(data),
                  (errors) => console.log(errors)
                )}
              >
                수정
              </Button>
            </div>
          }
        />
      </div>
  );
};
