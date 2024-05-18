import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: "dqxetiqvl", 
    api_key: "374598862447289", 
    api_secret: "ZVvQrwa6paIRTx33qX_Gry71V6c" // Click 'View Credentials' below to copy your API secret
});
const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    })
    console.log("File uploaded successfully",
      response.url);
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
}

export default uploadCloudinary;