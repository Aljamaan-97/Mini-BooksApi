import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

const Category = model("category", categorySchema);

export default Category;
