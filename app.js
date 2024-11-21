import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routerBooks from "./routes/book.js";
import routerAuthor from "./routes/author.js";
import routerCategory from "./routes/category.js";
import routerAuth from "./routes/authentificationuser.js";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/DBbooks")
  .then(() => {
    console.log("connection a la BD reussite");
  })
  .catch((e) => {
    console.log("connection a la BD echouée  ");
  });

//middlewares
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

app.use("/api/books", routerBooks);
app.use("/api/auth", routerAuthor);
app.use("/api/category", routerCategory);
app.use("/api/authentification", routerAuth);

export default app;
