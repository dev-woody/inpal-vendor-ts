import { response } from "types/globalTypes";
import { useEffect } from "react";
import GoodsGroupItemsContainer from "containers/goodsGroup/items/itemsContainer";
import BasicInfoUpdateContainer from "containers/goodsGroup/basicInfoUpdateContainer";
import DetailUpdateContainer from "containers/goodsGroup/detailPageUpdateContainer";
import GoodsImageUpdateContainer from "containers/goodsGroup/goodsImageUpdateContainer";

type DetailProps = {
  goodsGroup: response;
  categoryList: { [key: string]: any }[];
  setNewCategory: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: any;
      }[]
    >
  >;
};

const GoodsGroupDetail = ({
  goodsGroup,
  categoryList,
  setNewCategory,
}: DetailProps) => {
  const data = goodsGroup.data;

  return (
    <>
      <BasicInfoUpdateContainer basicInfo={data?.info?.basic} />
      <DetailUpdateContainer detailPage={data?.info?.detailPage} />
      <GoodsImageUpdateContainer goodsIamge={data?.info?.goodImages} />
      <GoodsGroupItemsContainer />
    </>
  );
};

export default GoodsGroupDetail;
