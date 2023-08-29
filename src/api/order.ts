import { accessClient, client } from "./createAPI";

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

export const findByDelivery = async (data: object) => {
  return await accessClient
    .get(`/vendor/order/byDelivery/findAll`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const deliveryFindById = async (data: object) => {
  return await accessClient
    .get(`/vendor/order/byDelivery/findById`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const countDeliveryStatus = async (data: object) => {
  return await accessClient
    .get(`/vendor/order/byDelivery/getCountByDeliveryStatus`, {
      params: { ...data },
    })
    .then((res) => res);
};

export const pageDeliveryStatus = async (data: object) => {
  return await accessClient
    .get(`/vendor/order/byDelivery/getPageByDeliveryStatus`, {
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

export const orderLog = async (data: object) => {
  return await accessClient
    .get(`/vendor/order/status/findAll`, {
      params: { ...data },
    })
    .then((res) => res);
};

export const countOrder = async (id: string) => {
  return await accessClient
    .get(`/vendor/order/item/getAllCount/${id}`)
    .then((res) => res);
};

export const pageOrder = async (data: object) => {
  return await accessClient
    .get(`/vendor/order/item/getPageByAll`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const countDelivery = async (id: string) => {
  return await accessClient
    .get(`/vendor/order/byDelivery/getAllCount/${id}`)
    .then((res) => res);
};

export const pageDelivery = async (data: object) => {
  return await accessClient
    .get(`/vendor/order/byDelivery/getPageByAll`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const countOrderStatus = async (data: object) => {
  return await accessClient
    .get(`/vendor/order/item/getCountByOrderStatus`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const pageOrderStatus = async (data: object) => {
  return await accessClient
    .get(`/vendor/order/item/getPageByOrderStatus`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};
