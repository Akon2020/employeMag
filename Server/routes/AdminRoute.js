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

router.post("/ajout_employe", (req, res) => {
  // , upload.single("image")
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

router.get("/employes", (req, res) => {
  const sql = "SELECT * FROM employes ORDER BY nom";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employe/:id", (req, res) => {
  const sql = "SELECT * FROM employes WHERE id = ?";
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.put("/edit_employe/:id", (req, res) => {
  const sql = `UPDATE employes SET nom = ?, email = ?, salaire = ?, adresse = ?, idCategorie = ? WHERE id = ?`;
  const valeur = [
    req.body.nom,
    req.body.email,
    req.body.salaire,
    req.body.adresse,
    req.body.idCategorie,
  ];
  con.query(sql, [...valeur, req.params.id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/supprimer_employe/:id", (req, res) => {
  const sql = `DELETE FROM employes WHERE id = ?`;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" + err });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get("/total_admin", (req, res) => {
  const sql = "SELECT COUNT(id) as admin FROM admin";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get("/total_employe", (req, res) => {
  const sql = "SELECT COUNT(id) as employe FROM employes";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get("/total_salaire", (req, res) => {
  const sql = "SELECT SUM(salaire) as salaire FROM employes";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get("/liste_admin", (req, res) => {
  const sql = "SELECT * FROM admin";
  con.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.post("/ajout_admin", (req, res) => {
  const sql = `INSERT INTO admin (id, email, password) VALUES (NULL, ?, ?)`;
  const infoValeur = [req.body.email, req.body.password];
  con.query(sql, [...infoValeur], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" + err });
    }
    return res.json({ Status: true });
  });
});

router.delete("/supprimer_admin/:id", (req, res) => {
  const sql = `DELETE FROM admin WHERE id = ?`;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" + err });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get("/categories/:id", (req, res) => {
  const sql = "SELECT * FROM categories WHERE id = ?";
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/supprimer_categorie/:id", (req, res) => {
  const sql = `DELETE FROM categories WHERE id = ?`;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" + err });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.put("/edit_categorie/:id", (req, res) => {
  const sql = `UPDATE categories SET nom = ? WHERE id = ?`;
  // const valeur = [req.body.nom];
  con.query(sql, [req.body.nom, req.params.id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }
    return res.json({ Status: true, Result: result, message: "Catégorie modifié avec succès" });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as adminRouter };
