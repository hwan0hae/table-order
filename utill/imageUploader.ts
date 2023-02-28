import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const imageUploader = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read-write",
    key: function (req: any, file, cb) {
      const uploadDirectory = req.body.dir;
      cb(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
  }),
});

export default imageUploader;
