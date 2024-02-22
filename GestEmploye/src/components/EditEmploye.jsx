// import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'

const EditEmploye = () => {
    const {id} = useParams()
    const [employe, setEmploye] = useState({
      nom: "",
      email: "",
      password: "",
      salaire: "",
      adresse: "",
      idCategorie: "",
      profil: "",
    });
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center mb-5">
          Modifier les informations d&apos;un employé
        </h3>
        <form className="row g-1">
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Nom de l&apos;employé
            </label>
            <input
              type="text"
              id="inputName"
              className="form-control rounded-0"
              placeholder="Entrez le nom de l'employé"
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
              autoComplete="off"
              onChange={(e) =>
                setEmploye({ ...employe, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword" className="form-label">
              Mot de passe
            </label>
            <input
              type="password"
              id="inputPassword"
              className="form-control rounded-0"
              placeholder="Entrez le mot de passe choisi par l'employé"
              onChange={(e) =>
                setEmploye({ ...employe, password: e.target.value })
              }
            />
            <label htmlFor="inputSalaire" className="form-label">
              Salaire
            </label>
            <input
              type="text"
              id="inputSalaire"
              className="form-control rounded-0"
              placeholder="Entrez le salaire de l'employé"
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
              onChange={(e) =>
                setEmploye({ ...employe, idCategorie: e.target.value })
              }
            >
              {employe &&
                employe.map((categorie, i) => (
                  <option key={i} value={categorie.id}>
                    {categorie.nom}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="inputProfil" className="form-label">
              Profil de l&apos;employé
            </label>
            <input
              type="file"
              id="inputProfil"
              name="image"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmploye({ ...employe, profil: e.target.files[0] })
              }
            />
          </div>
          <div className="col-12">
            <button className="btn btn-success w-100 rounded-0">
              Enregister les informations
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmploye