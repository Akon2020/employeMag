// import React from 'react'
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditEmploye = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employe, setEmploye] = useState({
    nom: "",
    email: "",
    salaire: "",
    adresse: "",
    idCategorie: "",
  });
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

    axios
      .get("http://localhost:3000/auth/employe/" + id)
      .then((result) => {
        setEmploye({
          ...employe,
          nom: result.data.Result[0].nom,
          email: result.data.Result[0].email,
          salaire: result.data.Result[0].salaire,
          adresse: result.data.Result[0].adresse,
          idCategorie: result.data.Result[0].idCategorie,
        });
      })
      .catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const modifierEmploye = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/edit_employe/" + id, employe)
      .then((result) => {
        if (result.data.Status) {
          alert("Employé modifié avec succès");
          navigate("/admin/dashboard/employes");
        } else {
          alert(result.data.Error);
        }
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  };
  // const [error, setError] = useState(null);
  // const [values, setValues] = useState({ nom: "", prenom: "", email: "", categorie: "" });
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center mb-5">
          Modifier les informations d&apos;un employé
        </h3>
        <form className="row g-1" onSubmit={modifierEmploye}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Nom de l&apos;employé
            </label>
            <input
              type="text"
              id="inputName"
              className="form-control rounded-0"
              placeholder="Entrez le nom de l'employé"
              value={employe.nom}
              onChange={(e) => setEmploye({ ...employe, nom: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label">
              Email de l&apos;employé
            </label>
            <input
              type="email"
              id="inputEmail"
              className="form-control rounded-0"
              placeholder="Entrez l'email de l'employé"
              value={employe.email}
              autoComplete="off"
              onChange={(e) =>
                setEmploye({ ...employe, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSalaire" className="form-label">
              Salaire
            </label>
            <input
              type="text"
              id="inputSalaire"
              className="form-control rounded-0"
              placeholder="Entrez le salaire de l'employé"
              value={employe.salaire}
              autoComplete="off"
              onChange={(e) =>
                setEmploye({ ...employe, salaire: e.target.value })
              }
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="inputAdresse" className="form-label">
              Adresse de l&apos;employé
            </label>
            <input
              type="text"
              id="inputAdresse"
              placeholder="Entrez l'adresse de l'employé"
              className="form-control rounded-0"
              value={employe.adresse}
              onChange={(e) =>
                setEmploye({ ...employe, adresse: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="categorie" className="form-label">
              Categorie de l&apos;employé
            </label>
            <select
              name="categorie"
              id="categorie"
              className="form-select"
              value={employe.idCategorie}
              onChange={(e) =>
                setEmploye({ ...employe, idCategorie: e.target.value })
              }
            >
              {categories &&
                categories.map((categorie, i) => (
                  <option key={i} value={categorie.id}>
                    {categorie.nom}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-12 mt-4">
            <button className="btn btn-success w-100 rounded-0">
              Modifier les informations
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmploye;
