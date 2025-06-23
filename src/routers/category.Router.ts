import express from "express";
import {
  getAllCategory,
  createCategory,
  updatecategory,
  getCategoryById,
  deleteCategory,
} from "../controllers/category.controller";

const categoryRouter = express.Router();
categoryRouter.get("/", getAllCategory);
categoryRouter.post("/", createCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.put("/:id", updatecategory);
categoryRouter.delete("/:id", deleteCategory);
export default categoryRouter;
