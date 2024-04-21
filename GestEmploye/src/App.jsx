import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Profiles from "./components/Profiles";
import Employes from "./components/Employes";
import AjoutCategorie from "./components/AjoutCategorie";
import AjoutEmploye from "./components/AjoutEmploye";
import EditEmploye from "./components/EditEmploye";
import Start from "./components/Start";
import AjoutAdmin from "./components/AjoutAdmin";
import EditCategorie from "./components/EditCategorie";
import CarteServices from "./components/CarteServices";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/auth/adminlogin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />} />
          <Route path="/admin/dashboard/employes" element={<Employes />} />
          <Route path="/admin/dashboard/categories" element={<Categories />} />
          <Route path="/admin/dashboard/profiles" element={<Profiles />} />
          <Route
            path="/admin/dashboard/ajout_categorie"
            element={<AjoutCategorie />}
          />
          <Route
            path="/admin/dashboard/ajout_employe"
            element={<AjoutEmploye />}
          />
          <Route
            path="/admin/dashboard/edit_employe/:id"
            element={<EditEmploye />}
          />
          <Route path="/admin/dashboard/ajout_admin" element={<AjoutAdmin />} />
          <Route
            path="/admin/dashboard/edit_categorie/:id"
            element={<EditCategorie />}
          />
          <Route
            path="/admin/dashboard/carteServices"
            element={<CarteServices />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
