import prisma from "utill/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  try {
    const users = await prisma.user.findMany({
      where: {
        companyId: session?.user?.companyId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        auth: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json(users);
  } catch (error: any) {
    console.error("/api/menu/list >> ", error);

    return res.status(400).json({
      message: "데이터를 불러오지 못했습니다.",
    });
  }
}
