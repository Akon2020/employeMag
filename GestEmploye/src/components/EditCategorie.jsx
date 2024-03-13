// import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCategorie = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [categorie, setCategorie] = useState({
    nom: "",
  });
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/categories/" + id)
      .then((result) => {
        setCategorie({
          ...categorie,
          nom: result.data.Result[0].nom,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const modifierCategorie = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/edit_categorie/" + id, categorie)
      .then((result) => {
        if (result.data.Status) {
          setAlert(result.data.message);
          setTimeout(() => {
            setAlert(null);
            navigate("/admin/dashboard/categories");
          }, 1700);
        } else {
          alert(result.data.Error);
        }
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-3 rounded w-30 border">
        {alert && (
          <div className="alert alert-success rounded-0" role="alert">
            {alert}
          </div>
        )}
        <h3 className="text-center">Modification d&apos;une catégorie</h3>
        <form onSubmit={modifierCategorie}>
          <div className="mb-3">
            <label htmlFor="categorie" className="mb-3">
              Categorie
            </label>
            <input
              type="text"
              name="categorie"
              className="form-control rounded-0"
              placeholder="Entrez la nouvelle appellation cet catégorie"
              value={categorie.nom}
              onChange={(e) =>
                setCategorie({ ...categorie, nom: e.target.value })
              }
            />
          </div>
          <button className="btn btn-success w-100 rounded-0">Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default EditCategorie;
