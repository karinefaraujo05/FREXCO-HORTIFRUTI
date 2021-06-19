
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logopng from '../../assets/logo.png';

export default function NewProduct() { //criando componente de cadastro
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [crop, setCrop] = useState('');
  const [validity, setValidity] = useState('');
  const [quantity, setQuantity] = useState('');
  const [value, setValue] = useState('');
  

  const history = useHistory();
  const storeId = localStorage.getItem('storeId');

  async function handleNewProduct(e) {
    e.preventDefault();

    const data = {
      name,
        date,
          crop,
            validity,
              quantity,
                  value
    };

    try { //cadastro do Productro na aplicação 

      await api.post('products', data, {
        headers: {
          Authorization: storeId,
        }
      })
      history.push('/profile')
    } catch (err) {
      alert('Erro no cadastro do produto! Tente Novamente!');
    }
  }

  return (
    <div className="new-product-container">
      <div className="content">
        <section> {/* chamada da função de cadastro */}
          <img src={logopng} alt="FREXCO - HORTIFRUTI" />

          <h1> Cadastro de Produto </h1>
          <p> Cadastre o seu produto para que o seu cliente saiba tudo sobre ele! </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#f67828" />
            Voltar para Home
          </Link>
        </section>

        <form onSubmit={handleNewProduct}>
          
        <input
            type="name"
            placeholder="Produto"
            onChange={e => setName(e.target.value)}
          />

          <input
            type="date"
             onChange={e => setDate(e.target.value)}
          />

          <input
            type="crop"
            placeholder="Safra"
            onChange={e => setCrop(e.target.value)}
          />

          <input
            type="validity"
            placeholder="VALIDADE"
            onChange={e => setValidity(e.target.value)}
          />

          <input
            type="quantity"
            placeholder="Quantidade disponível:"
            onChange={e => setQuantity(e.target.value)}
          />

          <textarea
            type="value"
            placeholder="Valor:"
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit"> Cadastrar </button>

        </form>
      </div>
    </div>


  );
}