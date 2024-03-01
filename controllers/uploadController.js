export const uploadFileController = (req, res)=>{
     try {
          console.log('from cloudinary middleware now inside uploadFileController') 
          console.log(req.body.imageUrl)
          res.status(200).json(req.body.imageUrl);
          
     } catch (error) {
          res.status(500).json({"message":error.message})
     }
}