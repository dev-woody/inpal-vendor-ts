import styled from "styled-components";
import {
  BreadCrumb,
  Button,
  Description,
  DescriptionContent,
  Modal,
  Responsive,
  StyledForm,
  StyledInput,
  StyledSelect,
  StyledToggle,
  Table,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { response } from "types/globalTypes";
import { Fragment, useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { FaMinus } from "react-icons/fa";

const GoodsGroupItemRegisterBlock = styled(Responsive)``;

type ItemProps = {
  isColorItem: "COLOR" | "IMAGE" | "MATERIAL";
  colorCode: response;
  goodsGroup: response;
  specInfo: response;
  onSubmit: (data: any) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
  id: string | undefined;
};

const priceSchema = yup.object({
  specNumId: yup.object({
    id: yup.string(),
    keyName: yup.string(),
  }),
  price: yup.number(),
  salePrice: yup.number(),
});

const PriceOption = ({
  goodsGroup,
  setPriceValue,
}: {
  goodsGroup: response;
  setPriceValue: any;
}) => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(priceSchema),
    defaultValues: {
      specNumId: {},
      price: "",
      salePrice: "",
    },
  });

  const [list, setList] = useState<
    { specNumId: any; price: string; salePrice: string }[]
  >([]);

  const addList = list.map((item: any) => {
    return item.specNumId.id;
  });

  const onSubmit = (data: any) => {
    const copyList = JSON.parse(JSON.stringify(list));
    copyList.push(data);
    const subMitList = copyList.map((items: any) => {
      return {
        specNumId: items.specNumId.id,
        price: items.price,
        salePrice: items.salePrice,
      };
    });
    setList(copyList);
    setPriceValue("priceInfo.priceNumInfos", subMitList);
  };

  // const filterData: any[] =
  //   addList && addList.length > 0
  //     ? addList.length === specInfo?.data.length
  //       ? []
  //       : specInfo.data?.map((filterItems: any) => {
  //           if (!addList.includes(filterItems.base.id)) {
  //             return filterItems;
  //           }
  //         })
  //     : [];

  return (
    <div style={{ width: "100%" }}>
      <StyledForm
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ marginRight: "1rem" }}>
          <StyledSelect
            // optionList={filterData}
            optionList={goodsGroup?.data?.info?.specs?.info?.specNums}
            label="specNumId"
            placeholder="사양옵션"
            register={register}
            errors={errors}
            status={errors.specNumId}
            setValue={(label: "specNumId", id: string, keyName: string) =>
              setValue(label, { id: id, keyName: keyName })
            }
          />
        </div>
        <div style={{ marginRight: "1rem" }}>
          <StyledInput
            placeholder="가격"
            label="price"
            register={register}
            errors={errors}
            status={errors.price}
          />
        </div>
        <div style={{ marginRight: "1rem" }}>
          <StyledInput
            placeholder="세일가격"
            label="salePrice"
            register={register}
            errors={errors}
            status={errors.salePrice}
          />
        </div>
        <Button
          style={{ margin: "0.25rem 0" }}
          onClick={handleSubmit(
            (data) => onSubmit(data),
            (errors) => console.log(errors)
          )}
        >
          추가
        </Button>
      </StyledForm>
      <Table
        doNoting
        columns={[
          {
            title: "사양",
            dataIndex: "specNumId",
            render: (specNumId: any) => specNumId.keyName,
          },
          {
            title: "사양",
            dataIndex: "price",
          },
          {
            title: "사양",
            dataIndex: "salePrice",
          },
          {
            title: "삭제",
            dataIndex: "specNumId",
            render: (specNumId: any) => {
              const onClick = () => {
                console.log(list);
                setList(
                  list.filter((oneList: any) => oneList.id === specNumId.id)
                );
              };
              return (
                <div onClick={onClick} style={{ color: "#ff4d4f" }}>
                  <FaMinus />
                </div>
              );
            },
          },
        ]}
        content={list}
      />
    </div>
  );
};

const schema = yup.object({
  basicInfo: yup.object({
    model: yup.string(),
    name: yup.string(),
    isOrderMade: yup.boolean(),
    colorCodeId: yup.string(),
  }),
  dsInfo: yup.object({
    dsType: yup.string(),
    rgb: yup.string(),
  }),
  priceInfo: yup.object({
    priceNumInfos: yup.array().of(
      yup.object({
        specNumId: yup.string(),
        price: yup.number(),
        salePrice: yup.number(),
      })
    ),
  }),
  stock: yup.number(),
});

const GoodsGroupItemRegister = ({
  isColorItem,
  colorCode,
  goodsGroup,
  specInfo,
  onSubmit,
  modalVisible,
  setModalVisible,
  navigate,
  id,
}: ItemProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      basicInfo: {
        model: "",
        name: "",
        isOrderMade: false,
        colorCodeId: "",
      },
      dsInfo: {
        dsType: "",
        rgb: "",
        // "image": {"imageInfo": {"id": ""}} ,
      },
      priceInfo: {
        priceNumInfos: [],
      },
      stock: "",
    },
  });

  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    setValue("dsInfo.dsType", isColorItem?.toLowerCase());
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <GoodsGroupItemRegisterBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹관리 /",
                  url: "/goods/groups",
                },
                {
                  name: "상세정보 및 수정 /",
                  url: `/goods/groups/detail/${id}`,
                },
                {
                  name: "아이템 등록",
                  url: "",
                },
              ]}
            />
          }
        />
      </GoodsGroupItemRegisterBlock>
      <GoodsGroupItemRegisterBlock>
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent
              span="12"
              label="색상계열"
              content={
                <StyledSelect
                  optionList={colorCode.data}
                  placeholder="색상계열"
                  label="basicInfo.colorCodeId"
                  register={register}
                  errors={errors}
                  status={errors.basicInfo?.colorCodeId}
                  setValue={setValue}
                  align="vertical"
                  // actions={onSelectManufact}
                  index="2"
                />
              }
            />
            <DescriptionContent
              span="12"
              label="모델명"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="모델명"
                  label="basicInfo.model"
                  register={register}
                  errors={errors}
                  status={errors.basicInfo?.model}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="상품명"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="상품명"
                  label="basicInfo.name"
                  register={register}
                  errors={errors}
                  status={errors.basicInfo?.name}
                />
              }
            />
            {isColorItem === "COLOR" ? (
              <Fragment>
                <DescriptionContent
                  span="12"
                  label="색상코드"
                  content={
                    <StyledInput
                      align="vertical"
                      placeholder="색상코드"
                      label="dsInfo.rgb"
                      register={register}
                      errors={errors}
                      status={errors.dsInfo?.rgb}
                    />
                  }
                />
              </Fragment>
            ) : null}
            <DescriptionContent
              span="12"
              label="재고"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="재고"
                  label="stock"
                  register={register}
                  errors={errors}
                  status={errors.stock}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="주문시 환불 불가"
              content={
                <StyledToggle
                  data={isToggle ? "사용" : "미사용"}
                  openStatus="사용"
                  action={(data) => {
                    setIsToggle(data === "사용" ? false : true);
                    setValue(
                      "basicInfo.isOrderMade",
                      data === "사용" ? false : true
                    );
                  }}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="가격정보"
              content={
                <PriceOption setPriceValue={setValue} goodsGroup={goodsGroup} />
              }
            />
          </Description>
          <Button type="submit" status="primary" withInput needMarginTop>
            등록
          </Button>
        </StyledForm>
        <Modal
          title="상품 등록"
          msg="상품등록을 완료하였습니다."
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={() => {
            if (typeof id === "string") {
              navigate(`/goods/groups/detail/${id}`);
            }
          }}
        />
      </GoodsGroupItemRegisterBlock>
    </>
  );
};

export default GoodsGroupItemRegister;
