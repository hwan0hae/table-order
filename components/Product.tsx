import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import {
  EditSubmitBtn,
  ErrorText,
  Form,
  Input,
  InputContainer,
  Preview,
  TextArea,
  UserContainer,
} from "styles/form-style";
import {
  Box,
  Btn,
  RedBtn,
  Modal,
  Overlay,
  Row,
  SubTitle,
  Title,
} from "styles/styled";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { ProductFormData } from "types/data";
import { ProductData } from "types/api";
import { useSession } from "next-auth/react";
import { productDelete, productEdit } from "utill/api";
import { onImgChange } from "utill/utill";

const Container = styled.article`
  width: 230px;
  height: 360px;
  border: 1px solid ${(props) => props.theme.borderLine};
  border-radius: 5%;
  margin-top: 60px;
  color: ${(props) => props.theme.textColor};
  box-shadow: 0px 0px 5px 1px ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  padding: 0 12px 12px 12px;
  transition: scale 0.2s ease-in-out;
  position: relative;
  cursor: pointer;
  &:hover {
    scale: 1.05;
  }
`;
const Image = styled.img`
  top: -50px;
  position: relative;
  margin: 0 auto;
  width: 150px;
  height: 150px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: -25px;
  height: calc(100% - 150px);
`;

const Description = styled.pre`
  color: ${(props) => props.theme.textColor};
  font-weight: 400;
  font-size: 1rem;
`;
const Price = styled.span`
  color: ${(props) => props.theme.textColor};
  font-weight: 400;
  font-size: 1.2rem;
  position: relative;
  margin-left: auto;
  margin-top: auto;
`;

export default function Product({ productData }: { productData: ProductData }) {
  const { id, name, price, description, imageUrl } = productData;
  const { data: session } = useSession();

  const ModalRef = useRef<HTMLDivElement>(null);
  const imgInput = useRef<HTMLInputElement>(null);
  const [imgFile, setImgFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [onClicked, setOnClicked] = useState<boolean>(false);
  const formSchema = yup.object({
    name: yup.string().required("?????? ????????? ??????????????????"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<ProductFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(formSchema),
    defaultValues: {
      name,
      price,
      description,
    },
  });
  const productDeleteMutation = useMutation((id: number) => productDelete(id), {
    onError: (data: any) => {
      alert(data.response?.data.message);
    },
    onSuccess: (data) => {
      alert(data.message);
    },
    onSettled: () => {
      setOnClicked(false);
    },
  });
  const productEditMutation = useMutation(
    (formData: FormData) => productEdit(formData),
    {
      onError: (data: any) => {
        alert(data.response?.data.message);
      },
      onSuccess: (data) => {
        alert(data.message);
      },
      onSettled: () => {
        setOnClicked(false);
      },
    }
  );

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = await onImgChange(e);

    setImgFile(file);
    setPreview(URL.createObjectURL(file));
  };
  const onDelete = () => {
    productDeleteMutation.mutate(id);
  };

  const onSubmit = (data: ProductFormData) => {
    const formData = new FormData();

    formData.append("id", String(id));
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("dir", `${String(session?.user?.companyId)}/menu`);
    if (imgFile) {
      console.log("aa");
      formData.append("image", imgFile);
    }
    productEditMutation.mutate(formData);
  };
  useEffect(() => {
    reset(productData);
  }, [reset, productData]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ModalRef.current && !ModalRef.current.contains(e.target as Node)) {
        setOnClicked(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [ModalRef]);
  return (
    <>
      <Container onClick={() => setOnClicked(true)}>
        <Image src={imageUrl} alt={`${name} ?????????`} />
        <Content>
          <SubTitle style={{ fontSize: "1.7rem" }}>{name}</SubTitle>
          <Description>{description}</Description>
          <Price> {price}???</Price>
        </Content>
      </Container>
      <AnimatePresence>
        {onClicked &&
        (session?.user?.auth === "OWNER" || session?.user?.auth === "ADMIN") ? (
          <Overlay>
            <Modal ref={ModalRef}>
              <Box>
                <Title>{name} ??????</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <UserContainer>
                    <SubTitle>??????</SubTitle>
                    {errors.name && (
                      <ErrorText>{errors.name.message}</ErrorText>
                    )}
                    <InputContainer>
                      <Input
                        {...register("name")}
                        type="text"
                        placeholder="?????? ????????? ??????????????????."
                      />
                    </InputContainer>
                    <SubTitle>??????</SubTitle>
                    <InputContainer>
                      <Input
                        {...register("price")}
                        type="number"
                        placeholder="????????? ??????????????????."
                      />
                    </InputContainer>
                    <SubTitle>??????</SubTitle>
                    <TextArea
                      {...register("description")}
                      type="text"
                      placeholder="?????? ????????? ??????????????????."
                    />
                    <Btn
                      type="button"
                      onClick={() => {
                        imgInput.current?.click();
                      }}
                    >
                      ????????? ??????
                    </Btn>
                    {preview && <Preview src={preview} alt="preview-img" />}
                  </UserContainer>
                  <Row>
                    <EditSubmitBtn
                      type="submit"
                      disabled={!((isValid && isDirty) || imgFile)}
                    >
                      ??????
                    </EditSubmitBtn>
                    <RedBtn type="button" onClick={onDelete}>
                      ?????? ??????
                    </RedBtn>
                    <Btn type="button" onClick={() => setOnClicked(false)}>
                      ??????
                    </Btn>
                  </Row>
                </Form>
              </Box>
            </Modal>
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={onChange}
              ref={imgInput}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
}
