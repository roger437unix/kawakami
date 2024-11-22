import React, { useState } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/2.0/touccan';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.senha) {
      setErros({ mensagem: "Preencha todos os campos." });
      return;
    }

    console.log('Dados enviados:', formData);

    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/login/cliente`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log('Status da resposta:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Dados recebidos:', data);
        localStorage.setItem("id_cliente", data.cliente.id);
        navigate('/home');

      } else if (response.status === 401) {
        setErros({ mensagem: "E-mail ou senha incorretos. Verifique e tente novamente." });

      } else {
        const errorText = await response.text();
        console.error('Erro ao fazer login:', errorText);
        setErros({ mensagem: "Erro ao fazer login. Tente novamente" });
      }

    } catch (error) {
      console.error('Erro de conexão:', error);
      setErros({ mensagem: "Erro de conexão. Verifique sua internet e tente novamente." });

    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    const inputSenha = document.getElementById('senha');
    inputSenha.classList.toggle('show');
    inputSenha.type = inputSenha.classList.contains('show') ? 'text' : 'password';
  };

  return (
    <div>
      <div className='container'>
        <div className="decoracaoLaranja-login"></div>
        <div className="decoracaoCinza-login"></div>
        <div className="decoracaoCinza2-login"></div>
        <div className="logoPrincipal">
          <img src='../img/logoPrincipal.svg' alt="Logo Principal" />
        </div>
      </div>

      <div className="app-container-login">
        {/* <h1 className='login-title'>Login</h1> */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className='input-div-login'>
              <img src="../img/email.png" alt="Email" width={18} />
              <input
                type="email"
                name="email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="E-mail"
                required
              />
            </div>

            <div className='input-div-login'>
              <img src="../img/senha.png" alt="Senha" />
              <input
                id='senha'
                type="password"
                name="senha"
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                placeholder="Senha"
                required
              />
              <img
                src="../img/olho.png"
                alt="Mostrar Senha"
                style={{ cursor: 'pointer' }}
                onClick={togglePassword}
              />
            </div>

            {erros.mensagem && (
              <span style={{ color: 'red', fontSize: '14px' }}>{erros.mensagem}</span>
            )}

            <Link to="/recuperarSenha">
              <a href="#">Esqueceu sua senha?</a>
            </Link>

          </div>

          <button type="submit" disabled={loading} style={{ marginTop: '20px' }}>
            Entrar
          </button>
        </form>


        <Link to="/cadastro" style={{ marginTop: '20px', display: 'block' }}>
          Não tem uma conta? <br />
          <span>Faça seu cadastro</span>
        </Link>

      </div>
    </div>
  );
}

export default Login;
