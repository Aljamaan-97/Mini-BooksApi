import { Response, Request, NextFunction } from "express";
import Category from "../models/category";
import Books from "../models/Book";

const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categorys = await Category.find().populate({
      path: "books",
      select: "title author publishedDate",
    });
    res
      .status(200)
      .json({ message: `all category fetched ${categorys}`, categorys });
  } catch (error) {
    next(error);
  }
};
const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newcategory = await Category.create(req.body);
    res.status(201).json(`created ${newcategory}`);
  } catch (error) {
    next(error);
  }
};
const updatecategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const { name, books } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        books,
      },
      { new: true }
    );

    if (updatedCategory) {
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: `category not found ${req.params.id}` });
    }
  } catch (error) {
    console.error("Error updating account:", error);

    next(error);
  }
};
const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(`deleted ${category}`);
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const oneCategory = await Category.findById(req.params.id).populate("book");
    res.status(200).json(oneCategory);
  } catch (error) {
    next(error);
  }
};

const addBookToCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId, categoryId } = req.params;

    await Category.findByIdAndUpdate(categoryId, { $push: { book: bookId } });

    await Books.findByIdAndUpdate(bookId, { $push: { category: categoryId } });

    res.status(200).json({ message: "category added to post successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  getAllCategory,
  createCategory,
  updatecategory,
  deleteCategory,
  getCategoryById,
  addBookToCategory,
};
