import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import Sidebar from '../components/Sidebar.jsx';

const PerfilUsuario = () => {
  const { id } = useParams();
  const [mudarTab, setMudarTab] = useState('sobre');
  const [dadosUsuario, setDadosUsuario] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]); // Estado para armazenar os feedbacks

  useEffect(() => {
    if (!id) return;
    fetchDadosUsuario(id);
    fetchFeedbacks(id); // Carregar feedbacks ao carregar a página
  }, [id]);

  const fetchDadosUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/2.0/touccan/usuario/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Dados retornados da API:', data);
        if (data && data.usuario) {
          setDadosUsuario(data.usuario);
        }
      }
    } catch (error) {
      console.error('Erro na requisição da API:', error);
    }
  };

  const fetchFeedbacks = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/2.0/touccan/feedback/usuario/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Feedbacks retornados da API:', data);
        if (data.avaliacoes && Array.isArray(data.avaliacoes)) {
          setFeedbacks(data.avaliacoes);
          console.log('Feedbacks atualizados no estado:', data.avaliacoes);
        } else {
          console.log("Nenhuma avaliação encontrada ou formato incorreto:", data);
          setFeedbacks([]);
        }
      } else {
        console.error('Erro ao buscar feedbacks:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar feedbacks:', error);
      setFeedbacks([]);
    }
  };




  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  return (
    <div className="tela-perfil-user">
      <Sidebar />
      <div className="infos-perfil-user">
        {/* Foto de perfil */}
        <div className="pfp-perfil-usuario">
          {dadosUsuario ? (
            dadosUsuario.foto ? (
              <img src={dadosUsuario.foto} alt="Foto do Usuário" />
            ) : (
              <img src="../img/semFtoo.png" alt="Sem Foto de Perfil" />
            )
          ) : 'Carregando...'}
        </div>

        {/* Nome e e-mail */}
        <span className="nome-perfil-usuario">
          {dadosUsuario ? `${dadosUsuario.nome}, ${calcularIdade(dadosUsuario.dataNascimento)}` : 'Carregando...'}
        </span>
        <span className="email-perfil-usuario">
          {dadosUsuario ? dadosUsuario.email : 'Carregando...'}
        </span>

        {/* Abas "Sobre mim" e "Feedback" */}
        <div className="tabs">
          <button
            className={`tab-button ${mudarTab === 'sobre' ? 'active' : ''}`}
            onClick={() => setMudarTab('sobre')}
          >
            Sobre mim
          </button>
          <button
            className={`tab-button ${mudarTab === 'feedback' ? 'active' : ''}`}
            onClick={() => setMudarTab('feedback')}
          >
            Feedback
          </button>
        </div>

        {/* Conteúdo da aba "Sobre mim" */}
        {mudarTab === 'sobre' && (
          <div className="inputs-perfil-user">
            <div>
              <label>Formação:</label>
              <input
                type="text"
                disabled
                value={dadosUsuario?.formacao || ''}
              />
            </div>

            <div>
              <label>Biografia:</label>
              <input
                type="text"
                disabled
                value={dadosUsuario?.biografia || ''}
              />
            </div>

            <div>
              <label>Habilidades:</label>
              <input
                type="text"
                disabled
                value={dadosUsuario?.habilidades || ''}
              />
            </div>

            <div>
              <label>Disponibilidade:</label>
              <input
                type="text"
                disabled
                value={dadosUsuario?.disponibilidade || ''}
              />
            </div>
          </div>
        )}

        {/*Não sei pq n esta aparecendo no front */}
        {mudarTab === 'feedback' && (
          <div className="tab-content" id="feedback-perfil-usuario">
            <div className="feedbacks-list-user">
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback, index) => (
                  <div className="feedback-card-user" key={index}>
                    <p><strong>Avaliação:</strong> {feedback.avaliacao || 'Nenhuma avaliação registrada'}</p>
                    <p><strong>Nota:</strong> {feedback.nota || 'N/A'}</p>
                    <p><strong>ID Bico:</strong> {feedback.id_bico || 'N/A'}</p>
                  </div>
                ))
              ) : (
                <p>🔍 Nenhum feedback encontrado. Verifique se há avaliações feitas por clientes.</p>
              )}
            </div>
          </div>
        )}






      </div>
    </div>
  );
};

export default PerfilUsuario;
