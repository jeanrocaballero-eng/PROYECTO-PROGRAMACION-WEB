import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import SigninPage from "./pages/SigninPage";
import LoginPage from './pages/LoginPage';
import Mainlobby from './pages/Mainlobby';
import LobbyUSER from './pages/LobbyUSER';
import LobbyAdmin from './pages/LobbyAdmin';
import EliminarEgreso from './pages/EliminarEgreso';
import EditarEgreso from './pages/EditarEgreso';
import CambiarContraseña from './pages/CambiarContraseña';
import ContraseñaCambiada from './pages/ContraseñaCambiada';
import { HashRouter, Routes, Route } from "react-router-dom";




createRoot(document.getElementById('root')).render(
  <StrictMode>

    <HashRouter>

      <Routes>
        <Route path="/" element={<Mainlobby />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SigninPage" element={<SigninPage />} />
        <Route path="/LobbyUSER" element={<LobbyUSER />} />
        <Route path="/LobbyAdmin" element={<LobbyAdmin />} />
        <Route path="/EliminarEgreso" element={<EliminarEgreso />} />
        <Route path="/EditarEgreso" element={<EditarEgreso />} />
        <Route path="/CambiarContraseña" element={<CambiarContraseña />} />
        <Route path="/ContraseñaCambiada" element={<ContraseñaCambiada />} />
      </Routes>

    </HashRouter>
    
  </StrictMode>,
)
