import { client } from "./createAPI";

export const uploadImg = async (imageData: FormData) => {
  return await client
    .post(`/common/image/upload`, imageData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res);
};

export const displayImg = async (data: object) => {
  return await client
    .post(`/common/image/display`, { ...data })
    .then((res) => res);
};

export const findByIdImg = async (id: string) => {
  return await client.post(`/common/image/findById`, { id }).then((res) => res);
};
