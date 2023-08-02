import { accessClient } from "./createAPI";

export const findAll = async (data: object) => {
  return await accessClient
    .get(`/vendor/order/findAll`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const findById = async (data: object) => {
  return await accessClient
    .get(`/vendor/order/findById`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const deliveryFindAll = async (data: object) => {
  return await accessClient
    .post(`/vendor/order/findAll`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const itemFindAll = async (data: object) => {
  return await accessClient
    .get(`/vendor/order/item/findAll`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const itemFindById = async (data: object) => {
  return await accessClient
    .get(`/vendor/order/item/findById`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const setStatus = async (data: any) => {
  return await accessClient
    .post(`/vendor/order/status/${data.url}`, { ...data })
    .then((res) => res);
};
