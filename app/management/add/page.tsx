'use client';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { IMutatedError, IMutatedValue, ITableAddData } from 'types/api';
import { tableAdd } from 'utill/api';
import { toast } from 'react-hot-toast';
import Seo from 'components/Seo';
import { Box, Text, Title } from 'styles/styled';
import { Form, Input, InputContainer, SubmitBtn } from 'styles/form-style';

export default function TableAdd() {
  const formSchema = yup.object({
    tableNo: yup.number().required('테이블 번호를 입력해주세요.'),
    locX: yup.number(),
    locY: yup.number(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<ITableAddData>({
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(formSchema),
    defaultValues: {
      locX: 0,
      locY: 0,
    },
  });
  const addMutation = useMutation<IMutatedValue, IMutatedError, ITableAddData>(
    (data) => tableAdd(data),
    {
      onError: (data: any) => {
        toast(data.response?.data.message);
      },
      onSuccess: (data) => {
        reset();
        toast(data.message);
      },
    }
  );
  const onSubmit = (data: ITableAddData) => {
    type Entries<T> = {
      [K in keyof T]: [K, T[K]];
    }[keyof T][];

    const input: ITableAddData = Object.fromEntries(
      Object.entries(data).filter(
        (value) => value[1] !== ''
      ) as Entries<ITableAddData>
    );
    addMutation.mutate(input);
  };
  return (
    <>
      <Seo title="TableAdd" description="테이블 추가 페이지입니다." />
      <Box>
        <Title>Table Add</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Input
              {...register('name')}
              type="text"
              placeholder="테이블 이름을 입력해주세요.(선택)"
            />
          </InputContainer>
          <InputContainer>
            <Input
              {...register('tableNo')}
              type="number"
              placeholder="테이블 번호를 입력해주세요."
            />
          </InputContainer>
          <Text>locX</Text>
          <InputContainer>
            <Input
              {...register('locX')}
              type="number"
              placeholder="테이블 위치 X"
            />
          </InputContainer>
          <Text>locY</Text>
          <InputContainer>
            <Input
              {...register('locY')}
              type="number"
              placeholder="테이블 위치 Y"
            />
          </InputContainer>

          <SubmitBtn disabled={!(isValid && isDirty)}>추가하기</SubmitBtn>
        </Form>
      </Box>
    </>
  );
}
