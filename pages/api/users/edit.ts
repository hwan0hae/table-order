import prisma from "utill/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, email, name, phone, auth, status } = req.body;

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        phone,
        auth,
        status,
      },
    });

    return res.status(200).json({
      message: "정보가 수정되었습니다.",
    });
  } catch (error: any) {
    console.error("/api/users/delete >> ", error);

    return res.status(400).json({
      message: "정보 수정중 에러가 발생했습니다.",
    });
  }
}
