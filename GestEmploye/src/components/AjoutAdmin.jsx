// import React from 'react'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AjoutAdmin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const ajouterAdmin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", admin.email);
    formData.append("password", admin.password);
    axios
      .post("http://localhost:3000/auth/ajout_admin", admin)
      .then((result) => {
        if (result.data.Status) {
          navigate("/admin/dashboard");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Ajout d&apos;un administrateur</h3>
        <form onSubmit={ajouterAdmin}>
          <div className="mb-3">
            <label htmlFor="email" className="mb-3">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control rounded-0"
              placeholder="Entrez l'email pour l'administrateur"
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="mb-3">
              Mot de passe
            </label>
            <input
              type="text"
              name="password"
              className="form-control rounded-0"
              placeholder="Créez un mot de passe pour l'administrateur"
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
            />
          </div>
          <button className="btn btn-success w-100 rounded-0">
            Ajouter l&apos;administrateur
          </button>
        </form>
      </div>
    </div>
  );
};

export default AjoutAdmin;
