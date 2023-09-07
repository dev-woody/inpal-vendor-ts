import { accessClient, client } from "./createAPI";

export const vendorLogin = async (data: object) => {
  return client.post(`/vendor/admin/signIn`, { ...data }).then((res) => {
    return res;
  });
};

export const checkPassword = async (userId: string, password: string) => {
  return accessClient
    .post(`/construction/vendor/admin/passwordChange`, { userId, password })
    .then((res) => {
      return res;
    });
};

export const changePass = async (data: object) => {
  return accessClient
    .post(`/vendor/admin/passwordChange`, { ...data })
    .then((res) => {
      return res;
    });
};

export const update = async (data: object) => {
  return accessClient.post(`/vendor/admin/update`, { ...data }).then((res) => {
    return res;
  });
};

export const signUp = async (data: object) => {
  return accessClient
    .post(`/common/biz/request/vendor`, { ...data })
    .then((res) => {
      return res;
    });
};

export const register = async (data: object) => {
  return accessClient.post(`/vendor/admin/signUp`, { ...data }).then((res) => {
    return res;
  });
};

export const findAll = async (data: object) => {
  return accessClient
    .get(`/vendor/admin/findAllByVendorId`, { params: { ...data } })
    .then((res) => res);
};

export const findByUserId = async (data: object) => {
  return accessClient
    .get(`/vendor/admin/findByVendorIdAndUserId`, { params: { ...data } })
    .then((res) => res);
};

export const mypage = async (id:string) => {
  return accessClient.get(`/vendor/myPage/${id}`).then((res) => res);
};

export const findCompany = async (id: string) => {
  return client.get(`/store/biz/vendor/findById/${id}`).then((res) => res);
};

export const findAllUnit = async (data: object) => {
  return client
    .get(`/construction/common/product/unit/findAllByProductId`, {
      params: { ...data },
    })
    .then((res) => {
      return res;
    });
};

export const basicInfo = async (data: object) => {
  return accessClient
    .post(`/vendor/update/basicInfo`, { ...data })
    .then((res) => res);
};

export const registrationInfo = async (data: object) => {
  return accessClient
    .post(`/vendor/update/registrationInfo`, { ...data })
    .then((res) => res);
};

export const accountInfo = async (data: object) => {
  return accessClient
    .post(`/vendor/update/accountInfo`, { ...data })
    .then((res) => res);
};

export const serviceInfo = async (data: object) => {
  return accessClient
    .post(`/vendor/update/serviceInfo`, { ...data })
    .then((res) => res);
};

export const addressInfo = async (data: object) => {
  return accessClient
    .post(`/vendor/update/addressInfo`, { ...data })
    .then((res) => res);
};
