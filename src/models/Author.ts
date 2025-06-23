import { model, Schema } from "mongoose";

const authorSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    book: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  },
  {
    timestamps: true,
  }
);

const Author = model("Author", authorSchema);

export default Author;
