// import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import con from "../../../Server/utils/db";

const Home = () => {
  const [totalAdmin, setTotalAdmin] = useState();
  const [totalEmploye, setTotalEmploye] = useState();
  const [totalSalaire, setTotalSalaire] = useState();
  useEffect(() => {
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
  };
  /* useEffect(() => {
    axios
      .get("http://localhost:3000/auth/total_admin")
      .then((result) => {
        setTotalAdmin(result.data.Result[0].total);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/auth/total_employe")
      .then((result) => {
        setTotalEmploye(result.data.Result[0].total);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/auth/total_salaire")
      .then((result) => {
        setTotalSalaire(result.data.Result[0].total);
      })
      .catch((err) => console.log(err));
  }, []); */
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
            <h5>{totalSalaire}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
