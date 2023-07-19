import { client } from "./createAPI";

export const findAll = async (isDesc: boolean) => {
  return client.get(`/store/product/findAll/${isDesc}`).then((res) => {
    return res.data;
  });
};

export const findById = async (id: string) => {
  return client
    .get(`/construction/common/product/findById/${id}`)
    .then((res) => {
      return res.data;
    });
};

export const findManufacturerByProductId = async (data: object) => {
  return client
    .get(`/construction/common/product/manufacturer/findAllByProductId`, {
      params: {
        ...data,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const findAllCategory = async (data: object) => {
  return client
    .get(`/construction/common/product/category/findAllByProductId`, {
      params: {
        ...data,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const findAllColorCode = async (isDesc: boolean) => {
  return client
    .get(`/construction/common/colorCode/findAll/${isDesc}`)
    .then((res) => {
      return res.data;
    });
};
