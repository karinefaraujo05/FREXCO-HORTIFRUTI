import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import logopng from '../../assets/logo.png';

export default function Profile() {

  const [products, setProducts] = useState([]);

  const storeId = localStorage.getItem('storeId');
  const storeName = localStorage.getItem('storeName');

  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: storeId,
      }
    }).then(response => {
      setProducts(response.data);
    })

  }, [storeId]);

  async function handleDeleteproduct(id) {
    try {
      await api.delete(`products/${id}`, {
        headers: {
          Authorization: storeId
        }
      });

      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      alert('Erro ao deletar este produto, tente novamente!');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return ( 
    <div className="profile-container">
      <header>
        <img src={logopng} alt="FREXCO - HORTIFRUTI" />
        <span> Bem Vinda, {storeName} </span>

        <Link className="button" to='/products/new'> Cadastrar novo produto </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color='#f99988' />
        </button>
      </header>

      <h1> FRUTOS CADASTRADOS</h1>
      <ul>
        {products.map(product => (


          <li key={product.id}>
            <p className= "title"> FRUTAS DISPONÍVEIS PARA COMPRA </p>
            
            <p> PRODUTO: < label> {product.name} </ label>  </p> 
           
            <p> DATA DE RETIRADA: < label> {product.date} </ label> </p>
           
            <p> SAFRA: < label> {product.crop} </ label> </p>
           
            <p> VALIDADE: < label> {product.validity} </ label> </p>

            <p> QUANTIDADE DISPONÍVEL: < label> {product.quantity} </ label> </p>
            
            <p> VALOR: < label> {Intl.NumberFormat('pr-BR', { style: 'currency', currency: 'BRL' }).format(product.value)} </ label> </p>
            
            <button onClick={() => handleDeleteproduct(product.id)} type="button">
              <FiTrash2 size={18} color="#a8a8b3" />
            </button>

          </li>

        ))}

      </ul>
    </div>
  )
}