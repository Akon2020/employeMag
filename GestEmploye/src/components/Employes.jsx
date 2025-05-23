// import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employes = () => {
  const [employes, setEmployes] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employes")
      .then((result) => {
        if (result.data.Status) {
          setEmployes(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const supprimerEmploye = (id) => {
    axios
      .delete("http://localhost:3000/auth/supprimer_employe/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };
  const chercher = (nom) => {
    axios
      .get("http://localhost:3000/auth/employes",  nom)
      .then((result) => {
        if (result.data.Status) {
          console.log(result.data);
        } else {
          alert(result.data.Error);
        }
      });
  };
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Liste des Employés</h3>
      </div>
      <div className="d-flex justify-content-between">
        <Link to={"/admin/dashboard/ajout_employe"} className="btn btn-success">
          Ajouter un employé
        </Link>
        <div className="d-flex justify-content-center gap-4">
          <input
            type="search"
            name="search"
            id="search"
            className="form-control rounded"
            placeholder="Rechercher un employé"
          />
          <button
            className="btn btn-primary btn-sm me-3 rounded"
            onClick={chercher}
          >
            Rechercher
          </button>
        </div>
      </div>

      <div className="mt-5">
        <table className="table table-hover">
          {/* table-striped table-hover */}
          <thead>
            <tr>
              <th>Nom</th>
              <th>Profil</th>
              <th>Email</th>
              <th>Adresse</th>
              <th>Salaire</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="container">
            {employes &&
              employes.map((pers, i) => (
                <tr key={i}>
                  <td>{pers.nom}</td>
                  <td>
                    N/A
                    {/* <img
                      src={`http://localhost:300/public/images/` + pers.image}
                      alt=""
                      className="profil-img"
                    /> */}
                  </td>
                  <td>{pers.email}</td>
                  <td>{pers.adresse}</td>
                  <td>{pers.salaire}$</td>
                  <td>
                    <Link
                      to={`/admin/dashboard/edit_employe/` + pers.id}
                      className="btn btn-primary btn-sm me-3"
                    >
                      Modifier
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => supprimerEmploye(pers.id)}
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

export default Employes;
