import exspress from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  upDateBook,
  deleteBookById,
} from "../controllers/book.controller";
import upload from "../middlewares/multer";

const bookRouter = exspress.Router();

bookRouter.get("/", getAllBooks);
bookRouter.post("/", upload.single("image"), createBook);
bookRouter.get("/:id", getBookById);
bookRouter.put("/:id", upload.single("image"), upDateBook);
bookRouter.delete("/:id", deleteBookById);
// bookRouter.get("/images");

export default bookRouter;
