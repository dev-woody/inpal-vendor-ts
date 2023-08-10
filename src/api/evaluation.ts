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
