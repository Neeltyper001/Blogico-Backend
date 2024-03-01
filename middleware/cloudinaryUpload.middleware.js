import path from "path";
import { fileURLToPath } from 'url';
import { cloudinary } from "../configurations/cloudinaryUploadConfig.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// middleware for uploading files to cloudinary

export const cloudinaryUploads = async (req, res, next)=>{
    console.log(__dirname)
    const localFilePath = path.join(__dirname, '..','images', req.file.filename);
    console.log(localFilePath);  
    
    console.log(`Req body contains: ${JSON.stringify(req.body.username)}`)
    if(localFilePath){
        console.log("About to upload on cloudinary....")
        try {
          const response = await  cloudinary.uploader.upload(localFilePath,{
                folder:`blogico/users/${req.body.username}/${req.body.upload_asset_type}`,
                resource_type:"image"
            });

         req.body.imageUrl = response.url;
         console.log(req.body.imageUrl)

        } catch (error) {
            return res.json({message:error.message});
        }
        next();
    }

    else{
       return  res.json({message: `No file `})
    }
}