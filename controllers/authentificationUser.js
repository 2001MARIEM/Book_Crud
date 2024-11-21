import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const SECRET = "AUTH-SECRET";

//Création d'un utilisateur
export const signup = async (req, res, next) => {
  try {
    const hashedPWD = await bcrypt.hash(req.body.password, 10); //pour securiser le mot de passe

    const user = new User({
      email: req.body.email,
      password: hashedPWD,
      role: req.body.role,
    });
    await user.save(); //Enregistrement dans la base de données

    //Ne jamais exposer le mot de passe (même hashé) dans les réponses envoyées au client.
    const { password, ...newauth } = user.toObject(); //user.toObject(): Convertit l'objet utilisateur MongoDB en un objet JavaScript standard.

    res.status(200).json({
      model: newauth,
      message: "success",
    });
  } catch (e) {
    res.status(400).json({ error: e.message, message: "Registration failed!" });
  }
};

//Authentification d'un utilisateur
export const login = async (req, res, next) => {
  try {
    //find the user by email
    const user = await User.findOne({ email: req.body.email });
    //if not found return error
    if (!user) {
      return res.status(401).json({ message: "login incorrect" });
    }
    //else compare password
    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!user) {
      return res
        .status(401)
        .json({ message: "login ou mot de passe incorrect" });
    }
    //else create token :sécurise les interactions entre le client et le serveur.
    res.status(200).json({
      token: jwt.sign({ userId: user._id }, SECRET, { expiresIn: "24h" }),
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
