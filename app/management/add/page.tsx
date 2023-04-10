'use client';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { IMutatedError, IMutatedValue, ITableAddData } from 'types/api';
import { tableAdd } from 'utill/api';
import { toast } from 'react-hot-toast';
import Seo from 'components/Seo';
import { Box, Btn, Text, Title } from 'styles/styled';
import {
  Canvas,
  CanvasForm,
  Input,
  InputContainer,
  SubmitBtn,
  WidthContainer,
} from 'styles/form-style';
import { useEffect, useRef, useState } from 'react';
import { IDrawTableData, ITableAddFormData } from 'types/data';

export default function TableAdd() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [pos, setPos] = useState<number[]>([]);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [drawVisible, setDrawVisible] = useState<boolean>(false);
  const [drawData, setDrawData] = useState<IDrawTableData>();

  const formSchema = yup.object({
    tableNo: yup.number().required('테이블 번호를 입력해주세요.'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<ITableAddFormData>({
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });
  const addMutation = useMutation<IMutatedValue, IMutatedError, ITableAddData>(
    (data) => tableAdd(data),
    {
      onError: (data: any) => {
        toast(data.response?.data.message);
      },
      onSuccess: (data) => {
        reset();
        setDrawVisible(false);
        toast(data.message);
      },
    }
  );
  const onSubmit = (data: ITableAddFormData) => {
    if (drawData) {
      const tableData: ITableAddData = { ...data, ...drawData };
      console.log(tableData);
      addMutation.mutate(tableData);
    } else {
      toast('테이블을 그려주세요');
    }
  };

  const drawStart = (e: MouseEvent): void => {
    setIsDraw(true);
    setPos([
      e.pageX - canvasRef.current.offsetLeft,
      e.pageY - canvasRef.current.offsetTop,
    ]);
  };
  const drawSquare = (e: MouseEvent): void => {
    if (!isDraw) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(pos[0], pos[1], e.offsetX - pos[0], e.offsetY - pos[1]);
    setDrawData({
      locX: pos[0],
      locY: pos[1],
      tableWidth: e.offsetX - pos[0],
      tableHeight: e.offsetY - pos[1],
    });
  };
  const drawEnd = (): void => {
    setIsDraw(false);
  };

  useEffect(() => {
    if (drawVisible) {
      const canvas = canvasRef.current;
      setCtx(canvas.getContext('2d'));
    }
  }, [drawVisible]);
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener('mousedown', drawStart);
    canvas.addEventListener('mousemove', drawSquare);
    canvas.addEventListener('mouseup', drawEnd);

    return () => {
      // Unmount 시 이벤트 리스터 제거
      canvas.removeEventListener('mousedown', drawStart);
      canvas.removeEventListener('mousemove', drawSquare);
      canvas.removeEventListener('mouseup', drawEnd);
    };
  }, [drawStart, drawSquare, drawEnd]);
  return (
    <>
      <Seo title="TableAdd" description="테이블 추가 페이지입니다." />
      <Box>
        <Title>Table Add</Title>
        <CanvasForm onSubmit={handleSubmit(onSubmit)}>
          <WidthContainer>
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

            <Btn type="button" onClick={() => setDrawVisible((prev) => !prev)}>
              테이블 그리기
            </Btn>
          </WidthContainer>

          {drawVisible && <Canvas ref={canvasRef} width={750} height={750} />}

          <SubmitBtn disabled={!(isValid && isDirty)}>추가하기</SubmitBtn>
        </CanvasForm>
      </Box>
    </>
  );
}
