import nextConnect from "next-connect";
import prisma from "utill/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { imageDeleteCommand, imageUploader } from "utill/awsS3";

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

  //수정 해야함 id를 찾아서 데이터값들을 업데이트 해줘야한다.
  try {
    const { dir, id, name, price, description } = req.body;
    const _id = Number(id);
    if (req.file) {
      const imageUrl = await req.file.location;

      const prvImageUrl = await prisma.product.findFirst({
        where: {
          id: _id,
        },
        select: {
          imageUrl: true,
        },
      });
      if (prvImageUrl.imageUrl !== "") {
        const path = Object.values(prvImageUrl)[0].substring(
          Object.values(prvImageUrl)[0].indexOf(dir)
        );
        console.log(path);
        const response = await imageDeleteCommand(path);
      }

      const updatedProduct = await prisma.product.update({
        where: { id: _id },
        data: {
          imageUrl,
          name,
          price,
          description,
        },
      });
      return res.status(200).json({
        product: updatedProduct,
        message: "메뉴가 수정되었습니다.",
      });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: _id },
      data: {
        name,
        price,
        description,
      },
    });
    return res.status(200).json({
      product: updatedProduct,
      message: "메뉴가 수정되었습니다.",
    });
  } catch (error: any) {
    console.error("/api/menu/edit >>", error);

    return res.status(500).json({
      message: "뭔가 에러가떴습니당 !",
    });
  }
});
export default handler;
