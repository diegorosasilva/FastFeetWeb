import React, { Component } from 'react';
import { MdAdd } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import Actions from '../../components/Actions';

import { Container, DeliveryTable } from './styles';


export default class Deliveryman extends Component {
  state = {
    deliverymans: [],
  };

  async componentDidMount() {
    const response = await api.get('deliverymans');

    this.setState({ deliverymans: response.data});
  }

  render(){
    const { deliverymans } = this.state;

    return (
      <Container>
        <header>
          <strong>Gerenciando entregadores</strong>
        </header>
        <div>
          <div>
            <Input name="busca" type="text" placeholder="Buscar por entregadores" />
          </div>
          <Link to ="/deliverymanform">
            <div>
              <MdAdd size={16} color="#FFF" />
            </div>
            <span>CADASTRAR</span>
          </Link>
        </div>

        <DeliveryTable>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          {deliverymans.map(deliveryman => (
            <tr>
            <td>
              <span>#{deliveryman.id}</span>
            </td>
            <td>
              <span>{deliveryman.avatar_id}</span>
            </td>
            <td>
              <span>{deliveryman.name}</span>
            </td>
            <td>
              <span>{deliveryman.email}</span>
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
}
