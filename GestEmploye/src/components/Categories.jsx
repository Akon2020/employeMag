// import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/categories")
      .then((result) => {
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const supprimerCategorie = (id) => {
    axios
      .delete("http://localhost:3000/auth/supprimer_categorie/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Liste de catégories</h3>
      </div>
      <Link to={"/admin/dashboard/ajout_categorie"} className="btn btn-success">
        Ajouter une catégories
      </Link>
      <div className="mt-5">
        <table className="table table-hover">
          {/* table-striped table-hover */}
          <thead>
            <tr>
              <th>Intitulé</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((categorie, i) => (
                <tr key={i}>
                  <td>{categorie.nom}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-3">
                      Modifier
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => supprimerCategorie(categorie.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
