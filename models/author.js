import mongoose from "mongoose";

const authorSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nationality: { type: String },
});

export default mongoose.model("Author", authorSchema);
