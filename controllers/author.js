import Author from "../models/author.js";

export const addAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res
      .status(201)
      .json({ model: author, message: "Auteur ajouté avec succès !" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json({ model: authors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
