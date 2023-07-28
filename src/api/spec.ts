import { accessClient, client } from "./createAPI";

export const register = async (data: object) => {
  return accessClient
    .post(`/vendor/good/spec/register`, { ...data })
    .then((res) => res);
};

export const update = async (data: object) => {
  return accessClient
    .post(`/vendor/good/spec/update`, {
      ...data,
    })
    .then((res) => res);
};

export const findAll = async (data: object) => {
  return accessClient
    .get(`/vendor/good/spec/findAll`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const findById = async (data: object) => {
  return accessClient
    .get(`/vendor/good/spec/findById`, { params: { ...data } })
    .then((res) => res);
};

export const findAllByProductId = async (data: object) => {
  return accessClient
    .get(`/vendor/good/spec/findByProductId`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};
