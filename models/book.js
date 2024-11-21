import mongoose from "mongoose";
const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  //author: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  ],

  publishedDate: { type: Date, required: true },
  genre: { type: String },
  available: { type: Boolean, default: true, required: true },
});
export default mongoose.model("Book", bookSchema);
