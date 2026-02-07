import VerUsuarios from "./pages/VerUsuarios";
import GestionUsuarios from './pages/GestionUsuarios';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import SigninPage from "./pages/SigninPage";
import LoginPage from './pages/LoginPage';
import Mainlobby from './pages/Mainlobby';
import LobbyUSER from './pages/LobbyUSER';
import LobbyAdmin from './pages/LobbyAdmin';
import RegistrarEgreso from './pages/RegistrarEgreso';
import ExportarEgresos from './pages/ExportarEgresos';
import CambiarContraseña from './pages/CambiarContraseña';
import CambiarContraseña2 from './pages/CambiarContraseña2';
import ContraseñaCambiada from './pages/ContraseñaCambiada';
import ContraseñaCambiada2 from './pages/ContraseñaCambiada2';
import CorreoContraseña from './pages/CorreoContraseña';
import HistorialAdmin  from './pages/HistorialAdmin';
import { HashRouter, Routes, Route } from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <HashRouter>

      <Routes>
        <Route path="/VerUsuarios" element={<VerUsuarios />} />
        <Route path="/GestionUsuarios" element={<GestionUsuarios />} />
        <Route path="/" element={<Mainlobby />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SigninPage" element={<SigninPage />} />
        <Route path="/LobbyUSER" element={<LobbyUSER />} />
        <Route path="/LobbyAdmin" element={<LobbyAdmin />} />
        <Route path="/RegistrarEgreso" element={<RegistrarEgreso />} />
        <Route path="/ExportarEgresos" element={<ExportarEgresos />} />
        <Route path="/CambiarContraseña" element={<CambiarContraseña />} />
        <Route path="/CambiarContraseña2" element={<CambiarContraseña2 />} />
        <Route path="/ContraseñaCambiada" element={<ContraseñaCambiada />} />
        <Route path="/ContraseñaCambiada2" element={<ContraseñaCambiada2 />} />
        <Route path="/CorreoContraseña" element={<CorreoContraseña />} />
        <Route path="/HistorialAdmin" element={<HistorialAdmin />} />
      </Routes>

    </HashRouter>
    
  </StrictMode>,
)
