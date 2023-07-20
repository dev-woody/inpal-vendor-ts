import { client } from "./createAPI";

export const findAll = async (isDesc: boolean) => {
  return client.get(`/store/product/findAll/${isDesc}`).then((res) => {
    return res.data;
  });
};

export const findById = async (id: string) => {
  return client.get(`/store/product/findById/${id}`).then((res) => {
    return res.data;
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
      return res.data;
    });
};

export const findAllProperty = async (data: object) => {
  return client
    .get(`/store/product/property/findAllByProductId`, {
      params: {
        ...data,
      },
    })
    .then((res) => res.data);
};

export const findAllCategory = async (data: object) => {
  return client
    .get(`/store/product/category/findAllByProductId`, {
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

export const findUnitByProductId = async (data: object) => {
  return client
    .get(`/store/product/unit/findAllByProductId`, {
      params: {
        ...data,
      },
    })
    .then((res) => res.data);
};
