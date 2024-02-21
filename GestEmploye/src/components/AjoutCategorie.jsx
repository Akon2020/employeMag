// import React from 'react'

import { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AjoutCategorie = () => {
  const [categorie, setCategorie] = useState();
  const navigate = useNavigate();
  const ajoutCategorie = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/ajout_categorie", { categorie })
      .then((result) => {
        if (result.data.Status) {
          navigate("/admin/dashboard/categories");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-3 rounded w-30 border">
        <h3 className="text-center">Ajout d&apos;une catégorie</h3>
        <form onSubmit={ajoutCategorie}>
          <div className="mb-3">
            <label htmlFor="categorie" className="mb-3">
              Categorie
            </label>
            <input
              type="text"
              name="categorie"
              className="form-control rounded-0"
              placeholder="Entrez une catégorie"
              onChange={(e) => setCategorie(e.target.value)}
            />
          </div>
          <button className="btn btn-success w-100 rounded-0">Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default AjoutCategorie;
