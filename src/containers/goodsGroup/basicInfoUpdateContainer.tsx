import BasicInfoUpdate from "components/goodsGroup/basicInfoUpdate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";
import { vendorGoodsSpecActions } from "reducers/goodsGroup/vendorGoodsSpec";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const BasicInfoUpdateContainer = ({ basicInfo }: { basicInfo: any }) => {
  const [newCategory, setNewCategory] = useState<{ [key: string]: any }[]>([]);
  const {
    user,
    goodsGroupInfo,
    productList,
    propertyList,
    categoryList,
    manufacturerList,
  } = useAppSelector((store) => ({
    user: store.user,
    goodsGroupInfo: store.vendorGoodsGroup.findById,
    productList: store.vendorProduct.findAll,
    propertyList: store.vendorProduct.findAllProperty,
    categoryList: store.vendorProduct.findAllCategory,
    manufacturerList: store.vendorProduct.findManufacturerByProductId,
  }));

  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    dispatch(
      vendorGoodsGroupActions.basicUpdate({ vendorId: user.vendorId, ...data })
    );
  };

  useEffect(() => {
    let category: { [key: string]: any }[] = [];
    if (
      checkStatus(categoryList.status) &&
      checkStatus(goodsGroupInfo.status)
    ) {
      const categoryInfo =
        goodsGroupInfo?.data?.info?.basic?.info?.handleCategorys?.info;
      const selectCategory1st = categoryInfo?.handleCategory1sts.map(
        (list: any) => {
          return {
            id: list?.info?.category?.id,
            description: list?.info?.category?.info.description,
          };
        }
      );
      const selectCategory2nd = categoryInfo?.handleCategory2nds.map(
        (list: any) => {
          return {
            id: list?.info?.category?.id,
            description: list?.info?.category?.info.description,
          };
        }
      );
      const selectCategory3rd = categoryInfo?.handleCategory3rds.map(
        (list: any) => {
          return {
            id: list?.info?.category?.id,
            description: list?.info?.category?.info.description,
          };
        }
      );
      categoryList.data?.category1sts?.map((list1st: any) => {
        category.push({
          id: list1st.category1st.id,
          description: list1st.category1st.info.description,
          checked: false,
          category2nd: list1st.category2nds.map((list2nd: any) => {
            return {
              id: list2nd.category2nd.id,
              description: list2nd.category2nd.info.description,
              checked: false,
              category3rd: list2nd.category3rds.map((list3rd: any) => {
                return {
                  id: list3rd.category3rd.id,
                  description: list3rd.category3rd.info.description,
                  checked: false,
                };
              }),
            };
          }),
        });
      });
      category.map((list1st: any) => {
        for (let i = 0; i < selectCategory1st?.length; i++) {
          if (selectCategory1st[i].id === list1st.id) {
            list1st.checked = true;
          }
        }
        if (list1st.category2nd) {
          const category2nd = list1st.category2nd;
          category2nd.map((list2nd: any) => {
            for (let i = 0; i < selectCategory2nd?.length; i++) {
              if (selectCategory2nd[i].id === list2nd.id) {
                list2nd.checked = true;
              }
            }
            if (category2nd.category3rd) {
              const category3rd = category2nd.category3rd;
              category3rd.map((list3rd: any) => {
                for (let i = 0; i < selectCategory3rd?.length; i++) {
                  if (selectCategory3rd[i].id === list3rd.id) {
                    list3rd.checked = true;
                  }
                }
              });
            }
          });
        }
      });
    }
    setNewCategory(category);
  }, [categoryList, goodsGroupInfo]);

  useEffect(() => {
    if (checkStatus(goodsGroupInfo.status)) {
      const data = {
        productId: goodsGroupInfo.data.info.basic.info.product.id,
        isDesc: false,
      };
      dispatch(vendorProductActions.findAllCategory(data));
      dispatch(vendorProductActions.findManufacturerByProductId(data));
      dispatch(vendorProductActions.findAllProperty(data));
      dispatch(
        vendorGoodsSpecActions.findAllByProductId({
          vendorId: user.vendorId,
          ...data,
        })
      );
    }
  }, [goodsGroupInfo]);

  return (
    <BasicInfoUpdate
      basicInfo={basicInfo}
      productList={productList}
      propertyList={propertyList}
      categoryList={newCategory}
      setNewCategory={setNewCategory}
      manufacturerList={manufacturerList}
      onSubmit={onSubmit}
    />
  );
};

export default BasicInfoUpdateContainer;
