import { accessClient, client } from "./createAPI";

export const findAll = async (data: object) => {
  return client
    .get(`/vendor/good/group/findAll`, {
      params: {
        ...data,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const register = async (data: object) => {
  return accessClient
    .post(`}/vendor/good/group/register`, {
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

//todo 파라미터로 바꿔야함
export const findById = async (data: object) => {
  return client
    .get(`/vendor/good/group/findById`, { params: { ...data } })
    .then((res) => {
      return res.data;
    });
};

//todo 업데이트 3개로 나눠야함
export const update = async (data: object) => {
  return accessClient
    .post(`/construction/vendor/good/group/update`, { ...data })
    .then((res) => {
      return res.data;
    });
};

export const groupSetSellStatus = async (data: object) => {
  return accessClient
    .get(`/construction/vendor/good/group/setSellStatus`, {
      params: {
        ...data,
      },
    })
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

//! -------------------------- goods group option
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

//! -------------------------- goods group item
export const itemRegister = async (data: object) => {
  return accessClient
    .post(`/construction/vendor/good/item/register`, { ...data })
    .then((res) => {
      return res.data;
    });
};

export const itemFindByGroupId = async (data: object) => {
  return client
    .get(`/construction/common/good/item/findAllByGoodGroupId`, {
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
    .get(`/construction/common/good/item/findById/${id}`)
    .then((res) => {
      return res.data;
    });
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
    .get(`/construction/vendor/good/item/setSellStatus`, {
      params: {
        ...data,
      },
    })
    .then((res) => {
      return res.data;
    });
};
