import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt, { compareSync, hash } from "bcrypt";

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

router.post("/ajout_employe", (req, res) => {
  const sql =
    `INSERT INTO employes (nom, email, password, adresse, salaire, profil, idCategorie) VALUES (?)`;
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
      req.body.profil,
      req.body.idCategorie,
    ];
    con.query(sql, [valeur], (err, result) => {
      if (err) {
        return res.json({ Status: false, Error: "Query error" });
      }
      return res.json({ Status: true });
    });
  });
});

export { router as adminRouter };
