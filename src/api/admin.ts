import { accessClient, client } from "./createAPI";

export const vendorRegister = async (data: any) => {
  return client
    .post(`/construction/vendor/register/request`, { ...data })
    .then((res) => {
      return res.data;
    });
};

export const vendorLogin = async (data: object) => {
  return client.post(`/vendor/admin/signIn`, { ...data }).then((res) => {
    if (res.data.success === true) {
      localStorage.setItem("access_token", res.data.data.tokenInfo.token);
      localStorage.setItem(
        "refresh_token",
        res.data.data.tokenInfo.refreshToken
      );
      localStorage.setItem("user", JSON.stringify(res.data.data.adminInfo));
    }
    return res.data;
  });
};

export const checkPassword = async (userId: string, password: string) => {
  return accessClient
    .post(`/construction/vendor/admin/passwordChange`, { userId, password })
    .then((res) => {
      return res.data;
    });
};

export const update = async (userId: string, email: string, phone: string) => {
  return accessClient
    .post(`/vendor/admin/update`, { userId, email, phone })
    .then((res) => {
      return res.data;
    });
};

export const signUp = async (data: object) => {
  return accessClient
    .post(`/common/biz/request/vendor`, { ...data })
    .then((res) => {
      return res.data;
    });
};

export const signInUpload = async (formData: FormData) => {
  return client
    .post(`/construction/vendor/register/info/image/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const findAllUnit = async (data: object) => {
  return client
    .get(`/construction/common/product/unit/findAllByProductId`, {
      params: { ...data },
    })
    .then((res) => {
      return res.data;
    });
};
