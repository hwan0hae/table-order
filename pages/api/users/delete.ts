import prisma from "utill/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.body;

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        status: "false",
      },
    });

    return res.status(200).json({
      message: "회원이 삭제되었습니다.",
    });
  } catch (error: any) {
    console.error("/api/users/delete >> ", error);

    return res.status(400).json({
      message: "회원 삭제에 실패하였습니다.",
    });
  }
}
