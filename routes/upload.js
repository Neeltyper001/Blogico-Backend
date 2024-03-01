import express from 'express'
import { uploadFileController } from "../controllers/uploadController.js";
import { localUpload } from '../configurations/localUploadConfig.js';
import { cloudinaryUploads } from '../middleware/cloudinaryUpload.middleware.js';

const uploadRoute = express.Router();


/** Two steps to attain here
 * 1. Upload the file to multer that stores locally for temporary duration
 * 2. Uploading the locally uploaded file to cloudinary and then unlinking the file
 */

uploadRoute.post('/', localUpload.single('file') , cloudinaryUploads, uploadFileController);

export default uploadRoute;