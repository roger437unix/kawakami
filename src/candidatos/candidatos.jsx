import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importar o Link do React Router
import Sidebar from '../components/Sidebar.jsx';
import './App.css';

const Candidatos = () => {
    const [candidatos, setCandidatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [candidatosAceitos, setCandidatosAceitos] = useState(new Set());

    useEffect(() => {
        const id_bico = localStorage.getItem("id_bico");
        if (id_bico) {
            fetchCandidatos(id_bico);
        } else {
            console.error('ID do bico não encontrado no localStorage');
        }
    }, []);

    const fetchCandidatos = async (id_bico) => {
        console.log(`Buscando candidatos para o bico com ID: ${id_bico}`);
        
        try {
            const url = `http://localhost:8080/2.0/touccan/candidato/${id_bico}`;
            console.log(`URL para buscar candidatos: ${url}`);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                console.error(`Erro ao buscar candidatos. Status: ${response.status}`);
                throw new Error('Erro ao buscar candidatos');
            }
    
            const data = await response.json();
            console.log("Dados recebidos da API:", data);
    
            if (Array.isArray(data.candidatos)) {
                console.log("Candidatos:", data.candidatos);
                setCandidatos(data.candidatos);
                const aceitos = new Set(data.candidatos.filter(candidato => candidato.escolhido).map(candidato => candidato.id_candidato));
                setCandidatosAceitos(aceitos);
            } else {
                console.error("A estrutura de dados não contém candidatos.");
            }
        } catch (error) {
            console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    };

    const aceitarCandidato = async (id_candidato, id_bico) => {
        if (!id_candidato || !id_bico) {
            console.error(`Tentativa de aceitar candidato com dados inválidos: id_candidato=${id_candidato}, id_bico=${id_bico}`);
            return;
        }
    
        const requestBody = { id_user: id_candidato, id_bico, escolhido: true };
        console.log("Requisição PUT:", requestBody);
    
        try {
            const response = await fetch('http://localhost:8080/2.0/touccan/candidato', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao aceitar candidato: ${errorText}`);
            }
    
            setCandidatos(prev =>
                prev.map(candidato =>
                    candidato.id_candidato === id_candidato ? { ...candidato, escolhido: true } : candidato
                )
            );
    
            setCandidatosAceitos(prev => new Set(prev).add(id_candidato));
    
            console.log(`Candidato aceito: ${id_candidato}`);
        } catch (error) {
            console.error("Erro ao aceitar candidato:", error);
        }
    };
    
    const negarCandidato = async (id_candidato, id_bico) => {
        if (!id_candidato || !id_bico) {
            console.error(`Tentativa de negar candidato com dados inválidos: id_candidato=${id_candidato}, id_bico=${id_bico}`);
            return;
        }
    
        console.log(`Tentando negar candidato: id_candidato=${id_candidato}, id_bico=${id_bico}`);
    
        const requestBody = { id_user: id_candidato, id_bico: id_bico };
    
        try {
            const response = await fetch('http://localhost:8080/2.0/touccan/candidato', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao negar candidato: ${errorText}`);
            }
    
            setCandidatos(prev => prev.filter(candidato => candidato.id_candidato !== id_candidato));
    
            setCandidatosAceitos(prev => {
                const newSet = new Set(prev);
                newSet.delete(id_candidato);
                return newSet;
            });
    
            console.log(`Candidato negado: ${id_candidato}`);
        } catch (error) {
            console.error("Erro ao negar candidato:", error);
        }
    };
    
    return (
        <div className="container">
            <Sidebar />
            <div className="content">
                <div className="title">Candidatos</div>
                <div className="title-line"></div>

                {loading ? (
                    <p>Carregando candidatos...</p>
                ) : (
                    candidatos.length > 0 ? (
                        candidatos.map((candidato, index) => (
                            <div className="candidate-box" key={`${candidato.id_candidato}-${candidato.id_bico}-${index}`}>
                                <img src={candidato.foto || 'default-image-url.jpg'} alt="Foto de Perfil" />
                                
                                {/* Nome do candidato agora é um Link */}
                                <Link to={`/perfilUsuario/${candidato.id_candidato}`} className="candidate-name">
                                    {candidato.candidato || 'Candidato Indefinido'}
                                </Link>

                                {candidato.escolhido ? (
                                    <div style={{ color: 'green' }}>Contratado</div>
                                ) : (
                                    <>
                                        <button className="button button-aceitar" onClick={() => {
                                            console.log(`Aceitando candidato: ${candidato.candidato} com ID: ${candidato.id_candidato}`);
                                            aceitarCandidato(candidato.id_candidato, candidato.id_bico);
                                        }}>
                                            <span className="icon">✔️</span>
                                        </button>
                                        <button className="button button-negar" onClick={() => negarCandidato(candidato.id_candidato, candidato.id_bico)}>
                                            <span className="icon">❌</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>Não há candidatos disponíveis.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Candidatos;
