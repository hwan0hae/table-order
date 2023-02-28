"use client";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  Form,
  Input,
  InputContainer,
  Preview,
  SubmitBtn,
  TextArea,
} from "styles/form-style";
import { Box, Btn, Title } from "styles/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { onImgChange } from "utill/utill";
import { useRef, useState } from "react";
import Seo from "components/Seo";
import { useMutation } from "react-query";
import { menuAdd } from "utill/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface IForm {
  name: string;
  price: number;
  description: string;
}

function MenuAdd() {
  const router = useRouter();
  const { data: session } = useSession();
  const formSchema = yup.object({
    name: yup.string().required("메뉴 이름을 입력해주세요."),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<IForm>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    resolver: yupResolver(formSchema),
  });
  const imgInput = useRef<HTMLInputElement>(null);
  const [imgFile, setImgFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const addMutation = useMutation((formData: FormData) => menuAdd(formData), {
    onError: (data: any) => {
      toast(data.response?.data.message);
    },
    onSuccess: (data) => {
      toast(data.message);
      router.push("/menu");
    },
    onSettled: () => {
      //get데이터  ? 혹은 페이지 이동되니까 안해도될지도
    },
  });

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = await onImgChange(e);

    setImgFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data: IForm) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("description", data.description);
    formData.append("dir", `${String(session?.user?.companyId)}/menu`);
    formData.append("image", imgFile);

    addMutation.mutate(formData);
  };
  return (
    <>
      <Seo title={"MenuAdd"} description={"메뉴 추가 페이지입니다."} />
      <Box>
        <Title>Menu Add</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Input
              {...register("name")}
              type="text"
              placeholder="메뉴 이름을 입력해주세요."
            />
          </InputContainer>
          <InputContainer>
            <Input
              {...register("price")}
              type="number"
              placeholder="가격을 입력해주세요."
            />
          </InputContainer>
          <TextArea
            {...register("description")}
            type="text"
            placeholder="메뉴 설명을 입력해주세요."
          />
          <Btn
            type="button"
            onClick={() => {
              imgInput.current?.click();
            }}
          >
            이미지 넣기
          </Btn>
          {preview && <Preview src={preview} alt="preview-img" />}
          <SubmitBtn disabled={!(isValid && isDirty)}>추가하기</SubmitBtn>
        </Form>
      </Box>
      <input
        type="file"
        hidden
        accept="image/*"
        onChange={onChange}
        ref={imgInput}
      />
    </>
  );
}

export default MenuAdd;
