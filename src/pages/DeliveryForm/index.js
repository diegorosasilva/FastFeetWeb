import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Input, Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import Select from './SelectInput';

import api from '../../services/api';

import { Container, Button } from './styles';


function DeliveryForm({ match, history }) {
  const [delivery, setDelivery] = useState(null);

  const [productField, setProductField] = useState('');
  const [recipientField, setRecipientField] = useState({});
  const [deliverymanField, setDeliverymanField] = useState({});

  const { id } = match.params;
  const formType = id ? 'edit' : 'new';

  useEffect(() => {
    async function loadDelivery() {
      const response = await api.get(`/deliveries/${id}`);

      const { product, recipient, deliveryman } = response.data;
      setRecipientField({ value: recipient.id, label: recipient.name });
      setDeliverymanField({ value: deliveryman.id, label: deliveryman.name });
      setProductField(product);
    }

    loadDelivery();
  }, [id]);

  async function createDelivery(data) {
    try {
      await api.post('/deliveries', data);
      toast.success('A entrega foi criada com sucesso');
      history.push('/deliveries');
    } catch (err) {
      toast.error('Não foi possível criar a entrega');
    }
  }

  async function editDelivery(data) {
    try {
      await api.put(`/deliveries/${id}`, data);
      toast.success('A entrega foi editada com sucesso');
      history.push('/deliveries');
    } catch (err) {
      toast.error('Não foi possível editar a entrega');
    }
  }

  function handleSubmit(e, data){

    switch (formType) {
      case 'new':
        createDelivery(data);
        break;
      case 'edit':
        editDelivery(data);
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <div>
        <header>
          <strong>Cadastro de encomendas</strong>
        </header>
        <div>
        <Button
            type="button"
            cancel
            onClick={() => history.push('/deliveries')}
          >
            <MdChevronLeft size={25} color="#FFF" />
            <span>VOLTAR</span>
          </Button>

          <Button type="submit" form="deliveryform">
            <MdCheck size={20} color="#FFF" />
            <span>SALVAR</span>
          </Button>
        </div>
      </div>

      <Form
        id="deliveryform"
        initialData={delivery}
        onSubmit={e => handleSubmit(e, {
          product: productField,
          recipient_id: recipientField.value,
          deliveryman_id: deliverymanField.value,
        })}
        >
        <div className="line">
          <div className="group">
            <span>Destinatário</span>
            <Select
              apiPath="recipients"
              value={recipientField}
              onChange={setRecipientField}
            />
          </div>
          <div className="group">
            <span>Entregador</span>
            <Select
              apiPath="deliverymans"
              value={deliverymanField}
              onChange={setDeliverymanField}
            />
          </div>
        </div>
        <div className="line">
          <div className="group">
            <span>Nome do produto</span>
            <Input
              name="product"
              value={productField}
              onChange={e => setProductField(e.target.value)}
            />
          </div>
        </div>
      </Form>
    </Container>
 );
}

export default DeliveryForm;
