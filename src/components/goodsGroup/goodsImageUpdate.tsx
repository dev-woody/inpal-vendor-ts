import styled from "styled-components";
import {
  Button,
  Description,
  DescriptionContent,
  ErrorMsg,
  Modal,
  Responsive,
  StyledCategory,
  StyledForm,
  StyledInput,
  StyledSelect,
  StyledUpload,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { response } from "types/globalTypes";

const GoodsImageUpdateBlock = styled(Responsive)``;

type basicType = {
  goodsImageUpdate: response;
  goodsIamge: any;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  goodImageInfo: yup.object({
    imageNumInfos: yup.array().of(
      yup.object({
        num: yup.string(),
        imageInfo: yup.object({
          id: yup.string(),
        }),
      })
    ),
  }),
});

const GoodsImageUpdate = ({
  goodsImageUpdate,
  goodsIamge,
  onSubmit,
  modalVisible,
  setModalVisible,
}: basicType) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      goodImageInfo: {
        imageNumInfos: [{ num: 0, imageInfo: { id: "" } }],
      },
    },
  });

  return (
    <GoodsImageUpdateBlock>
      <PageHeader title="상품그룹 상품이미지" />
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <Description>
          <DescriptionContent
            span="12"
            label="상품이미지"
            content={
              <StyledUpload
                readOnly
                register={register}
                placeholder="상품이미지"
                label="goodImageInfo.imageNumInfos"
                isBox
                maxLength={1}
                errors={errors}
                status={errors.goodImageInfo?.imageNumInfos}
                subject="good_group"
                type="good_image"
                isThumbnailImage={goodsIamge?.info.imageNums.map(
                  (imageInfo: any) => {
                    return { imageId: imageInfo.info.image.id };
                  }
                )}
                successAction={(result: any) => {
                  const imageArray = result.map((image: any, index: number) => {
                    return { num: index, imageInfo: { id: image.imageId } };
                  });
                  setValue("goodImageInfo.imageNumInfos", imageArray);
                }}
              />
            }
          />
        </Description>
        <ErrorMsg>{goodsImageUpdate.message}</ErrorMsg>
        <Button type="submit" status="primary" withInput needMarginTop>
          수정
        </Button>
      </StyledForm>
      <Modal
        title="상품이미지 수정"
        msg="수정을 완료하였습니다."
        submitMsg="확인"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </GoodsImageUpdateBlock>
  );
};

export default GoodsImageUpdate;
