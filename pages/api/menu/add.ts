import nextConnect from "next-connect";
import prisma from "utill/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { imageUploader } from "utill/awsS3";

//stream 사용을 위하여 fasle 처리  > 질문
export const config = {
  api: {
    bodyParser: false,
  },
};
//next-connect는 Next.js에서 미들웨어를 사용할 수 있게 도와주는 라이브러리다.
const handler = nextConnect<NextApiRequest, NextApiResponse>();
const middleware = imageUploader.single("image");

handler.use(middleware);
handler.post(async (req: any, res: NextApiResponse) => {
  const session = await getSession({ req });

  try {
    let imageUrl = "";
    if (req.file) {
      imageUrl = await req.file.location;
    }

    const { dir, ...menuInfo } = req.body;
    const data = {
      ...menuInfo,
      imageUrl,
      company: { connect: { id: session?.user.companyId } },
      creator: { connect: { email: session?.user?.email } },
    };
    const createdProduct = await prisma.product.create({ data });

    return res.status(200).json({
      product: createdProduct,
      message: "메뉴가 추가되었습니다.",
    });
  } catch (error: any) {
    console.error("/api/menu/add >>", error);

    return res.status(500).json({
      message: "뭔가 에러가떴습니당 !",
    });
  }
});
export default handler;
