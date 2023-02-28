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
  Radio,
  RadioText,
  TextArea,
  UserContainer,
} from "styles/form-style";
import {
  Box,
  Btn,
  DeleteBtn,
  EditBtn,
  Modal,
  Overlay,
  Row,
  SubTitle,
  Title,
} from "styles/styled";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { ProductFormData } from "types/data";
import { ProductData, ProductDelete } from "types/api";
import { useSession } from "next-auth/react";
import { productDelete } from "utill/api";

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

export default function Product({
  id,
  name,
  price,
  description,
  imageUrl,
}: ProductData) {
  const { data: session } = useSession();

  const ModalRef = useRef<HTMLDivElement>(null);
  const [onClicked, setOnClicked] = useState<boolean>(false);
  const formSchema = yup.object({
    name: yup.string().required("메뉴 이름을 입력해주세요"),
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
  const productDeleteMutation = useMutation(
    "productDelete",
    (data: ProductDelete) => productDelete(data),
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
  const onDelete = () => {
    const data = { id, companyId: session?.user.companyId };
    productDeleteMutation.mutate(data);
  };
  const onSubmit = () => {};
  // useEffect(() => {
  //   reset(userData);
  // }, [reset, userData]);

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
        <Image src={imageUrl} alt={`${name} 이미지`} />
        <Content>
          <SubTitle style={{ fontSize: "1.7rem" }}>{name}</SubTitle>
          <Description>{description}</Description>
          <Price> {price}원</Price>
        </Content>
      </Container>
      <AnimatePresence>
        {onClicked &&
        (session?.user?.auth === "OWNER" || session?.user?.auth === "ADMIN") ? (
          <Overlay>
            <Modal ref={ModalRef}>
              <Box>
                <Title>{name} 정보</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <UserContainer>
                    <SubTitle>이름</SubTitle>
                    {errors.name && (
                      <ErrorText>{errors.name.message}</ErrorText>
                    )}
                    <InputContainer>
                      <Input
                        {...register("name")}
                        type="text"
                        placeholder="메뉴 이름을 입력해주세요."
                      />
                    </InputContainer>
                    <SubTitle>가격</SubTitle>
                    <InputContainer>
                      <Input
                        {...register("price")}
                        type="number"
                        placeholder="가격을 입력해주세요."
                      />
                    </InputContainer>
                    <SubTitle>설명</SubTitle>
                    <TextArea
                      {...register("description")}
                      type="text"
                      placeholder="메뉴 설명을 입력해주세요."
                    />
                  </UserContainer>
                  <Row>
                    <EditSubmitBtn
                      type="submit"
                      disabled={!(isValid && isDirty)}
                    >
                      수정
                    </EditSubmitBtn>
                    <DeleteBtn
                      type="button"
                      onClick={onDelete}
                      style={{ borderRadius: 0 }}
                    >
                      메뉴 삭제
                    </DeleteBtn>
                    <Btn type="button" onClick={() => setOnClicked(false)}>
                      취소
                    </Btn>
                  </Row>
                </Form>
              </Box>
            </Modal>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
}
