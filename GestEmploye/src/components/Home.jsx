// import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalEmploye, setTotalEmploye] = useState(0);
  const [totalSalaire, setTotalSalaire] = useState(0);
  const [listeAdmin, setListeAdmin] = useState([]);

  /* useEffect(() => {
    nbrAdmin();
  }, []);
  const nbrAdmin = () => {
    axios
      .get("http://localhost:3000/auth/total_admin")
      .then((result) => {
        if (result.data.Status) {
          setTotalAdmin(result.data.Result[0].admin);
        }
      })
      .catch((err) => console.log(err));
  }; */
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/total_admin")
      .then((result) => {
        setTotalAdmin(result.data.Result[0].admin);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/auth/total_employe")
      .then((result) => {
        setTotalEmploye(result.data.Result[0].employe);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/auth/total_salaire")
      .then((result) => {
        setTotalSalaire(result.data.Result[0].salaire);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/auth/liste_admin")
      .then((result) => {
        setListeAdmin(result.data.Result);
      })
      .catch((err) => console.log(err));
  }, []);
  const supprimerAdmin = (id) => {
    axios
      .delete("http://localhost:3000/auth/supprimer_admin/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{totalAdmin}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employés</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{totalEmploye}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salaire</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{totalSalaire} $</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <div className="d-flex justify-content-between">
          <h3>Liste des Administrateurs</h3>
          <Link to={"/admin/dashboard/ajout_admin"} className="btn btn-success">
            Ajouter un administrateur
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listeAdmin.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.email}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => supprimerAdmin(admin.id)}
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

export default Home;
