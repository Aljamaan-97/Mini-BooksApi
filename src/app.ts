import express, { Request, Response } from "express";
import cors from "cors";
import moragn from "morgan";
import errorHandler from "./middlewares/ErrorHandler";
import notFound from "./middlewares/NotFound";
import authorRouter from "./routers/Author.Router";
import bookRouter from "./routers/Book.Router";
import categoryRouter from "./routers/category.Router";

const app = express();
app.use(express.json());
app.use(cors());
app.use(moragn("dev"));

app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app.use("/categories", categoryRouter);
app.use(errorHandler);
app.use(notFound);

export default app;
