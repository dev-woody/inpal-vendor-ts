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
import BasicInfoUpdateContainer from "containers/goodsGroup/items/basicInfoUpdateContainer";
import DsInfoUpdateContainer from "containers/goodsGroup/items/dsInfoUpdaeContainer";
import PriceInfoUpdateContainer from "containers/goodsGroup/items/priceInfoUpdateContainer";
import EvaluationUpdateContainer from "containers/goodsGroup/items/evaluationUpdateContainer";

const GoodsGroupItemDetailBlock = styled(Responsive)``;

type ItemProps = {
  itemData: response;
  id: string | undefined;
};

const GoodsGroupItemDetail = ({ itemData, id }: ItemProps) => {
  const { n, d } = JSON.parse(sessionStorage.getItem("groupPageInfo") || "{}");
  return (
    <>
      <GoodsGroupItemDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹관리 /",
                  url: `/goods/groups?n=${n}&d=${d}`,
                },
                {
                  name: "상세정보 및 수정 /",
                  url: `/goods/groups/detail/${id}`,
                },
                {
                  name: "아이템 상세정보",
                  url: "",
                },
              ]}
            />
          }
        />
      </GoodsGroupItemDetailBlock>
      <BasicInfoUpdateContainer basicInfo={itemData?.data?.info?.basic} />
      <DsInfoUpdateContainer dsInfo={itemData?.data?.info?.dsInfo} />
      <PriceInfoUpdateContainer priceInfo={itemData?.data?.info?.priceOwner} />
      <EvaluationUpdateContainer
        evaluationSummary={itemData?.data?.info?.evaluationSummary}
      />
    </>
  );
};

export default GoodsGroupItemDetail;
