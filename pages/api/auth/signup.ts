import bcrypt from "bcrypt";
import prisma from "utill/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  //암호화 소금소금
  const salt = 10;
  try {
    const hashPassword = await bcrypt.hash(body.password, salt);
    const data = { ...body, password: hashPassword };
    const createdUser = await prisma.user.create({ data });

    return res.status(200).json({
      user: createdUser,
      message: "회원가입에 성공했습니다. 로그인 페이지로 이동합니다.",
    });
  } catch (error: any) {
    console.error("/api/auth/signup >> ", error);

    if (error.constructor.name === PrismaClientKnownRequestError.name) {
      const errorType = error.meta?.target[0];
      // 이메일, 폰번호중에 하나가 겹친다면 실행
      switch (errorType) {
        case "email":
          return res.status(409).json({
            user: null,
            message: "이미 사용중인 이메일입니다.",
          });
        case "phone":
          return res.status(409).json({
            user: null,
            message: "이미 사용중인 전화번호입니다.",
          });

        default:
          return res.status(409).json({
            user: null,
            message: "알 수 없는 에러입니다. 잠시후에 다시 시도해주세요!",
          });
      }
    }

    return res.status(400).json({
      user: null,
      message: "회원가입에 실패했습니다. 새로고침후에 시도해주세요!",
    });
  }
}
