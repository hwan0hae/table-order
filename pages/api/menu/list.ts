import prisma from "utill/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  try {
    const list = await prisma.product.findMany({
      where: {
        companyId: session?.user?.companyId,
      },
    });

    return res.status(200).json(list);
  } catch (error: any) {
    console.error("/api/menu/list >> ", error);

    return res.status(400).json({
      message: "데이터를 불러오지 못했습니다.",
    });
  }
}
