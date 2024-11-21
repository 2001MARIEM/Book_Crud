import Book from "../models/book.js";
import Author from "../models/author.js";

export const addBooks = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ model: book, message: "objet créer!" });
  } catch (e) {
    res.status(400).json({ error: e.message, message: "Données invalide" });
  }
};

export const fetchBooks = async (req, res) => {
  const books = await Book.find();
  res.status(200).json({
    model: books,
  });
};
export const fetchBooksById = async (req, res) => {
  try {
    //console.log("id:", req.params.id);
    const book = await Book.findOne({ _id: req.params.id })
      .populate("author")
      .populate("categories");
    if (!book) {
      res.status(404).json({ message: "objet non trouvé" });
    } else {
      res.status(200).json({ model: book, message: "success" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message, message: "accessproblem" });
  }
};

export const addBookWithAuthorCheck = async (req, res) => {
  try {
    // Validation des données du livre
    const { title, author, categories, publishedDate, genre } = req.body;

    // Vérifier si l'auteur existe
    const existingAuthor = await Author.findById(author);
    if (!existingAuthor) {
      return res.status(400).json({ error: "L'auteur n'existe pas." });
    }

    // Vérifier si l'auteur a déjà écrit des livres
    const authorBooks = await Book.find({ author: author });
    if (authorBooks.length === 0) {
      return res.status(400).json({
        error: "L'auteur doit avoir écrit au moins un livre auparavant.",
      });
    }

    // Créer et sauvegarder le livre
    const book = new Book({ title, author, categories, publishedDate, genre });
    await book.save();

    res.status(201).json({ model: book, message: "Livre créé avec succès !" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBooks = async (req, res) => {
  console.log("body:", req.body);
  console.log("id:", req.params.id);
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (!book) {
      res.status(404).json({ message: "Objet non trouvé" });
    } else {
      res.status(200).json({ model: book, message: "objet modifié" });
    }
  } catch (e) {
    res.status(400).json({ error: e.messge, message: "accessproblem" });
  }
};
export const deleteBooks = async (req, res) => {
  console.log("body:", req.body);
  console.log("id:", req.params.id);
  try {
    const book = await Book.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Objet supprimé!" });
  } catch (e) {
    res.status(400).json({ error: e.messge });
  }
};
