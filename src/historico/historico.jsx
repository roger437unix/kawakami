import React, { useState, useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';

const baseUrl = 'http://localhost:8080/2.0/touccan/';

function Historico() {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("id_cliente");
    if (id) fetchData(id);
    else console.error('ID do cliente não encontrado no localStorage');
  }, []);

  const fetchData = async (id) => {
    try {
      const response = await fetch(`${baseUrl}bico/candidato/${id}`, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Resposta da API:', response); 
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Dados recebidos:', data); 

      
      console.log('Estrutura dos dados:', JSON.stringify(data, null, 2));

      
      if (data.bicos && Array.isArray(data.bicos)) {
        
        console.log('Bicos antes do filtro:', data.bicos);

        const bicosAtivos = data.bicos.filter(bico => {
          console.log('Verificando bico:', bico); 
          return bico.finalizado === 0;  
        });

        console.log('Bicos ativos:', bicosAtivos); 
        setAnuncios(bicosAtivos || []);
      } else {
        console.error('A chave "bicos" não foi encontrada ou não é um array válido');
      }

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="histórico-container">
      <Sidebar />
      <h1 className="histórico-title">Histórico</h1>

      
      {loading ? (
        <p className="histórico-loading">Carregando...</p>
      ) : (
        
        anuncios.length === 0 ? (
          <p>Nenhum bico ativo encontrado.</p>
        ) : (
          anuncios.map((anuncio, index) => (
            <div key={index} className="histórico-card">
              <div className="histórico-decorative-line"></div>
              <div className="histórico-card-content">
                <div className="histórico-card-header">
                  <h2>{anuncio.bico}</h2>
                  <div className="histórico-card-footer">
                    <button className="histórico-finalize-button">Finalizar</button>
                    <p className="histórico-date">Horário de início: {new Date(anuncio.horario_inicio).toLocaleString()}</p>
                    <p className="histórico-date">Horário limite: {new Date(anuncio.horario_limite).toLocaleString()}</p>
                  </div>
                </div>
                <p className="histórico-client-name">{anuncio.nome_cliente}</p>
                <p className="histórico-user-name">Usuário: {anuncio.nome_usuario || 'Indefinido'}</p>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
}

export default Historico;
