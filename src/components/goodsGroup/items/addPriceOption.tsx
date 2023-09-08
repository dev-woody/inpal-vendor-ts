import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { priceToString } from "lib/functions/changeInput";
import {
    Button,
    ErrorMsg,
    StyledForm,
    StyledInput,
    StyledSelect,
    Table,
} from "lib/styles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaMinus } from "react-icons/fa";
import { response } from "types/globalTypes";
import { ErrorMessage } from "@hookform/error-message";

const priceSchema = yup.object({
    specNumId: yup.object({
        id: yup.string(),
        keyName: yup.string(),
    }),
    price: yup.number().typeError("숫자만 입력가능합니다."),
    salePrice: yup.number().typeError("숫자만 입력가능합니다."),
});

export default function PriceOption({
    goodsGroup,
    setPriceValue,
    errorsMsg,
    name,
    align,
    setErrorParent,
}: {
    goodsGroup: response;
    setPriceValue: any;
    errorsMsg: any;
    name: string;
    align?: string;
    setErrorParent: any,
}) {
    const {
        register,
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
    const [specOption, setSpecOption] = useState<string>("")

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
        console.log(copyList)
        setPriceValue("priceInfo.priceNumInfos", subMitList);
    };

    return (
        <div style={{ width: "100%" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "1rem",
                }}
            >
                <div style={{ marginRight: "1rem" }}>
                    <StyledSelect
                        // optionList={filterData}
                        optionList={goodsGroup?.data?.info?.specs?.info?.specNums}
                        label="specNumId"
                        placeholder={"사양옵션" || specOption}
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
                        endItem="원"
                    />
                </div>
                <div style={{ marginRight: "1rem" }}>
                    <StyledInput
                        placeholder="세일가격"
                        label="salePrice"
                        register={register}
                        errors={errors}
                        status={errors.salePrice}
                        endItem="원"
                    />
                </div>
                <Button
                    style={{ margin: "0.25rem 0", height: "30.5px" }}
                    onClick={handleSubmit(
                        (data) => {onSubmit(data);
                            setErrorParent(`${name}`);
                            reset();
                            setSpecOption("")
                        },
                        (errors) => console.log(errors)
                    )}
                >
                    추가
                </Button>
            </div>
            <Table
                doNoting
                columns={[
                    {
                        title: "사양",
                        dataIndex: "specNumId",
                        render: (specNumId: any) => specNumId.keyName,
                    },
                    {
                        title: "가격",
                        dataIndex: "price",
                        render: (price: any) => priceToString(price),
                    },
                    {
                        title: "세일가격",
                        dataIndex: "salePrice",
                        render: (salePrice: any) => priceToString(salePrice),
                    },
                    {
                        title: "삭제",
                        dataIndex: "specNumId",
                        render: (specNumId: any) => {
                            const onClick = () => {
                                const deleteList = list.filter((oneList: any) => oneList.id === specNumId.id)
                                setList(
                                    deleteList
                                );
                                setPriceValue("priceInfo.priceNumInfos", deleteList.map((items: any) => {
                                    return {
                                        specNumId: items.specNumId.id,
                                        price: items.price,
                                        salePrice: items.salePrice,
                                    };
                                }));
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
            {(errors) && (
                <ErrorMessage
                    errors={errorsMsg}
                    name={name}
                    render={({ message }) => (
                        <ErrorMsg align={align}>{message}</ErrorMsg>
                    )}
                />
            )}
        </div>
    );
}
