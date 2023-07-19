import { accessClient } from "./createAPI";

export const register = async (data: any) => {
  const { vendorId, productId, basicFee, freeCondition } = data;
  return accessClient
    .post(`/construction/vendor/delivery/register`, {
      vendorId,
      productId,
      basicFee: Number(basicFee),
      freeCondition: Number(freeCondition),
    })
    .then((res) => {
      return res.data;
    });
};

export const findAll = async (data: any) => {
  return accessClient(`/construction/vendor/delivery/findAllByVendorId`, {
    params: {
      ...data,
    },
  }).then((res) => {
    return res.data;
  });
};

export const findById = async (id: string) => {
  return accessClient
    .get(`/construction/vendor/delivery/findById/${id}`)
    .then((res) => {
      return res.data;
    });
};

export const update = async (data: object) => {
  return accessClient
    .post(`/construction/vendor/delivery/update`, {
      ...data,
    })
    .then((res) => {
      return res.data;
    });
};

export const findByPId = async (data: object) => {
  return accessClient
    .get(`/construction/vendor/delivery/findAllByVendorIdAndProductId`, {
      params: {
        ...data,
      },
    })
    .then((res) => {
      return res.data;
    });
};
