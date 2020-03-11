import React, { Component } from 'react';
import { MdMoreHoriz, MdAdd, MdSearch } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import Actions from '../../components/Actions';

import { Container, DeliveryTable } from './styles';


export default class Recipient extends Component {
  state = {
    recipients: [],
  };

  async componentDidMount() {
    const response = await api.get('recipients');

    this.setState({ recipients: response.data});
  }

  render(){
    const { recipients } = this.state;

    return (
      <Container>
        <header>
        <strong>Gerenciando destinatários</strong>
        </header>
        <div>
          <div>
            <Input name="busca" type="text" placeholder="Buscar por destinatários" />
          </div>
          <Link to ="/recipientform">
            <div>
              <MdAdd size={16} color="#FFF" />
            </div>
            <span>CADASTRAR</span>
          </Link>
        </div>

        <DeliveryTable>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
            {recipients.map(recipient => (
            <tr>
            <td>
              <span>#{recipient.id}</span>
            </td>
            <td>
              <span>{recipient.name}</span>
            </td>
            <td>
              <span>{recipient.address}, {recipient.number}, {recipient.city} - {recipient.state}</span>
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
