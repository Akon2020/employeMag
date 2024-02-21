// import React from 'react'
import { Link } from "react-router-dom";

const Employes = () => {
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Liste des Employés</h3>
      </div>
      <Link to={"/admin/dashboard/ajout_employe"} className="btn btn-success">
        Ajouter un employé
      </Link>
      <div className="mt-5"></div>
    </div>
  );
};

export default Employes;
