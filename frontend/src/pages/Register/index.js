import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logopng from '../../assets/logo.png';

export default function Register() {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      whatsapp,
      city,
      uf
    };

    try {
      const response = await api.post('store', data)

      alert(`Seu ID de acesso: ${response.data.id}`)

      history.push('/');

    } catch (err) {
      alert('Erro no cadastro. Tente novamente!')
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logopng} alt="HORTIFRUTI" />

          <h1> Cadastro </h1>
          <p> Faça seu cadastro e seja bem vindo à nossa HORTIFRUTI! Cadastre os seus produtos! </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#f67828" />
            Voltar
          </Link>
        </section>

        <form onSubmit={handleRegister}>{/* chamada da função de registro */}
          <input placeholder="Nome do Horti-Fruti"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input type="whatsapp" placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
           
            <input placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />

            <input placeholder="UF" style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />

          </div>

          <button className="button" type="submit"> Cadastrar </button>

        </form>
      </div>
    </div>
  )
}
