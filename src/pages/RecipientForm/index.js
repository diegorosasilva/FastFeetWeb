import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { Input, Form } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '../../services/api';

import { Container, Button } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  address: Yup.string().required('O nome da rua é obrigatório'),
  number: Yup.number('Deve informar um valor numérico')
    .typeError('Deve informar um valor numérico')
    .required('O número é obrigatório'),
  state: Yup.string().required('O estado é obrigatório'),
  city: Yup.string().required('A cidade é obrigatória'),
  zip_code: Yup.string()
    .required('O CEP é obrigatório')
    .min(8, 'O CEP deve ter no mínimo 8 caracteres')
    .max(9, 'O CEP deve ter no máximo 9 caracteres'),
});

export default function RecipientForm( { match, history } ) {
  const [recipients, setRecipients] = useState(null);

  const { id } = match.params;
  const formType = id ? 'edit' : 'new';

  console.tron.log(id);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get(`/recipients/${id}`);

      setRecipients(response.data);
    }
    loadRecipients();
  }, [id]);

  async function createRecipient(data) {
    try {
      await api.post('/recipients', data);
      toast.success('O destinatário foi criado com sucesso');
      history.push('/recipients');
    } catch (err) {
      toast.error('Não foi possível criar o destinatário');
    }
  }

  async function editRecipient(data) {
    try {
      await api.put(`/recipients/${id}`, data);
      toast.success('O destinatário foi editado com sucesso');
      history.push('/recipients');
    } catch (err) {
      toast.error('Não foi possível editar o destinatário');
    }
  }

  function handleSubmit(data){
    switch (formType) {
      case 'new':
        createRecipient(data);
        break;
      case 'edit':
        editRecipient(data);
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <div>
        <header>
          <strong>{formType === 'new' ? 'Cadastro' : 'Edição'} de destinatário</strong>
        </header>
        <div>
          <Button
            type="button"
            cancel
            onClick={() => history.push('/recipients')}
          >
            <MdChevronLeft size={25} color="#FFF" />
            <span>VOLTAR</span>
          </Button>

          <Button type="submit" form="recipientform">
            <MdCheck size={20} color="#FFF" />
            <span>SALVAR</span>
          </Button>
        </div>
      </div>

      <Form initialData={recipients} id="recipientform" schema={schema} onSubmit={handleSubmit}>
        <div className="line">
          <div className="group">
            <span>Nome</span>
            <Input
              name="name"
              id="name"
              type="text"
            />
          </div>
        </div>
        <div className="line">
          <div className="group">
            <span>Rua</span>
            <Input
              name="address"
              id="address"
              type="text"
            />
          </div>
          <div className="group">
            <span>Número</span>
            <Input name="number" id="number" type="text" />
          </div>
          <div className="group">
            <span>Complemento</span>
            <Input
              name="additional"
              id="additional"
              type="text"
            />
          </div>
        </div>

        <div className="line">
          <div className="group">
            <span>Cidade</span>
            <Input
              name="city"
              id="city"
              type="text"
            />
          </div>
          <div className="group">
            <span>Estado</span>
            <Input
              name="state"
              id="state"
              type="text"
            />
          </div>
          <div className="group">
            <span>CEP</span>
            <Input
              name="zip_code"
              id="zip_code"
              type="text"
            />
          </div>
        </div>
      </Form>
    </Container>
 );
}

RecipientForm.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

