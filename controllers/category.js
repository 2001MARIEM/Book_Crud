import Category from "../models/category.js";

export const addCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res
      .status(201)
      .json({ model: category, message: "Category ajouté avec succès !" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ model: categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
