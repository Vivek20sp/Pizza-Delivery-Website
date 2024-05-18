import express from "express";
import multer from "multer";
import uploadCloudinary from "../Cloudinary/cloudinaryUpload.js";
import Product from "../model/ProductsModel.js";
import fs from "fs";

const router = express.Router();

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const upload = "./uploadedImages";
    fs.mkdirSync(upload, { recursive: true });
    cb(null, upload);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: Storage }).array("files", 5);

router.get("/getAllImages", async (req, res) => {
  try {
    const response = await Product.find({});
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
});

router.post("/UploadImage", async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      return res.status(500).json({ error: "Error uploading files" });
    } else if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: "Unknown error" });
    }

    try {
      const files = req.files;

      if (!files || files.length == 0) {
        return res.status(400).send({ error: "Files are required" });
      }

      const imagesURL = [];

      for (let file of files) {
        const localFilePath = file.path;
        const response = await uploadCloudinary(localFilePath);
        imagesURL.push(response.secure_url);
      }

      const imageUpload = new Product({
        ProductPhotos: imagesURL,
        ProductName: req.body.ProductName,
        ProductDescription: req.body.ProductDescription,
        ProductPrice: req.body.ProductPrice,
        ShopName: req.body.ShopName,
        ShortProductDescription: req.body.ShortProductDescription,
        category: req.body.category,
        Pincode:req.body.Pincode,
      });

      await imageUpload.save();

      res.status(200).send({ imageUpload });
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ error: error.message });
    }
  });
});

router.get('/getImage/:id', async (req, res) => {
  try {
    const itemID = req.params.id;
    const item = await Product.findById(itemID);
    if (!item) {
      return res.status(400).send({ error: 'Item Does not exist' });
    }
    res.status(200).send({ item });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
});

router.delete('/deleteImage/:id', async (req, res) => {
  try {
    const imagesId = req.params.id;
    const image = await Product.findByIdAndDelete(imagesId);
    if (!image) {
      return res.status(400).send({ error: 'Item Not Found' });
    }
    res.status(200).send({ image });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
})

export default router;
