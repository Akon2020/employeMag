import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();
router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Query error" });
    }
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({
        loginStatus: false,
        Error: "Email ou mot de passe invalide!",
      });
    }
  });
});

router.get("/categories", (req, res) => {
  const sql = "SELECT * FROM categories ORDER BY nom";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.post("/ajout_categorie", (req, res) => {
  const sql = "INSERT INTO categories (`nom`) VALUES (?)";
  con.query(sql, [req.body.categorie], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }
    return res.json({ Status: true });
  });
});

/* const storage = multer.diskStorage({
  destination: (req, file, callbackFunc) => {
    callbackFunc(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
}); */

router.post("/ajout_employe", (req, res) => { // , upload.single("image")
  const sql = `INSERT INTO employes (nom, email, password, adresse, salaire, profil, idCategorie) VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }
    const valeur = [
      req.body.nom,
      req.body.email,
      hash,
      req.body.adresse,
      req.body.salaire,
      req.body.profil, // req.file.filename,
      req.body.idCategorie,
    ];
    con.query(sql, [valeur], (err, result) => {
      if (err) {
        return res.json({ Status: false, Error: err.message });
      }
      return res.json({ Status: true });
    });
  });
});

export { router as adminRouter };
