import prisma from "utill/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { imageDeleteCommand } from "utill/awsS3";
import { useSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, companyId } = req.body;

    const imageUrl = await prisma.product.findFirst({
      where: {
        id,
      },
      select: {
        imageUrl: true,
      },
    });
    const dir = `${companyId}/menu`;
    const path = Object.values(imageUrl)[0].substring(
      Object.values(imageUrl)[0].indexOf(dir)
    );
    const response = await imageDeleteCommand(path);

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "메뉴가 삭제되었습니다.",
    });
  } catch (error: any) {
    console.error("/api/menu/delete >> ", error);

    return res.status(400).json({
      message: "메뉴 삭제에 실패하였습니다.",
    });
  }
}
