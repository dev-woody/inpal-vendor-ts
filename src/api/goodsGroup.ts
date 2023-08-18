import { accessClient, client } from "./createAPI";

export const findAll = async (data: object) => {
  return accessClient
    .get(`/store/construction/good/group/findByVendorId`, {
      params: { ...data },
    })
    .then((res) => {
      return res;
    });
};

export const register = async (data: object) => {
  return accessClient
    .post(`/vendor/good/group/register`, {
      ...data,
    })
    .then((res) => {
      return res;
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
      return res;
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
      return res;
    });
};

export const findById = async (id: string) => {
  return accessClient
    .get(`/store/construction/good/group/findById/${id}`)
    .then((res) => {
      return res;
    });
};

export const basicUpdate = async (data: object) => {
  return accessClient
    .post(`/vendor/good/group/update/basicInfo`, { ...data })
    .then((res) => {
      return res;
    });
};

export const detailUpdate = async (data: object) => {
  return accessClient
    .post(`/vendor/good/group/update/detailPage`, { ...data })
    .then((res) => {
      return res;
    });
};

export const goodsImageUpdate = async (data: object) => {
  return accessClient
    .post(`/vendor/good/group/update/goodImage`, { ...data })
    .then((res) => {
      return res;
    });
};

export const setOpenStatus = async (data: object) => {
  return accessClient
    .post(
      `/vendor/good/group/setOpenStatus`,
      {},
      {
        params: {
          ...data,
        },
      }
    )
    .then((res) => {
      return res;
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
      return res;
    });
};

export const optionRegister = async (data: object) => {
  return accessClient
    .post(`/construction/vendor/good/group/option/register`, { ...data })
    .then((res) => {
      return res;
    });
};

export const optionFindById = async (id: string) => {
  return accessClient
    .get(`/construction/common/good/group/option/findById/${id}`)
    .then((res) => {
      return res;
    });
};

export const optionUpdate = async (data: object) => {
  return accessClient
    .post(`/construction/vendor/good/group/option/update`, { ...data })
    .then((res) => {
      return res;
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
      return res;
    });
};

//* -------------------------- goods group item
export const itemRegister = async (data: object) => {
  return accessClient
    .post(`/vendor/good/item/register`, { ...data })
    .then((res) => {
      return res;
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
      return res;
    });
};

export const itemFindById = async (id: string) => {
  return client
    .get(`/store/construction/good/item/findById/${id}`)
    .then((res) => {
      return res;
    });
};

export const itemBasicUpdate = async (data: object) => {
  return accessClient
    .post(`/vendor/good/item/update/basicInfo`, { ...data })
    .then((res) => res);
};

export const itemDsInfoUpdate = async (data: object) => {
  return accessClient
    .post(`/vendor/good/item/update/dsInfo`, { ...data })
    .then((res) => res);
};

export const itemPriceUpdate = async (data: object) => {
  return accessClient
    .post(`/vendor/good/item/update/priceInfo`, { ...data })
    .then((res) => res);
};

export const itemUpdate = async (data: object) => {
  return accessClient
    .post(`/construction/vendor/good/item/update`, { ...data })
    .then((res) => {
      return res;
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
      return res;
    });
};

export const pageGoodsGroup = async (data: object) => {
  return await client
    .get(`/store/construction/good/group/getPageByAll`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};
