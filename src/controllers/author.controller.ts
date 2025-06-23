import { Request, Response, NextFunction } from "express";
import Author from "../models/Author";

//get all authors and populate the post field with title and body
const getAllauthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authors = await Author.find().populate("book");
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};
// create a new author
const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
};

// find an author by id and populate the post field with title and body
const getAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = await Author.findById(req.params.id).populate("book");

    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};
// update an author by id
const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, country, book } = req.body;
    const author = await Author.findByIdAndUpdate(
      id,
      { name, country, book },
      { new: true, runValidators: true }
    );

    if (!author) {
      res.status(404).json({ error: "Author not found." });
    }

    res.status(200).json({
      status: "Success",
      message: "Author information is updated successfully.",
      author,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: `Failed to update author information. Error: ${error}`,
    });
  }
};
// delete an author by id
const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Author deleted" });
  } catch (error) {
    next(error);
  }
};

export {
  getAllauthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
