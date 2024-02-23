export const uploadFileController = (req, res)=>{
     try {
          res.status(200).json("File uploaded successfully");
          
     } catch (error) {
          res.status(500).json({"message":error.message})
     }
}