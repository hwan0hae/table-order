import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import {
  EditSubmitBtn,
  ErrorText,
  Form,
  Input,
  InputContainer,
  Radio,
  RadioText,
  UserContainer,
} from 'styles/form-style';
import {
  Box,
  Btn,
  BlueBtn,
  Modal,
  Overlay,
  Row,
  SubTitle,
  Title,
} from 'styles/styled';
import { IEditModalData, IEditUserForm } from 'types/data';
import { useForm } from 'react-hook-form';
import { userEdit } from 'utill/api';
import {
  IEditUserData,
  IMemberData,
  IMutatedError,
  IMutatedValue,
} from 'types/api';
import { MEMBER_AUTH } from 'types/type';

export default function EditModal({ userData }: IEditModalData) {
  const { id, name, email, phone, auth, status } = userData;

  const ModalRef = useRef<HTMLDivElement>(null);
  const [onClicked, setOnClicked] = useState<boolean>(false);
  const formSchema = yup.object({
    email: yup
      .string()
      .required('이메일을 입력해주세요.')
      .email('이메일 형식이 아닙니다.'),
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
    reset,
  } = useForm<IEditUserForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(formSchema),
    defaultValues: {
      email,
      name,
      phone,
      auth,
      status,
    },
  });
  const userEditMutation = useMutation<
    IMutatedValue,
    IMutatedError,
    IEditUserData
  >((info) => userEdit(info), {
    onError: (res) => {
      alert(res.response?.data.message);
    },
    onSuccess: (res) => {
      alert(res.message);
    },
    onSettled: () => {
      setOnClicked(false);
    },
  });

  const onSubmit = (data: IEditUserForm) => {
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
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [ModalRef]);
  return (
    <>
      <BlueBtn onClick={() => setOnClicked(true)} style={{ borderRadius: 15 }}>
        수정
      </BlueBtn>
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
                        {...register('email')}
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
                        {...register('name')}
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
                        {...register('phone')}
                        placeholder="전화번호를 입력해주세요."
                      />
                    </InputContainer>
                    <Row>
                      {auth === 'OWNER' ? (
                        <label htmlFor="auth_radio">
                          <Radio
                            id="auth_radio"
                            {...register('auth')}
                            value={auth}
                            disabled
                          />
                          <RadioText>{auth}</RadioText>
                        </label>
                      ) : (
                        <>
                          {MEMBER_AUTH.map((memberAuth) => (
                            <label key={memberAuth} htmlFor="auth_radio">
                              <Radio
                                id="auth_radio"
                                {...register('auth')}
                                value={memberAuth}
                              />
                              <RadioText>{memberAuth}</RadioText>
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
