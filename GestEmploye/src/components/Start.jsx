// import React from 'react'
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>Home | GestEmploye</h1>
      <div className="mt-3">
        <Link to={"/auth/adminlogin"} className="btn btn-success rounded">
          Portail Admin
        </Link>
      </div>
    </div>
  );
};

export default Start;
