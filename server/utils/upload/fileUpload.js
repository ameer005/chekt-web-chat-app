const multer = require("multer");
const dotenv = require("dotenv");
const B2 = require("backblaze-b2");
const crypto = require("crypto");

const AppError = require("../appError/appError");
dotenv.config();

const b2 = new B2({
  applicationKeyId: process.env.B2_ID,
  applicationKey: process.env.B2_KEY,
});

exports.imageUpload = (fileType) => {
  const storage = multer.memoryStorage();

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith(fileType)) {
      cb(null, true);
    } else {
      if (fileType === "image") {
        cb(new AppError(" Please upload image only", 400), false);
      } else {
        cb(new AppError("Not a zip! Please upload zip only", 400), false);
      }
    }
  };

  return multer({ storage: storage, fileFilter: multerFilter });
};

exports.b2Upload = async (data) => {
  try {
    await b2.authorize();
    const { data: uploadUrl } = await b2.getUploadUrl({
      bucketId: process.env.B2_BUCKET_ID,
    });

    const filename = `data.originalname`;

    await b2.uploadFile({
      uploadUrl: uploadUrl.uploadUrl,
      uploadAuthToken: uploadUrl.authorizationToken,
      fileName: filename,
      data: data.buffer,
      mime: data.mimetype,
    });

    return `${process.env.IMAGE_URL}hls/${filename}`;
  } catch (err) {
    console.log(err);
  }
};
