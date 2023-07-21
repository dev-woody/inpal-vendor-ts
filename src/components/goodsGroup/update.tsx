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

  useEffect(() => {
    let productCategory1sts: { id: string }[] = [];
    let productCategory2nds: { id: string }[] = [];
    let productCategory3rds: { id: string }[] = [];
    categoryList.map(
      (list1st) =>
        list1st.checked && productCategory1sts.push({ id: list1st.id })
    );
    categoryList.map((list1st) =>
      list1st.category2nd.map(
        (list2nd: any) =>
          list2nd.checked && productCategory2nds.push({ id: list2nd.id })
      )
    );
    categoryList.map((list1st) =>
      list1st.category2nd.map((list2nd: any) =>
        list2nd.category3rd.map(
          (list3rd: any) =>
            list3rd.checked && productCategory3rds.push({ id: list3rd.id })
        )
      )
    );
    // setValue("productCategoryInfo", {
    //   productCategory1sts,
    //   productCategory2nds,
    //   productCategory3rds,
    // });
  }, [categoryList]);

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
