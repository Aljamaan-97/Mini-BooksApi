import { Request, Response, NextFunction } from "express";
import Book from "../models/Book";
import Books from "../models/Book";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};
const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find().populate("category");
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};
const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const oneBook = await Book.findById(req.params.id).populate("category");
    res.status(200).json(oneBook);
  } catch (error) {
    next(error);
  }
};
const upDateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;
    const { title, author, category, image } = req.body;
    const updatedbook = await Books.findByIdAndUpdate(
      bookId,
      {
        title,
        author,
        category,
        image,
      },
      { new: true }
    );

    if (updatedbook) {
      res.status(200).json(updatedbook);
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    console.error("Error updating account:", error);
    // res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};
const deleteBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteBook = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteBook);
  } catch (error) {
    next(error);
  }
};

export { createBook, getAllBooks, getBookById, upDateBook, deleteBookById };
