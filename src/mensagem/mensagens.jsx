import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import './App.css';
import { Link, useNavigate } from "react-router-dom"

const Mensagem = () => {
  const [hasMessages, setHasMessages] = useState(true);  // Definido para "true" para mostrar as mensagens inicialmente
  const [activeChat, setActiveChat] = useState(null);

  const chats = [
    { id: 1, name: "Mari Silva", message: "Oi, tudo bem?", time: "10:30", icon: "./Icon - perfil.png" },
    { id: 2, name: "Lucas Santos", message: "Olá", time: "11:45", icon: "./Icon - perfil.png" },
    { id: 3, name: "Ana Souza", message: "Está chegando?", time: "12:00", icon: "./Icon - perfil.png" },
  ];

  const toggleChat = (id) => {
    setActiveChat(id === activeChat ? null : id);
  };

  const renderMessages = () => (
    <div className="messages-container">
      <div className="chat-list">
        {chats.map((chat) => (
          <div className="conversa" onClick={() => toggleChat(chat.id)} key={chat.id}>
            <img src={chat.icon} alt="Perfil" className="icon-conversa" />
            <div className="nome-conversa">{chat.name}</div>
            <div className="mensagem-conversa">{chat.message}</div>
            <div className="hora-conversa">{chat.time}</div>
          </div>
        ))}
      </div>

      {activeChat && (
        <div className="chat">
          <div className="chat-header">
            <div className="btn-voltar-chat" onClick={() => setActiveChat(null)}>←</div>
            <div className="nome-pessoa-chat">
              {chats.find(chat => chat.id === activeChat)?.name}
            </div>
          </div>

          <div className="chat-conversa">
            <div className="msg-recebida">
              <img src="./Imagem - Perfil.png" alt="Perfil" className="foto-perfil-recebido" />
              <div className="mensagem-texto">Oi, tudo bem?</div>
            </div>
            <div className="msg-enviada">
              <div className="mensagem-texto">Oi! Como você está?</div>
              <img src="./jwhk 1.png" alt="Perfil" className="foto-perfil-enviado" />
            </div>
          </div>

          <div className="input-mensagem">
            <input type="text" className="input-texto" placeholder="Digite sua mensagem" />
            <button className="btn-enviar-chat">Enviar</button>
          </div>
        </div>
      )}
    </div>
  );

  const renderEmptyMessages = () => (
    <div className="empty-messages">
      <div className="empty-icon">✉</div>
      <p className="empty-text">Você não possui mensagens...</p>
    </div>
  );

  return (
    <div className="chat-container">
      
      <div className="menu-lateral">
       <Link to="/home">
       <button className="btn-voltar">&#8592;</button>
       </Link>
       
      </div>

      <div className="area-central">
        <input type="text" className="barra-pesquisa" placeholder="Pesquisar conversa" />
        <div className="linha-laranja"></div>
        <div className="linha-preta"></div>

        {hasMessages ? renderMessages() : renderEmptyMessages()}
      </div>

      <div className="lado-direito">
        <div className="icone-mensagem">✉</div>
        <button className="btn-enviar" onClick={() => setHasMessages(!hasMessages)}>
          {hasMessages ? 'Ver sem mensagens' : 'Ver com mensagens'}
        </button>
      </div>
    </div>
  );
};

export default Mensagem;
