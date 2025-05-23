// import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const Deconnection = () => {
    axios
      .get("http://localhost:3000/auth/logout")
      .then((result) => {
        if (result.data.Status) {
          navigate("/auth/adminlogin");
        }
      })
      .catch((err) => console.log(err));
    /* localStorage.removeItem("token");
    window.location.href = "/auth/adminlogin"; */
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to={"/admin/dashboard"}
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                GestEmploye
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to={"/admin/dashboard"}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={"/admin/dashboard/employes"}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-people"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Gestion d&apos;employé
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={"/admin/dashboard/categories"}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-bar-chart-line"></i>
                  <span className="ms-2 d-none d-sm-inline">Catégories</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={"/admin/dashboard/profiles"}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-person"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={"/admin/dashboard/carteServices"}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-bank"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Carte de service
                  </span>
                </Link>
              </li>
              <li className="w-100" onClick={Deconnection}>
                <Link className="nav-link text-white px-0 align-middle">
                  <i className="fs-4 bi-power"></i>
                  <span className="ms-2 d-none d-sm-inline">Deconnexion</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Portail | Gestion des Employés</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
