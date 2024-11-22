import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './login/Login.jsx'
import Cadastro from './cadastro/Cadastro.jsx'
import AddBico from './adicionarBico/AddBico.jsx'
import Home from './home/Home.jsx'
import "./login/App.css"
import Perfil from './perfil/perfil.jsx'
import Cofre from './cofre/cofre.jsx'
import Candidatos from './candidatos/candidatos.jsx'
import Configuracao from './configuracao/configuracao.jsx'
import Notificacao from './notificacao/notificacao.jsx'
import Historico from './historico/historico.jsx'
import Mensagem from './mensagem/mensagens.jsx'
import PerfilUsuario from './perfilUsuario/perfil.jsx'
import MudarSenha from './mudarSenha/mudarSenha.jsx'
import RecuperarSenha from './recuperarSenha/recuperarSenha.jsx'


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path= "/">
                    <Route index element={<Login />} />
                    <Route path="cadastro" element={< Cadastro />} />
                    <Route path="home" element={< Home />} />
                    <Route path="addBico" element={< AddBico />} />
                    <Route path="perfil" element={< Perfil />} />
                    <Route path="cofre" element={< Cofre />} />
                    <Route path="configuracao" element={< Configuracao />} />
                    <Route path="notificacao" element={< Notificacao />} />
                    <Route path="historico" element={< Historico />} />
                    <Route path="mensagem" element={< Mensagem />} />
                  <Route path="candidatos" element={< Candidatos />} />
                  <Route path="/perfilUsuario/:id" element={< PerfilUsuario />} />
                  <Route path="/recuperarSenha" element={< RecuperarSenha />} />
                  <Route path="/mudarSenha" element={< MudarSenha />} />
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);