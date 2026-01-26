import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import SigninPage from "./pages/SigninPage";
import Mainlobby from './pages/Mainlobby';
import LobbyUSER from './pages/LobbyUSER';
import { HashRouter, Routes, Route } from "react-router-dom";




createRoot(document.getElementById('root')).render(
  <StrictMode>

    <HashRouter>

      <Routes>
        <Route path="/" element={<Mainlobby />} />
        <Route path="/SigninPage" element={<SigninPage />} />
        <Route path="/LobbyUSER" element={<LobbyUSER />} />
      </Routes>

    </HashRouter>
    
  </StrictMode>,
)
