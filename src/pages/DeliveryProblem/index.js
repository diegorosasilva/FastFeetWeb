import React, { Component } from 'react';
import { MdMoreHoriz, MdAdd, MdSearch } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import api from '../../services/api';

import Actions from '../../components/Actions';

import { Container, DeliveryTable } from './styles';


export default class DeliveryProblem extends Component {
  state = {
    deliveryproblems: [],
  };

  async componentDidMount() {
    const response = await api.get('deliveryproblems');

    this.setState({ deliveryproblems: response.data});
  }

  render(){
    const { deliveryproblems } = this.state;

    return (
      <Container>
        <header>
          <strong>Problemas na entrega</strong>
        </header>

        <DeliveryTable>
            <tr>
              <th>Encomenda</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          {deliveryproblems.map(deliveryproblem => (
            <tr>
            <td>
              <span>#{deliveryproblem.delivery_id}</span>
            </td>
            <td>
              <span>{deliveryproblem.description}</span>
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
