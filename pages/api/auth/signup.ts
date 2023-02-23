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
    /** company 생성 */
    const companyData = {
      name: body.companyName,
      companyNumber: body.companyNumber,
    };
    const createdCompany = await prisma.company.create({ data: companyData });

    /** user 생성 */
    const hashPassword = await bcrypt.hash(body.password, salt);
    const { companyName, companyNumber, ...userInfo } = body;
    const userData = {
      ...userInfo,
      password: hashPassword,
      auth: "ADMIN",
      company: { connect: { name: companyName } },
    };
    const createdUser = await prisma.user.create({ data: userData });

    return res.status(200).json({
      company: createdCompany,
      user: createdUser,
      message: "회원가입에 성공했습니다. 로그인 페이지로 이동합니다.",
    });
  } catch (error: any) {
    console.error("/api/auth/signup >> ", error);

    if (error.constructor.name === PrismaClientKnownRequestError.name) {
      const errorType = error.meta?.target[0];
      switch (errorType) {
        case "name":
          return res.status(409).json({
            user: null,
            message: "이미 가입된 회사명입니다.",
          });
        case "companyNumber":
          return res.status(409).json({
            user: null,
            message: "이미 가입된 사업자 등록번호입니다.",
          });
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
