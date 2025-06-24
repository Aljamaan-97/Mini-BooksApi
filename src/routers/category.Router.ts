import express from "express";
import {
  getAllCategory,
  createCategory,
  updatecategory,
  getCategoryById,
  deleteCategory,
  addBookToCategory,
} from "../controllers/category.controller";

const categoryRouter = express.Router();
categoryRouter.get("/", getAllCategory);
categoryRouter.post("/", createCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.put("/:id", updatecategory);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.post("/:postId/:tagId", addBookToCategory);
export default categoryRouter;
