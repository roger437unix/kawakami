import React, { useState } from 'react';
import './App.css';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Importando o SweetAlert2

function Cadastro() {
  const [formData, setFormData] = useState({
    nome_responsavel: '',
    email: '',
    telefone: '',
    cpf_responsavel: '',
    data_nascimento: '',
    cep: '',
    senha: '',
    confirmar_senha: '',
    nome_fantasia: '',
    razao_social: '',
    cnpj: ''
  });

  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    switch (name) {
      case 'telefone':
        formattedValue = formatTelefone(value);
        break;
      case 'cpf_responsavel':
        formattedValue = formatCPF(value);
        break;
      case 'cep':
        formattedValue = formatCEP(value);
        break;
      case 'cnpj':
        formattedValue = formatCNPJ(value);
        break;
      default:
        break;
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const togglePasswordVisibility = (campo) => {
    if (campo === 'senha') {
      setSenhaVisivel(!senhaVisivel);
    } else if (campo === 'confirmar_senha') {
      setConfirmarSenhaVisivel(!confirmarSenhaVisivel);
    }
  };

  const formatTelefone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2')
      .slice(0, 15);
  };

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{2})$/, '-$1')
      .slice(0, 14);
  };

  const formatCNPJ = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{2})$/, '-$1')
      .slice(0, 18);
  };

  const formatCEP = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
  };

  const removeSpecialCharacters = (value) => {
    return value.replace(/\D/g, '');
  };

  const validateForm = () => {
    const novosErros = {};

    if (!formData.nome_responsavel.trim()) {
      novosErros.nome_responsavel = "O nome é obrigatório";
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      novosErros.email = "E-mail inválido";
    }

    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!telefoneRegex.test(formData.telefone)) {
      novosErros.telefone = "Telefone inválido";
    }

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(formData.cpf_responsavel)) {
      novosErros.cpf_responsavel = "CPF inválido";
    }

    const dataNascimento = new Date(formData.data_nascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }
    if (idade < 18) {
      novosErros.data_nascimento = "Você deve ter pelo menos 18 anos";
    }

    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(formData.cep)) {
      novosErros.cep = "CEP inválido";
    }

    const senhaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaRegex.test(formData.senha)) {
      novosErros.senha = "A senha deve ter no mínimo 8 caracteres, incluindo números, letra maiúscula e um caractere especial";
    }

    if (formData.senha !== formData.confirmar_senha) {
      novosErros.confirmar_senha = "As senhas não coincidem";
    }

    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    if (!cnpjRegex.test(formData.cnpj)) {
      novosErros.cnpj = "CNPJ inválido";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const dadosLimpos = {
        ...formData,
        telefone: removeSpecialCharacters(formData.telefone),
        cpf_responsavel: removeSpecialCharacters(formData.cpf_responsavel),
        cnpj: removeSpecialCharacters(formData.cnpj),
        cep: removeSpecialCharacters(formData.cep),
        data_nascimento: formData.data_nascimento,
        senha: formData.senha,
        confirmar_senha: undefined
      };

      fetch('http://localhost:8080/2.0/touccan/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosLimpos)
      })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              throw new Error(`Erro: ${response.status} - ${text}`);
            });
          }
          return response.json();
        })
        .then(data => {
          Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado com sucesso!',
            text: 'Agora você pode fazer login e aproveitar os recursos.',
            confirmButtonText: 'Ok'
          });
          navigate('/');
        })
        .catch((error) => {
          console.error("Erro:", error);
          Swal.fire({
            icon: 'error',
            title: 'Erro ao cadastrar',
            text: error.message,
            confirmButtonText: 'Tentar novamente'
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <div>
      <div className='container'>
        <div className="decoracaoLaranja"></div>
        <div className="decoracaoCinza"></div>
        <div className="decoracaoCinza2"></div>
        <div className="logoPrincipal">
          <img src='../img/logoPrincipal.svg' alt="" />
        </div>
      </div>

      <div className="app-container">

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, marginRight: '230px' }}>
              <div>
                <img src="./img/usuario.png" alt="Usuário" width={18} />
                <input type="text" name="nome_responsavel" value={formData.nome_responsavel} onChange={handleInputChange} placeholder="Nome" />
                {erros.nome_responsavel && <p style={{ color: 'red' }}>{erros.nome_responsavel}</p>}
              </div>

              <div>
                <img src="../img/cpf.png" alt="CPF" width={18} />
                <input type="text" name="cpf_responsavel" value={formData.cpf_responsavel} onChange={handleInputChange} placeholder="CPF" maxLength={14} />
                {erros.cpf_responsavel && <p style={{ color: 'red' }}>{erros.cpf_responsavel}</p>}
              </div>

              <div>
                <img src="./img/calendario.png" alt="Data" width={18} />
                <input type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleInputChange} placeholder="Data de Nascimento" />
                {erros.data_nascimento && <p style={{ color: 'red' }}>{erros.data_nascimento}</p>}
              </div>

              <div>
                <img src="./img/estabelecimento.png" alt="Usuário" width={18} />
                <input type="text" name="nome_fantasia" value={formData.nome_fantasia} onChange={handleInputChange} placeholder="Nome Estabelecimento" />
                {erros.nome_fantasia && <p style={{ color: 'red' }}>{erros.nome_fantasia}</p>}
              </div>

              <div>
                <img src="./img/razao.png" alt="Usuário" width={18} />
                <input type="text" name="razao_social" value={formData.razao_social} onChange={handleInputChange} placeholder="Razão Social" />
                {erros.razao_social && <p style={{ color: 'red' }}>{erros.razao_social}</p>}
              </div>

              <div>
                <img src="../img/cnpj.png" alt="CNPJ" width={18} />
                <input type="text" name="cnpj" value={formData.cnpj} onChange={handleInputChange} placeholder="CNPJ" maxLength={18} />
                {erros.cnpj && <p style={{ color: 'red' }}>{erros.cnpj}</p>}
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div>
                <img src="./img/cep.png" alt="CEP" width={18} />
                <input type="text" name="cep" value={formData.cep} onChange={handleInputChange} placeholder="CEP" maxLength={9} />
                {erros.cep && <p style={{ color: 'red' }}>{erros.cep}</p>}
              </div>

              <div>
                <img src="./img/email.png" alt="Email" width={18} />
                <input type="text" name="email" value={formData.email} onChange={handleInputChange} placeholder="E-mail" />
                {erros.email && <p style={{ color: 'red' }}>{erros.email}</p>}
              </div>

              <div>
                <img src="./img/telefone.png" alt="Telefone" width={18} />
                <input type="text" name="telefone" value={formData.telefone} onChange={handleInputChange} placeholder="Telefone" maxLength={15} />
                {erros.telefone && <p style={{ color: 'red' }}>{erros.telefone}</p>}
              </div>

              <div>
                <img src="./img/senha.png" alt="Senha" width={18} />
                <input
                  type={senhaVisivel ? 'text' : 'password'}
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  placeholder="Senha"
                />
                <img
                  src="../img/olho.png"
                  alt="Mostrar Senha"
                  style={{ cursor: 'pointer' }}
                  onClick={() => togglePasswordVisibility('senha')}
                />
                {erros.senha && <p style={{ color: 'red' }}>{erros.senha}</p>}
              </div>

              <div>
                <img src="./img/senha.png" alt="Confirmar Senha" width={18} />
                <input
                  type={confirmarSenhaVisivel ? 'text' : 'password'}
                  name="confirmar_senha"
                  value={formData.confirmar_senha}
                  onChange={handleInputChange}
                  placeholder="Confirmar Senha"
                />
                <img
                  src="../img/olho.png"
                  alt="Mostrar Senha"
                  style={{ cursor: 'pointer' }}
                  onClick={() => togglePasswordVisibility('confirmar_senha')}
                />
                {erros.confirmar_senha && <p style={{ color: 'red' }}>{erros.confirmar_senha}</p>}
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p>
          <Link to="/" style={{ color: '#E25401' }}>
            Já possui conta? <br />
            Faça seu Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
