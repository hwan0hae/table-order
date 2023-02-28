import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  UserContainer,
} from "styles/form-style";
import {
  Box,
  Btn,
  EditBtn,
  Modal,
  Overlay,
  Row,
  SubTitle,
  Title,
} from "styles/styled";
import { AUTH, EditModalData, EditUserForm } from "types/data";
import { useForm } from "react-hook-form";
import { userEdit } from "utill/api";
import { EditUserData } from "types/api";

export default function EditModal({ userData }: EditModalData) {
  const { id, name, email, phone, auth, status } = userData;

  const ModalRef = useRef<HTMLDivElement>(null);
  const [onClicked, setOnClicked] = useState<boolean>(false);
  const formSchema = yup.object({
    email: yup
      .string()
      .required("이메일을 입력해주세요.")
      .email("이메일 형식이 아닙니다."),
    name: yup.string().required("이름을 입력해주세요"),
    phone: yup
      .string()
      .required("전화번호를 입력해주세요.")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "전화번호 양식에 맞게 입력해주세요."
      ),
    auth: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<EditUserForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(formSchema),
    defaultValues: {
      email,
      name,
      phone,
      auth,
      status,
    },
  });
  const userEditMutation = useMutation(
    "userEdit",
    (info: EditUserData) => userEdit(info),
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

  const onSubmit = (data: EditUserForm) => {
    const info = {
      id,
      email: data.email,
      name: data.name,
      phone: data.phone,
      auth: data.auth,
      status,
    };
    userEditMutation.mutate(info);
  };

  useEffect(() => {
    reset(userData);
  }, [reset, userData]);

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
      <EditBtn onClick={() => setOnClicked(true)}>수정</EditBtn>
      <AnimatePresence>
        {onClicked && (
          <Overlay>
            <Modal ref={ModalRef}>
              <Box>
                <Title>{name}님의 정보</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <UserContainer>
                    <SubTitle>이메일</SubTitle>
                    {errors.email && (
                      <ErrorText>{errors.email.message}</ErrorText>
                    )}
                    <InputContainer>
                      <Input
                        {...register("email")}
                        type="text"
                        placeholder="이메일을 입력해주세요."
                        readOnly
                      />
                    </InputContainer>
                    <SubTitle>이름</SubTitle>
                    {errors.name && (
                      <ErrorText>{errors.name.message}</ErrorText>
                    )}
                    <InputContainer>
                      <Input
                        {...register("name")}
                        placeholder="이름을 입력해주세요."
                      />
                    </InputContainer>
                    <SubTitle>전화번호</SubTitle>
                    {errors.phone && (
                      <ErrorText>{errors.phone.message}</ErrorText>
                    )}
                    <InputContainer>
                      <Input
                        type="tel"
                        {...register("phone")}
                        placeholder="전화번호를 입력해주세요."
                      />
                    </InputContainer>
                    <Row>
                      {auth === "OWNER" ? (
                        <label>
                          <Radio {...register("auth")} value={auth} disabled />
                          <RadioText>{auth}</RadioText>
                        </label>
                      ) : (
                        <>
                          {AUTH.map((auth) => (
                            <label key={auth}>
                              <Radio {...register("auth")} value={auth} />
                              <RadioText>{auth}</RadioText>
                            </label>
                          ))}
                        </>
                      )}
                    </Row>
                  </UserContainer>
                  <Row>
                    <EditSubmitBtn
                      type="submit"
                      disabled={!(isValid && isDirty)}
                    >
                      수정
                    </EditSubmitBtn>
                    <Btn type="button" onClick={() => setOnClicked(false)}>
                      취소
                    </Btn>
                  </Row>
                </Form>
              </Box>
            </Modal>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
}
