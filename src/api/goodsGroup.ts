import { accessClient, client } from "./createAPI";

export const findAll = async (isDesc: boolean) => {
  return accessClient
    .get(`/store/construction/good/group/findAll/${isDesc}`)
    .then((res) => {
      return res.data;
    });
};

export const register = async (data: object) => {
  return accessClient
    .post(`/vendor/good/group/register`, {
      ...data,
    })
    .then((res) => {
      return res.data;
    });
};

export const uploadImage = async (formData: FormData) => {
  return accessClient
    .post(`/construction/vendor/good/group/image/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const detailPage = async (formData: FormData) => {
  return accessClient
    .post(`/construction/vendor/good/group/detailPage/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const findById = async (id: string) => {
  return accessClient
    .get(`/store/construction/good/group/findById/${id}`)
    .then((res) => {
      return res.data;
    });
};

export const basicUpdate = async (data: object) => {
  return accessClient
    .post(`/vendor/good/group/update/basicInfo`, { ...data })
    .then((res) => {
      return res.data;
    });
};

export const detailUpdate = async (data: object) => {
  return accessClient
    .post(`/vendor/good/group/update/detailPage`, { ...data })
    .then((res) => {
      return res.data;
    });
};

export const goodsImageUpdate = async (data: object) => {
  return accessClient
    .post(`/vendor/good/group/update/goodImage`, { ...data })
    .then((res) => {
      return res.data;
    });
};

export const setOpenStatus = async (data: object) => {
  return accessClient
    .get(`/vendor/good/group/setOpenStatus`, {
      params: {
        ...data,
      },
    })
    .then((res) => {
      return res.data;
    });
};

//* -------------------------- goods group option
export const optionFindByGroupId = async (data: object) => {
  return client
    .get(`/construction/common/good/group/option/findAllByGoodGroupId`, {
      params: {
        ...data,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const optionRegister = async (data: object) => {
  return accessClient
    .post(`/construction/vendor/good/group/option/register`, { ...data })
    .then((res) => {
      return res.data;
    });
};

export const optionFindById = async (id: string) => {
  return accessClient
    .get(`/construction/common/good/group/option/findById/${id}`)
    .then((res) => {
      return res.data;
    });
};

export const optionUpdate = async (data: object) => {
  return accessClient
    .post(`/construction/vendor/good/group/option/update`, { ...data })
    .then((res) => {
      return res.data;
    });
};

export const optionSellStatus = async (data: object) => {
  return accessClient
    .get(`/construction/vendor/good/group/option/setSellStatus`, {
      params: {
        ...data,
      },
    })
    .then((res) => {
      return res.data;
    });
};

//* -------------------------- goods group item
export const itemRegister = async (data: object) => {
  return accessClient
    .post(`/vendor/good/item/register`, { ...data })
    .then((res) => {
      return res.data;
    });
};

export const itemFindByGroupId = async (data: object) => {
  return client
    .get(`/store/construction/good/item/findByGoodGroupId`, {
      params: {
        ...data,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const itemFindById = async (id: string) => {
  return client
    .get(`/store/construction/good/item/findById/${id}`)
    .then((res) => {
      return res.data;
    });
};

export const itemBasicUpdate = async (data: object) => {
  return accessClient
    .post(`/vendor/good/item/update/basicInfo`, { ...data })
    .then((res) => res.data);
};

export const itemDsInfoUpdate = async (data: object) => {
  return accessClient
    .post(`/vendor/good/item/update/dsInfo`, { ...data })
    .then((res) => res.data);
};

export const itemPriceUpdate = async (data: object) => {
  return accessClient
    .post(`/vendor/good/item/update/priceInfo`, { ...data })
    .then((res) => res.data);
};

export const itemUpdate = async (data: object) => {
  return accessClient
    .post(`/construction/vendor/good/item/update`, { ...data })
    .then((res) => {
      return res.data;
    });
};

export const itemSetSellStatus = async (data: object) => {
  return await accessClient
    .post(
      `/vendor/good/item/setSellStatus`,
      {},
      {
        params: {
          ...data,
        },
      }
    )
    .then((res) => {
      return res.data;
    });
};
