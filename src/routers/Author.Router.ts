import express from "express";
import {
  getAllauthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../controllers/author.controller";

const authorRouter = express.Router();
authorRouter.get("/", getAllauthors);
authorRouter.post("/", createAuthor);
authorRouter.get("/:id", getAuthorById);
authorRouter.put("/:id", updateAuthor);
authorRouter.delete("/:id", deleteAuthor);

export default authorRouter;
