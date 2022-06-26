import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir(path.join(__dirname, "..", "..", "/uploads"), (err) => {
      if (err) console.log("Error");
    });

    cb(null, path.join(__dirname, "..", "..", "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const allowed = ["image/jpeg", "image/jpg", "image/png"];
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(null, false);
  },
});

export { upload };
