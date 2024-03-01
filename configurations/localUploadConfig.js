import multer from "multer";

const storage = multer.diskStorage({
    destination:function (req, file , cb){
        cb(null,"images");
    },

    filename:  function(req, file, cb){            
        cb(null,  Date.now()+file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ){        
        cb(null, true);
    } else{        
        cb(null, false);               
    }
};

export const localUpload =  multer({storage,fileFilter})
