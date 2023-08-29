import { response } from "types/globalTypes";
import GoodsGroupItemsContainer from "containers/goodsGroup/items/itemsContainer";
import BasicInfoUpdateContainer from "containers/goodsGroup/basicInfoUpdateContainer";
import DetailUpdateContainer from "containers/goodsGroup/detailPageUpdateContainer";
import GoodsImageUpdateContainer from "containers/goodsGroup/goodsImageUpdateContainer";
import { BreadCrumb, Responsive } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import styled from "styled-components";

type DetailProps = {
  goodsGroup: response;
  id: string | undefined;
};

const GoodsGroupDetailBlock = styled(Responsive)``;

const GoodsGroupDetail = ({ goodsGroup, id }: DetailProps) => {
  const data = goodsGroup.data;
  const { n, d } = JSON.parse(sessionStorage.getItem("groupPageInfo") || "{}");
  return (
    <>
      <GoodsGroupDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹관리 /",
                  url: `/goods/groups?n=${n}&d=${d}`,
                },
                {
                  name: "상세정보 및 수정",
                  url: `/goods/groups/detail/${id}`,
                },
              ]}
            />
          }
        />
      </GoodsGroupDetailBlock>
      <BasicInfoUpdateContainer basicInfo={data?.info?.basic} />
      <GoodsImageUpdateContainer goodsIamge={data?.info?.goodImages} />
      <DetailUpdateContainer detailPage={data?.info?.detailPage} />
      <GoodsGroupItemsContainer />
    </>
  );
};

export default GoodsGroupDetail;
