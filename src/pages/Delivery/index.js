import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import Actions from '../../components/Actions';

import { Container, DeliveryTable } from './styles';


function Delivery() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries');

      setDeliveries(response.data);
    }
    loadDeliveries();
  }, []);


  return (
      <Container>
      <header>
        <strong>Gerenciando encomendas</strong>
      </header>
      <div>
        <div>
          <Input name="busca" type="text" placeholder="Buscar por encomendas" />
        </div>
        <Link to ="/deliveryform">
          <div>
            <MdAdd size={16} color="#FFF" />
          </div>
          <span>CADASTRAR</span>
        </Link>
      </div>

      <DeliveryTable>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
          {deliveries.map(delivery => (
            <tr key ={delivery.id}>
            <td>
              <span>#{delivery.id}</span>
            </td>
            <td>
              <span>{delivery.recipient.name}</span>
            </td>
            <td>
              <span>{delivery.deliveryman.name}</span>
            </td>
            <td>
              <span>{delivery.recipient.city}</span>
            </td>
            <td>
              <span>{delivery.recipient.state}</span>
            </td>
            <td>
              <span>{delivery.canceled_at ? "CANCELADO" : "Outro"}</span>
            </td>
            <td>
              <Actions />
            </td>
          </tr>
          ))}
      </DeliveryTable>
    </Container>
 );
}

export default Delivery;
