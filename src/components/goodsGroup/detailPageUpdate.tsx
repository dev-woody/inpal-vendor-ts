import styled from "styled-components";
import {
  Button,
  Description,
  DescriptionContent,
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

const DetailPageUpdateBlock = styled(Responsive)``;

type basicType = {
  detailPage: any;
  onSubmit: (data: any) => void;
};

const schema = yup.object({
  detailPageInfo: yup.object({
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

const DetailPageUpdate = ({ detailPage, onSubmit }: basicType) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      detailPageInfo: {
        imageNumInfos: [{ num: 0, imageInfo: { id: "" } }],
      },
    },
  });

  return (
    <DetailPageUpdateBlock>
      <PageHeader title="상품그룹 상세페이지" />
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <Description>
          <DescriptionContent
            span="12"
            label="상세페이지"
            content={
              <StyledUpload
                readOnly
                register={register}
                placeholder="상세페이지"
                label="detailPageInfo.imageNumInfos"
                isBox
                maxLength={1}
                errors={errors}
                status={errors.detailPageInfo?.imageNumInfos}
                subject="good_group"
                type="detail_page"
                isThumbnailImage={detailPage?.info.imageNums.map(
                  (imageInfo: any) => {
                    return { imageId: imageInfo.info.image.id };
                  }
                )}
                successAction={(result: any) => {
                  const imageArray = result.map((image: any, index: number) => {
                    return { num: index, imageInfo: { id: image.imageId } };
                  });
                  setValue("detailPageInfo.imageNumInfos", imageArray);
                }}
              />
            }
          />
        </Description>
        <Button type="submit" status="primary" withInput needMarginTop>
          수정
        </Button>
      </StyledForm>
    </DetailPageUpdateBlock>
  );
};

export default DetailPageUpdate;
