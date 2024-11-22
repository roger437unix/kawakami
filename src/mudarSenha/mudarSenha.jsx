import React, { useState } from 'react';
import './App.css';

const MudarSenha = () => {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackTipo, setFeedbackTipo] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);

  // Alterna a visibilidade da senha
  const toggleSenha = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const toggleConfirmarSenha = () => {
    setConfirmarSenhaVisivel(!confirmarSenhaVisivel);
  };

  // Valida as senhas
  const validaSenhas = () => {
    if (senha.length <= 8 && confirmarSenha.length <= 8) {
      if (senha === confirmarSenha) {
        setFeedback('');
        setFeedbackTipo('');
      } else {
        setFeedback('Senhas não coincidem');
        setFeedbackTipo('erro');
      }
    } else {
      setFeedback('As senhas devem ter no máximo 8 caracteres');
      setFeedbackTipo('erro');
    }
  };

  // Ao digitar no campo de senha ou confirmar senha
  const handleChangeSenha = (e) => {
    setSenha(e.target.value);
    validaSenhas();
  };

  const handleChangeConfirmarSenha = (e) => {
    setConfirmarSenha(e.target.value);
    validaSenhas();
  };

  // Ao clicar no botão de atualizar
  const handleAtualizar = () => {
    if (senha === confirmarSenha && senha.length <= 8 && confirmarSenha.length <= 8) {
      setFeedback('Senha alterada com sucesso');
      setFeedbackTipo('sucesso');
    }
  };

  return (
    <div className="container4">
      <div className="decoracaoLaranja-senha"></div>
      <div className="decoracaoCinza-senha"></div>
      <div className="decoracaoCinza2-senha"></div>
      <div className="logoPrincipal">
        <img src="../img/logoPrincipal.svg" alt="Logo Principal" />
      </div>

      <div className="container-mudar">

      <div className="card-mudar">
        <h2 className='mudar'>Crie uma nova senha</h2>

        <div className="input-container">
          <label htmlFor="senha">Senha</label>
          <div className="input-wrapper">
            <span className="lock-icon">&#128274;</span>
            <input
              type={senhaVisivel ? 'text' : 'password'}
              id="senha"
              value={senha}
              onChange={handleChangeSenha}
              placeholder="Senha"
              maxLength="8"
            />
            <span className="eye-icon" onClick={toggleSenha}>
              &#128065;
            </span>
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="confirmarSenha">Confirme sua senha</label>
          <div className="input-wrapper">
            <span className="lock-icon">&#128274;</span>
            <input
              type={confirmarSenhaVisivel ? 'text' : 'password'}
              id="confirmarSenha"
              value={confirmarSenha}
              onChange={handleChangeConfirmarSenha}
              placeholder="Confirme sua senha"
              maxLength="8"
            />
            <span className="eye-icon" onClick={toggleConfirmarSenha}>
              &#128065;
            </span>
          </div>
        </div>
      </div>

      {feedback && (
        <div className={`feedback ${feedbackTipo === 'erro' ? 'error' : ''}`}>
          {feedback}
        </div>
      )}

      <button
        id="atualizar"
        className="btn-laranja"
        onClick={handleAtualizar}
        disabled={senha !== confirmarSenha || senha.length > 8 || confirmarSenha.length > 8}
      >
        Atualizar
      </button>
    </div>
    </div>
  );
};

export default MudarSenha;
