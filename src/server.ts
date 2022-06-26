import { config } from "dotenv";
config();

import express, { json } from "express";
import cors from "cors";
import { upload } from "./configs/MulterStorage";

const app = express();
app.use(cors());
app.use(json());

app.post("/upload", upload.single("file"), async (req, res) => {
  if (req.file) {
    const privateUrl = req.file.path;
    let [, publicUrl] = privateUrl.split(`https://${process.env.GS_BUCKET_NAME}.storage.googleapis.com/`);
    publicUrl = `https://storage.googleapis.com/${process.env.GS_BUCKET_NAME}` + publicUrl;
    res.send({ publicUrl });
    return;
  }

  res.status(400).send({ message: "No image found!!" });
});

app.listen(3333, () => console.log("Server is running..."));
