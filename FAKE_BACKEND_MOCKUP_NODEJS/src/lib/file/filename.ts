import moment from "moment-timezone";

export function fileNameGenerate(req, file, cb) {
    const uniqueSuffix = moment().unix();

    let fileExtension = "";

    if(file.mimetype.indexOf("jpeg") > -1){
        fileExtension = "jpg"
    }
    else if(file.mimetype.indexOf("png") > -1){
        fileExtension = "png";
    }

    const originalName = file.originalname.split(".")[0];

    cb(null, originalName + '-' + uniqueSuffix + "." + fileExtension);
  }