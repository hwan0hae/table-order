"use client";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Seo from "components/Seo";
import { Title, Box, Row, Btn, Text } from "styles/styled";
import {
  ErrorText,
  Form,
  FormContainer,
  Input,
  InputContainer,
  SubmitBtn,
} from "styles/form-style";
import { useMutation } from "react-query";
import { ISignUpUser, signUpUser } from "utill/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface IForm {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
}

export default function SignUp() {
  const router = useRouter();
  const formSchema = yup.object({
    email: yup
      .string()
      .required("이메일을 입력해주세요.")
      .email("이메일 형식이 아닙니다."),
    password: yup
      .string()
      .required("비밀번호를 입력해주세요.")
      .min(8, "최소 8자 이상 가능합니다.")
      .max(15, "최대 15자 까지만 가능합니다.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        "영문, 숫자 포함 8자리를 입력해주세요."
      ),
    passwordConfirm: yup
      .string()
      .oneOf(
        [yup.ref("password"), undefined],
        "입력하신 비밀번호와 일치하지 않습니다."
      ),
    name: yup.string().required("이름을 입력해주세요"),
    phone: yup
      .string()
      .required("전화번호를 입력해주세요.")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "전화번호 양식에 맞게 입력해주세요."
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<IForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(formSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string>();
  const signUpMutation = useMutation((info: ISignUpUser) => signUpUser(info), {
    onError: (data: any) => {
      setErrorMessage(data.response?.data.message);
    },
    onSuccess: (data) => {
      alert(data.message);
      router.push("/signin");
    },
  });
  const onSubmit = (data: IForm) => {
    const info = {
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
    };
    signUpMutation.mutate(info);
  };

  return (
    <>
      <Seo
        title={"회원 가입"}
        description={"테이블오더 회원가입 페이지입니다."}
      />
      <FormContainer>
        <Box>
          <Title>회원 가입</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            <InputContainer>
              <Input
                {...register("email")}
                type="text"
                placeholder="이메일을 입력해주세요."
              />
            </InputContainer>
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
            <InputContainer>
              <Input
                {...register("password")}
                type="password"
                placeholder="비밀번호를 입력해주세요."
                autoComplete="off"
              />
            </InputContainer>
            {errors.passwordConfirm && (
              <ErrorText>{errors.passwordConfirm.message}</ErrorText>
            )}
            <InputContainer>
              <Input
                {...register("passwordConfirm")}
                type="password"
                placeholder="비밀번호 확인"
                autoComplete="off"
              />
            </InputContainer>
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
            <InputContainer>
              <Input {...register("name")} placeholder="이름을 입력해주세요." />
            </InputContainer>
            {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
            <InputContainer>
              <Input
                type="tel"
                {...register("phone")}
                placeholder="전화번호를 입력해주세요."
              />
            </InputContainer>
            <SubmitBtn disabled={!(isValid && isDirty)}>가입하기</SubmitBtn>
          </Form>
          {errorMessage && (
            <ErrorText style={{ textAlign: "center" }}>
              {errorMessage}
            </ErrorText>
          )}
        </Box>
        <Box>
          <Row>
            <Text>계정이 있으신가요? </Text>
            <Link href="/signin">
              <Btn>로그인</Btn>
            </Link>
          </Row>
        </Box>
      </FormContainer>
    </>
  );
}
