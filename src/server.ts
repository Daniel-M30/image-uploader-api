import express, { json } from "express";
import cors from "cors";
import { imgbox } from "imgbox-js";
import { upload } from "./configs/Multer";
import fs from "fs";

const app = express();
app.use(cors());
app.use(json());

app.post("/upload", upload.single("file"), async (req, res) => {
  if (req.file) {
    const image = await imgbox(req.file.path, {
      logger: false,
    });

    fs.rmSync(req.file.path);
    fs.rmdirSync(req.file.destination);

    res.json({ data: image.data[0] });
    return;
  }

  res.status(400).send({ message: "Nenhuma imagem encontrada!!" });
});

app.listen(3333, () => console.log("Server is running..."));
