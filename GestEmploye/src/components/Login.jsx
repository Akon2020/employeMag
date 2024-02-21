// import React from "react";
import { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const connexion = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/auth/adminlogin", values)
      .then((result) => {
        if (result.data.loginStatus) {
          navigate("/admin/dashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        {error && (
          <div className="alert alert-danger rounded-0" role="alert">
            {error}
          </div>
        )}
        <h2>Login | Admin Portail</h2>
        <form onSubmit={connexion}>
          <div className="mb-3">
            <label htmlFor="email" className="mb-3">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control rounded-0"
              autoComplete="off"
              placeholder="Entrez votre email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="mb-3">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control rounded-0"
              placeholder="Entrez votre mot de passe"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <button className="btn btn-success w-100 rounded-0">Connexion</button>
          <div className="mt-3 mb-3">
            <input type="checkbox" className="me-2" name="tick" id="tick" />
            <label htmlFor="password">Se souvenir de moi</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
