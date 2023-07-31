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
import { PriceModule } from "./priceModule";

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

const PriceUpdate = ({ priceInfo, onSubmit }: PriceUpdateProps) => {
  // useEffect(() => {
  //   const newItemList = priceInfo?.info?.priceNums.map((item: any) => {
  //     return {
  //       priceNumId: item.id,
  //       price: item.info.price,
  //       salePrice: item.info.salePrice,
  //       deliveryId: item.info.specNum?.info?.spec?.info?.delivery?.id,
  //     };
  //   });
  //   setValue("priceInfo", newItemList);
  // }, [priceInfo]);

  return (
    <PriceUpdateBlock>
      <PageHeader title="가격정보" />

      <Description>
        {priceInfo?.info?.priceNums.map((item: any, index: number) => {
          return (
            <PriceModule key={index} priceInfo={item} onSubmit={onSubmit} />
          );
        })}
      </Description>
    </PriceUpdateBlock>
  );
};

export default PriceUpdate;
