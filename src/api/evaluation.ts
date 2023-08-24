import { client } from "./createAPI";

export const findByGoodItemId = async (data: object) => {
  return await client
    .get(`/store/construction/good/item/evaluation/findByGoodItemId`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const findById = async (id: string) => {
  return await client
    .get(`/store/construction/good/item/evaluation/findById/${id}`)
    .then((res) => res);
};

export const countReview = async (id: string) => {
  return await client
    .get(`/store/construction/good/item/evaluation/getCountByGoodItemId/${id}`)
    .then((res) => res);
};

export const pageReview = async (data: object) => {
  return await client
    .get(`/store/construction/good/item/evaluation/getPageByGoodItemId`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};
