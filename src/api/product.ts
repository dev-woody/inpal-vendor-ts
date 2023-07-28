import { client } from "./createAPI";

export const findAll = async (isDesc: boolean) => {
  return client.get(`/store/product/findAll/${isDesc}`).then((res) => {
    return res;
  });
};

export const findById = async (id: string) => {
  return client.get(`/store/product/findById/${id}`).then((res) => {
    return res;
  });
};

export const findManufacturerByProductId = async (data: object) => {
  return client
    .get(`/store/product/manufacturer/findAllByProductId`, {
      params: {
        ...data,
      },
    })
    .then((res) => {
      return res;
    });
};

export const findAllProperty = async (data: object) => {
  return client
    .get(`/store/product/property/findAllByProductId`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const findAllCategory = async (data: object) => {
  return client
    .get(`/store/product/category/findAllByProductId`, {
      params: {
        ...data,
      },
    })
    .then((res) => {
      return res;
    });
};

export const findAllColorCode = async (isDesc: boolean) => {
  return client.get(`/store/color_code/findAll/${isDesc}`).then((res) => {
    return res;
  });
};

export const findUnitByProductId = async (data: object) => {
  return client
    .get(`/store/product/unit/findAllByProductId`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};
