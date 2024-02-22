import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Categories from './components/Categories'
import Profiles from './components/Profiles'
import Employes from './components/Employes'
import AjoutCategorie from './components/AjoutCategorie'
import AjoutEmploye from './AjoutEmploye'
import EditEmploye from './components/EditEmploye'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/adminlogin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />}>
          <Route path='' element={<Home/>} />
          <Route path='/admin/dashboard/employes' element={<Employes/>} />
          <Route path='/admin/dashboard/categories' element={<Categories/>} />
          <Route path='/admin/dashboard/profiles' element={<Profiles/>} />
          <Route path='/admin/dashboard/ajout_categorie' element={<AjoutCategorie/>} />
          <Route path='/admin/dashboard/ajout_employe' element={<AjoutEmploye/>} />
          <Route path='/admin/dashboard/edit_employe/:id' element={<EditEmploye/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
