import multer from "multer";
import MulterGoogleCloudStorage from "multer-google-storage";
import { Request } from "express";

const allowed = ["image/jpeg", "image/jpg", "image/png"];
const upload = multer({
  storage: new MulterGoogleCloudStorage({
    bucket: process.env.GS_BUCKET_NAME,
    projectId: process.env.GS_PROJECT_ID,
    keyFilename: process.env.GS_KEY_PATH,
    contentType: (req, file) => {
      return file.mimetype;
    },
    filename: (req: Request, file: Express.Multer.File, cb: any) => {
      cb(null, `/images/${Date.now()}_${file.originalname}`);
    },
  }),
  fileFilter: function (req, file, cb) {
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(null, false);
  },
});

export { upload };
