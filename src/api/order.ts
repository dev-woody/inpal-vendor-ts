import { accessClient } from "./createAPI";

export const findAll = async (data: object) => {
  return await accessClient
    .post(`/vendor/order/findAll`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};
