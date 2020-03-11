import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Input, Form, Select } from '@rocketseat/unform';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import { Container } from './styles';


function DeliveryForm() {
  const [recipients, setRecipients] = useState([]);
  const [deliverymans, setDeliverymans] = useState([]);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients');

      setRecipients(response.data);
    }
    loadRecipients();
  }, []);

  useEffect(() => {
    async function loadDeliverymans() {
      const response = await api.get('deliverymans');

      setDeliverymans(response.data);
    }
    loadDeliverymans();
  }, []);

  function handleSubmit(data){

  }

  return (
      <Container>
      <div>
        <header>
          <strong>Cadastro de encomendas</strong>
        </header>
        <div>
          <Link to ="/deliveries">
            <div>
              <MdChevronLeft size={16} color="#FFF" />
            </div>
            <span>VOLTAR</span>
          </Link>
          <Link onClick ={handleSubmit}>
            <div>
              <MdCheck size={16} color="#FFF" />
            </div>
            <span>SALVAR</span>
          </Link>
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <div>
          <label>Destinatário</label>
          <select name="recipient">
            {recipients.map(recipient => (
              <option key={recipient.id} value={recipient.name}>{recipient.name}</option>
            ))}
          </select>
          <label>Entregador</label>
          <select name="deliveryman">
            {deliverymans.map(deliveryman => (
              <option key={deliveryman.id} value={deliveryman.name}>{deliveryman.name}</option>
            ))}
          </select>
        </div>
        <Input name="product" placeholder="Nome do Produto"/>
      </Form>

    </Container>
 );
}

export default DeliveryForm;
