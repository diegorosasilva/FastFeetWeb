import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '../../services/api';

import AvatarInput from './AvatarInput'

import { Container, Button, FieldContainer } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().email().required('O email é obrigatório'),
  avatar_id: Yup.number('Deve ser um número').required('O avatar é obrigatório'),
});

export default function DeliverymanForm({ match, history }) {
  const [deliveryman, setDeliveryman] = useState(null);

  const { id } = match.params;
  const formType = id ? 'edit' : 'new';

  useEffect(() => {
    async function loadDeliveryman() {
      const response = await api.get(`/deliverymans/${id}`);

      setDeliveryman(response.data);
    }

    loadDeliveryman();
  }, [id]);

  async function createDeliveryman(data) {
    try {
      await api.post('/deliverymans', data);
      toast.success('O entregador foi criado com sucesso');
      history.push('/deliverymans');
    } catch (err) {
      toast.error('Não foi possível criar o entregador');
    }
  }

  async function editDeliveryman(data) {
    try {
      await api.put(`/deliverymans/${id}`, data);
      toast.success('O entregador foi editado com sucesso');
      history.push('/deliverymans');
    } catch (err) {
      toast.error('Não foi possível editar o entregador');
    }
  }

  function handleSubmit(data){
    console.tron.log(data);
    switch (formType) {
      case 'new':
        createDeliveryman(data);
        break;
      case 'edit':
        editDeliveryman(data);
        break;
      default:
        break;
    }
  }

  return (
    <Container>
        <div>
          <header>
            <strong>{formType === 'new' ? 'Cadastro' : 'Edição'} de entregadores</strong>
          </header>
          <div>
          <Button
              type="button"
              cancel
              onClick={() => history.push('/deliverymans')}
            >
              <MdChevronLeft size={25} color="#FFF" />
              <span>VOLTAR</span>
            </Button>

            <Button type="submit" form="deliverymanform">
              <MdCheck size={20} color="#FFF" />
              <span>SALVAR</span>
            </Button>
          </div>
        </div>

      <Form id="deliverymanform" schema={schema} onSubmit={handleSubmit}  initialData={deliveryman}>
        <div className="line">
          <div className="group">
            <FieldContainer>
              <AvatarInput name="avatar_id" />
            </FieldContainer>
          </div>
        </div>
        <div className="line">
          <div className="group">
            <span>Nome</span>
            <Input name="name" id="name" type="text"/>
          </div>
        </div>
        <div className="line">
          <div className="group">
            <span>Email</span>
            <Input name="email" id="email" type="text"/>
          </div>
        </div>
      </Form>
    </Container>
 );
}

DeliverymanForm.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};
