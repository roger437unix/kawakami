import React, { useRef } from 'react';
import './App.css';
import { Link, useNavigate } from "react-router-dom"

const RecuperarSenha = () => {
  const inputsRef = useRef([]);

  // Função para focar no próximo campo quando um campo recebe um valor
  const handleInputChange = (index) => {
    if (inputsRef.current[index].value.length === 1 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Função para mover o foco para o campo anterior quando Backspace é pressionado e o campo está vazio
  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && inputsRef.current[index].value.length === 0 && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className='container2'>
        <div className="decoracaoLaranja-senha"></div>
        <div className="decoracaoCinza-senha"></div>
        <div className="decoracaoCinza2-senha"></div>
        <div className="logoPrincipal">
          <img src='../img/logoPrincipal.svg' alt="Logo Principal" />
        </div>

        <div className="content-container2">
          {/* Mensagem de Feedback */}
          <div id="feedback" className="feedback"></div>

          <div className="cardSenha">
            <h2>
              Digite o código em <p>seu e-mail</p>
            </h2>

            {/* Campos de entrada para o código de recuperação */}
            <div className="codigo-inputs">
              {[...Array(3)].map((_, index) => (
                <input
                  key={index}
                  ref={el => inputsRef.current[index] = el}
                  type="text"
                  maxLength="1"
                  className="codigo-digit"
                  onInput={() => handleInputChange(index)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>
          </div>

          {/* Texto e botão "Atualizar" */}
          <div className="codigo">Não recebeu um código?</div>
          <Link to="/mudarSenha">
          <button id="atualizar" className="btn-laranja">Enviar outro</button>
          </Link>
          
        </div>
    </div>
  );
};

export default RecuperarSenha;
