import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    enum: ["Horror", "Mystery", "Science Fiction", "Fantasy"],
    required: true,
  },
});

export default mongoose.model("Category", categorySchema);
