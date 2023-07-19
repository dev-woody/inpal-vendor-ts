export type response = {
  success: boolean;
  data: any;
  message: string;
};

export const responseForm: response = {
  success: false,
  data: null,
  message: "",
};

export type propsTypes = {
  [key: string]: any;
};
