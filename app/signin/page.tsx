'use client';

import React from 'react';
import Link from 'next/link';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Seo from 'components/Seo';
import { Title, Box, Row, Btn, Text } from 'styles/styled';
import {
  ErrorText,
  Form,
  FormContainer,
  Input,
  InputContainer,
  SubmitBtn,
} from 'styles/form-style';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {
  IMutatedError,
  IMutatedValue,
  ISessionUserData,
  ISignInData,
} from 'types/api';
import { useMutation } from 'react-query';
import { signIn } from 'utill/api';
import { useSessionStorage } from 'usehooks-ts';

export default function SignIn() {
  const router = useRouter();
  const [user, setUser] = useSessionStorage<ISessionUserData | undefined>(
    'user',
    undefined
  );

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
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ISignInData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(formSchema),
  });
  const signInMutation = useMutation<IMutatedValue, IMutatedError, ISignInData>(
    (info) => signIn(info),
    {
      onError: (res) => {
        toast.error(res.response?.data.message);
      },
      onSuccess: (res) => {
        if (res.data) {
          setUser(res.data);
        }
        toast.success(res.message);
        router.push('/');
      },
    }
  );

  const onSubmit = async (data: ISignInData) => {
    signInMutation.mutate(data);
  };

  return (
    <>
      <Seo title="로그인" description="테이블오더 로그인 페이지입니다." />
      <FormContainer>
        <Box>
          <Title>로그인</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            <InputContainer>
              <Input
                {...register('email')}
                type="text"
                placeholder="이메일을 입력해주세요."
              />
            </InputContainer>
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
            <InputContainer>
              <Input
                {...register('password')}
                type="password"
                placeholder="비밀번호를 입력해주세요."
                autoComplete="off"
              />
            </InputContainer>

            <SubmitBtn disabled={!(isValid && isDirty)}>로그인</SubmitBtn>
          </Form>
        </Box>
        <Box>
          <Row>
            <Text>계정이 없으신가요? </Text>
            <Link href="/signup">
              <Btn>회원가입</Btn>
            </Link>
          </Row>
        </Box>
      </FormContainer>
    </>
  );
}
