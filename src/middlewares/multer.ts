import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extValid = filetypes.test(
      path.extname(file.originalname).toLocaleLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype.toLowerCase());

    if (mimetype && extValid) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed! of types: jpg, jpeg, png"));
    }
  },
});

export default upload;
