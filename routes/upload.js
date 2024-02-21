import express from 'express'
import uploadConfigurations from '../middleware/upload.js';
import { uploadFileController } from "../controllers/uploadController.js";

const uploadRoute = express.Router();

uploadRoute.post('/',uploadConfigurations.single("file"),uploadFileController);

export default uploadRoute;