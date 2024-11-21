import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { SECRET } from "../controllers/authentificationUser.js";

//S'assure que l'utilisateur est authentifié (grâce au token).
export const loggedMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //Récupération du token
    console.log("token: ", token);

    const decodedToken = jwt.verify(token, SECRET); // verification du validité du token

    const userId = decodedToken.userId;
    try {
      const user = await User.findOne({ _id: userId }); //recherche de l'utilisateur correspendant au token par le userID
      if (user) {
        req.cnx = {
          //si l'utilisateur est trouvé les infos utiles comme userid et role sont attachés a la requete a l'aide de req.cnx
          userId: userId,
          role: user.role,
        };
        next();
      } else {
        res.status(401).json({ error: "user doesn't exist" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
//vérifie si l'utilisateur authentifié a le rôle admin.
export const isAdmin = (req, res, next) => {
  try {
    if (req.cnx.role === "admin") {
      next(); //Si l'utilisateur a le rôle admin, la requête est transmise à la prochaine étape avec next()
    } else {
      res.status(403).json({ error: "no access to this route" });
    }
  } catch (e) {
    res.status(401).json({ error: error.message });
  }
};
