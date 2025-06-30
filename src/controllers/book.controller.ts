import { Request, Response, NextFunction } from "express";
import Book from "../models/Book";
import Author from "../models/Author";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, authorId } = req.body;
    let imagePath = req.body.image;
    if (req.file) {
      imagePath = req.file.path;
    }
    const newBook = await Book.create({
      title,
      image: imagePath,
      author: authorId,
    });
    await Author.findByIdAndUpdate(authorId, {
      $push: { book: newBook._id },
    });
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};
const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find().populate("category").populate("author");
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};
const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const oneBook = await Book.findById(req.params.id)
      .populate("category")
      .populate("author");
    res.status(200).json(oneBook);
  } catch (error) {
    next(error);
  }
};
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;
    const updateData: any = {};
    const { title, author, category } = req.body;
    if (title) updateData.title = title;
    if (author) updateData.author = author;
    if (category) updateData.category = category;
    if (req.file) {
      updateData.image = req.file.path;
    } else if (req.body.image) {
      updateData.image = req.body.image;
    }
    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true,
    });
    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: "book not found" });
    }
  } catch (error) {
    console.error("Error updating book:", error);
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

export { createBook, getAllBooks, getBookById, updateBook, deleteBookById };
