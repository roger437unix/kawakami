import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../components/Sidebar.jsx';
import Swal from 'sweetalert2'; // Importando o SweetAlert2
import './App.css';

const AddBico = () => {
    const baseUrl = 'http://localhost:8080/2.0/touccan';
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        horario_inicio: '',
        data_inicio: '',
        horario_limite: '',
        data_limite: '',
        salario: '',
        id_dificuldade: '',
        id_categoria: ''
    });

    const [erros, setErros] = useState({});
    const [idCliente, setIdCliente] = useState(null);

    const getCategorias = async () => {
        const response = await fetch(`${baseUrl}/categoria`);
        const data = await response.json();
        return data.categorias;
    };

    const preencherSelectCategoria = async () => {
        let categorias = await getCategorias();
        const categoriaSelect = document.getElementById('categoria-select');
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.id;
            option.textContent = categoria.categoria;
            categoriaSelect.appendChild(option);
        });
    };

    useEffect(() => {
        const id = localStorage.getItem("id_cliente");
        console.log('ID recuperado:', id);

        if (id) {
            setIdCliente(id);
        } else {
            console.error('ID do cliente não encontrado no localStorage');
        }

        preencherSelectCategoria();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const parsedValue = (name === 'id_dificuldade' || name === 'id_categoria') ? parseInt(value, 10) : value;

        setFormData(prevData => ({
            ...prevData,
            [name]: parsedValue
        }));
    };

    const validateForm = () => {
        const novosErros = {};
        if (!formData.titulo) novosErros.titulo = "Título é obrigatório.";
        if (!formData.descricao) novosErros.descricao = "Descrição é obrigatória.";
        if (!formData.horario_inicio) novosErros.horario_inicio = "Horário de início é obrigatório.";
        if (!formData.data_inicio) novosErros.data_inicio = "Data de início é obrigatória.";
        if (!formData.horario_limite) novosErros.horario_limite = "Horário limite é obrigatório.";
        if (!formData.data_limite) novosErros.data_limite = "Data limite é obrigatória.";
        if (!formData.salario) novosErros.salario = "Salário é obrigatório.";
        if (!formData.id_dificuldade) novosErros.id_dificuldade = "Nível de dificuldade é obrigatório.";
        if (!formData.id_categoria) novosErros.id_categoria = "Categoria é obrigatória.";

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!idCliente) {
            console.error("ID do cliente não encontrado para o envio");
            return;
        }
    

        
        const salarioValue = parseFloat(formData.salario);
        if (isNaN(salarioValue)) {
            Swal.fire({
                title: 'Erro',
                text: 'Por favor, insira um valor de salário válido.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }
    
        const salarioComDesconto = salarioValue * 0.9;
    
        const confirmacao = await Swal.fire({
            title: 'Confirmar anúncio',
            text: `O salário informado é R$ ${salarioValue.toFixed(2)}. Após aplicar a taxa de serviço de 10%, o salário final será R$ ${salarioComDesconto.toFixed(2)}. Deseja criar o anúncio com esse salário?`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sim, criar anúncio',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        });
    
        if (confirmacao.isConfirmed) {
            if (validateForm()) {
                const dadosLimpos = {
                    ...formData,
                    id_cliente: parseInt(idCliente, 10),
                    salario: salarioComDesconto // Envia o salário **com o desconto de 10%** AAAA FUNCIONA
                };
    
                try {
                    console.log(dadosLimpos);
                    const response = await fetch(`${baseUrl}/bicos`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dadosLimpos),
                    });
                    if (response.ok) {
                        const result = await response.json();
                        console.log('Anúncio criado com sucesso:', result);
                        navigate('/home');
                    } else {
                        console.error('Erro ao criar anúncio');
                    }
                } catch (error) {
                    console.error('Erro de rede:', error);
                }
            }
        } else {
            
            console.log("Usuário cancelou a criação do anúncio.");
        }
    };
    

    const today = new Date().toISOString().split('T')[0];

    return (
        <div>
            <Sidebar />
            <div className='addBico-container'>
                <div className='bico-app-container'>
                    <h1>Criar Anúncio</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="bico-input-container">
                            <label>Titulo</label>
                            <input type='text' name='titulo' value={formData.titulo} onChange={handleInputChange} />
                            {erros.titulo && <span className="error">{erros.titulo}</span>}
                        </div>

                        <div className="bico-input-container">
                            <label>Descrição</label>
                            <textarea name="descricao" value={formData.descricao} onChange={handleInputChange}></textarea>
                            {erros.descricao && <span className="error">{erros.descricao}</span>}
                        </div>

                        <div className="bico-input-container">
                            <label>Horário início - Espediente</label>
                            <input type='time' name='horario_inicio' value={formData.horario_inicio} onChange={handleInputChange} />
                            {erros.horario_inicio && <span className="error">{erros.horario_inicio}</span>}
                        </div>

                        <div className="bico-input-container">
                            <label>Data início</label>
                            <input type='date' name='data_inicio' min={today} value={formData.data_inicio} onChange={handleInputChange} />
                            {erros.data_inicio && <span className="error">{erros.data_inicio}</span>}
                        </div>

                        <div className="bico-input-container">
                            <label>Horário Final - Espediente</label>
                            <input type='time' name='horario_limite' value={formData.horario_limite} onChange={handleInputChange} />
                            {erros.horario_limite && <span className="error">{erros.horario_limite}</span>}
                        </div>

                        <div className="bico-input-container">
                            <label>Data Limite</label>
                            <input type='date' name='data_limite' min={today} value={formData.data_limite} onChange={handleInputChange} />
                            {erros.data_limite && <span className="error">{erros.data_limite}</span>}
                        </div>

                        <div className="bico-input-container">
                            <label>Salário - Considere os 10% da taxa de serviço </label>
                            <input
                                type='number'
                                name='salario'
                                value={formData.salario}
                                onChange={handleInputChange}
                                placeholder="Digite o valor"
                            />
                            {erros.salario && <span className="error">{erros.salario}</span>}
                        </div>

                        <div className="bico-input-container">
                            <label>Nível de dificuldade</label>
                            <select name='id_dificuldade' value={formData.id_dificuldade} onChange={handleInputChange}>
                                <option value="">Selecione um nível</option>
                                <option value="1">Baixa</option>
                                <option value="2">Média</option>
                                <option value="3">Alta</option>
                            </select>
                            {erros.id_dificuldade && <span className="error">{erros.id_dificuldade}</span>}
                        </div>

                        <div className="bico-input-container">
                            <label>Categoria</label>
                            <select name='id_categoria' id='categoria-select' onChange={handleInputChange}>
                                <option value="">Selecione uma categoria</option>
                            </select>
                            {erros.id_categoria && <span className="error">{erros.id_categoria}</span>}
                        </div>

                        <button className='button-criar-addBico' type='submit'>CRIAR</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddBico;
