import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { userActions } from "reducers/user";
import { vendorAdminActions } from "reducers/admin/vendorAdmin";
import { vendorProductActions } from "reducers/product/vendorProduct";
import RegisterForm from "components/auth/registerForm";
import { uploadImgActions } from "reducers/common/uploadImg";

function RegisterContainer() {
  const navigate = useNavigate();
  const { productList, isRegister, imageUpload } = useAppSelector((state) => ({
    productList: state.vendorProduct.findAll,
    isRegister: state.vendorAdmin.signUp,
    imageUpload: state.uploadImg,
  }));

  const dispatch = useAppDispatch();
  const [errors, setErrorMsg] = useState<string>("");

  const onUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    subject: string,
    type: string
  ) => {
    const files = e.target.files ? e.target.files : "";
    const formData = new FormData();
    formData.append("image", files[0]);
    formData.append("subject", subject);
    formData.append("type", type);
    dispatch(uploadImgActions.postUpload({ formData }));
  };

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(vendorAdminActions.signUp(data));
  };

  useEffect(() => {
    dispatch(vendorProductActions.findAll(false));
    dispatch(vendorAdminActions.reset("signUp"));
    return () => {
      dispatch(vendorProductActions.reset("findAll"));
      dispatch(vendorAdminActions.reset("signUp"));
    };
  }, []);

  useEffect(() => {
    if (isRegister.success) {
      navigate("/auth/signIn");
    }
  }, [isRegister]);

  return (
    <RegisterForm
      productList={productList.data}
      isRegister={isRegister}
      imageUpload={imageUpload}
      onUpload={onUpload}
      onSubmit={onSubmit}
    />
  );
}

export default RegisterContainer;
