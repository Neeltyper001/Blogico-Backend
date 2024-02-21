import multer from "multer";

const storage = multer.diskStorage({
    destination:function (req, file , cb){
        cb(null,'images');
    },

    filename:  function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:|\./g,'')+" "+ file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);

    }
};

let uploadConfigurations = multer({storage: storage, fileFilter: fileFilter,})
export default uploadConfigurations