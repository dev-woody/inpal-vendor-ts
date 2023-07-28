import { accessClient } from "./createAPI";

export const register = async (data: any) => {
  const { vendorId, productId, basicFee, freeCondition } = data;
  return accessClient
    .post(`/vendor/delivery/register`, {
      vendorId,
      productId,
      basicFee: Number(basicFee),
      freeCondition: Number(freeCondition),
    })
    .then((res) => {
      return res;
    });
};

export const update = async (data: object) => {
  return accessClient
    .post(`/vendor/delivery/update`, {
      ...data,
    })
    .then((res) => {
      return res;
    });
};

export const findAll = async (data: any) => {
  return accessClient(`/vendor/delivery/findAll`, {
    params: {
      ...data,
    },
  }).then((res) => {
    return res;
  });
};

export const findById = async (data: object) => {
  return accessClient
    .get(`/vendor/delivery/findById`, {
      params: {
        ...data,
      },
    })
    .then((res) => {
      return res;
    });
};

export const findAllByProductId = async (data: object) => {
  return accessClient
    .get(`/vendor/delivery/findByProductId`, {
      params: {
        ...data,
      },
    })
    .then((res) => {
      return res;
    });
};
