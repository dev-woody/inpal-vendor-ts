import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodsGroupDetail from "components/goodsGroup/update";
import { vendorProductActions } from "reducers/product/vendorProduct";
import { vendorGoodsGroupActions } from "reducers/goodsGroup/vendorGoodsGroup";

const GoodsGroupUpdateContainer = () => {
  const { goodsGroup, categoryList } = useAppSelector((state) => ({
    goodsGroup: state.vendorGoodsGroup.findById,
    categoryList: state.vendorProduct.findAllCategory,
  }));
  const [newCategory, setNewCategory] = useState<{ [key: string]: any }[]>([]);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    let category: { [key: string]: any }[] = [];
    if (categoryList.success && goodsGroup.success) {
      const categoryInfo = goodsGroup?.data?.productCategoryInfo;
      const selectCategory1st = categoryInfo?.productCategory1stInfos.map(
        (list: any) => {
          return {
            id: list.productCategory1st.id,
            description: list.productCategory1st.description,
          };
        }
      );
      const selectCategory2nd = categoryInfo?.productCategory2ndInfos.map(
        (list: any) => {
          return {
            id: list.productCategory2nd.id,
            description: list.productCategory2nd.description,
          };
        }
      );
      const selectCategory3rd = categoryInfo?.productCategory3rdInfos.map(
        (list: any) => {
          return {
            id: list.productCategory3rd.id,
            description: list.productCategory3rd.description,
          };
        }
      );
      // categoryList.data.map((list1st: any) => {
      //   category.push({
      //     id: list1st.id,
      //     description: list1st.description,
      //     checked: false,
      //     category2nd: list1st.category2nd.map((list2nd: any) => {
      //       return {
      //         id: list2nd.id,
      //         description: list2nd.description,
      //         checked: false,
      //         category3rd: list2nd.category3rd.map((list3rd: any) => {
      //           return {
      //             id: list3rd.id,
      //             description: list3rd.description,
      //             checked: false,
      //           };
      //         }),
      //       };
      //     }),
      //   });
      // });
      category.map((list1st: any) => {
        for (let i = 0; i < selectCategory1st.length; i++) {
          if (selectCategory1st[i].id === list1st.id) {
            list1st.checked = true;
          }
        }
        if (list1st.category2nd) {
          const category2nd = list1st.category2nd;
          category2nd.map((list2nd: any) => {
            for (let i = 0; i < selectCategory2nd.length; i++) {
              if (selectCategory2nd[i].id === list2nd.id) {
                list2nd.checked = true;
              }
            }
            if (category2nd.category3rd) {
              const category3rd = category2nd.category3rd;
              category3rd.map((list3rd: any) => {
                for (let i = 0; i < selectCategory3rd.length; i++) {
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
  }, [categoryList, goodsGroup]);

  useEffect(() => {
    dispatch(vendorGoodsGroupActions.findById(id));
    dispatch(vendorProductActions.findAll(false));
    return () => {
      dispatch(vendorGoodsGroupActions.reset("findAll"));
    };
  }, []);

  return (
    <GoodsGroupDetail
      goodsGroup={goodsGroup}
      categoryList={newCategory}
      setNewCategory={setNewCategory}
    />
  );
};

export default GoodsGroupUpdateContainer;
