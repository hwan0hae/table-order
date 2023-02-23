import nextConnect from "next-connect";
import multer from "multer";
import fs from "fs";
import prisma from "utill/prismaClient";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

//stream 사용을 위하여 fasle 처리  > 질문
export const config = {
  api: {
    bodyParser: false,
  },
};
//next-connect는 Next.js에서 미들웨어를 사용할 수 있게 도와주는 라이브러리다.
const handler = nextConnect<NextApiRequest, NextApiResponse>();

const storage = multer.diskStorage({
  //목적지
  //이미지 안들어올시 에러나느 것 / 이미지 필수로 하거나 기본 값 주거나 등//
  destination: function (req, file, cb) {
    cb(null, "upload/menu");
  },
  filename: function (req, file, cb) {
    const nowDate = dayjs(Date.now()).format("YYMMDDHHMM");

    cb(null, `${nowDate}_${file.originalname}`);
  },
});
//upload middleware 함수  -single 한개의 파일
const middleware = multer({ storage }).single("file");

handler.use(middleware);
handler.post(async (req: any, res: NextApiResponse) => {
  const session = await getSession({ req });
  const { path } = req.file;
  const imageUrl = `${process.env.NEXTAUTH_URL}/${path}`;

  try {
    const data = {
      ...req.body,
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

    if (fs.existsSync(path)) {
      try {
        fs.unlinkSync(path);
      } catch (error) {
        console.log(error);
      }
    }
    return res.status(500).json({
      product: null,
      message: "뭔가 에러가떴습니당 !",
    });
  }
});
export default handler;

//중복사진 안들어가는 이슈
