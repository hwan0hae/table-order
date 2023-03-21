'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Title, Box, SubTitle, Row } from 'styles/styled';
import {
  ErrorText,
  Form,
  Input,
  InputContainer,
  Radio,
  RadioText,
  SubmitBtn,
  UserContainer,
} from 'styles/form-style';
import { IMemberSignUpForm } from 'types/data';
import { memberSignUp } from 'utill/api';
import { IMemberSignUpData, IMutatedError, IMutatedValue } from 'types/api';
import { MEMBER_AUTH } from 'types/type';

export default function SignUp() {
  const router = useRouter();
  const formSchema = yup.object({
    email: yup
      .string()
      .required('이메일을 입력해주세요.')
      .email('이메일 형식이 아닙니다.'),
    password: yup
      .string()
      .required('비밀번호를 입력해주세요.')
      .min(8, '최소 8자 이상 가능합니다.')
      .max(15, '최대 15자 까지만 가능합니다.')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        '영문, 숫자 포함 8자리를 입력해주세요.'
      ),
    passwordConfirm: yup
      .string()
      .oneOf(
        [yup.ref('password'), undefined],
        '입력하신 비밀번호와 일치하지 않습니다.'
      ),
    name: yup.string().required('이름을 입력해주세요'),
    phone: yup
      .string()
      .required('전화번호를 입력해주세요.')
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        '전화번호 양식에 맞게 입력해주세요.'
      ),
    auth: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<IMemberSignUpForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(formSchema),
    defaultValues: {
      auth: 'USER',
    },
  });
  const [errorMessage, setErrorMessage] = useState<string>();
  const signUpMutation = useMutation<
    IMutatedValue,
    IMutatedError,
    IMemberSignUpData
  >((info) => memberSignUp(info), {
    onError: (res) => {
      setErrorMessage(res.response?.data.message);
    },
    onSuccess: (res) => {
      alert(res.message);
      router.push('/member');
    },
  });

  const onSubmit = (data: IMemberSignUpForm) => {
    const info = {
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      auth: data.auth,
    };
    signUpMutation.mutate(info);
  };

  return (
    <Box>
      <Title>회원 가입</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <UserContainer>
          <SubTitle>User Info</SubTitle>
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          <InputContainer>
            <Input
              {...register('email')}
              type="text"
              placeholder="이메일을 입력해주세요."
            />
          </InputContainer>
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          <InputContainer>
            <Input
              {...register('password')}
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
              {...register('passwordConfirm')}
              type="password"
              placeholder="비밀번호 확인"
              autoComplete="off"
            />
          </InputContainer>
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          <InputContainer>
            <Input {...register('name')} placeholder="이름을 입력해주세요." />
          </InputContainer>
          {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
          <InputContainer>
            <Input
              type="tel"
              {...register('phone')}
              placeholder="전화번호를 입력해주세요."
            />
          </InputContainer>
          <Row>
            {MEMBER_AUTH.map((auth) => (
              <label key={auth} htmlFor="auth_radio">
                <Radio id="auth_radio" {...register('auth')} value={auth} />
                <RadioText>{auth}</RadioText>
              </label>
            ))}
          </Row>
        </UserContainer>
        <SubmitBtn disabled={!(isValid && isDirty)}>가입하기</SubmitBtn>
      </Form>
      {errorMessage && (
        <ErrorText style={{ textAlign: 'center' }}>{errorMessage}</ErrorText>
      )}
    </Box>
  );
}
