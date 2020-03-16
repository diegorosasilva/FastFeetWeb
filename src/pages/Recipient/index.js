import React, { useState, useEffect } from 'react';
import { MdAdd, MdMoreHoriz, MdCreate, MdDeleteForever } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import history from '../../services/history';
import { Container, DeliveryTable, Badge, Actions, ActionList, Options, Option } from './styles';


function Recipient() {
  const [recipients, setRecipients] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients', {
        params: {
          q: searchValue,
        },
      });

      setRecipients(response.data);
    }
    loadRecipients();
  }, [searchValue]);

  async function deleteRecipient(id) {

    if(window.confirm("Confirma a exclusão do destinatário?")){
      try {
        await api.delete(`/recipients/${id}`);
        toast.success(
          `O destinatário ${id} foi removido com sucesso`
        );
        window.location.reload();
      } catch (err) {
        toast.error(`Não foi possível remover o destinatário ${id}`);
      }
    }
  }

  return (
    <Container>
      <header>
      <strong>Gerenciando destinatários</strong>
      </header>
      <div>
        <div>
          <Input
            name="busca"
            type="text"
            placeholder="Buscar por destinatários"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
        <button type="button" onClick={() => history.push('/recipientform')}>
          <MdAdd size={25} color="#FFF" />
          <span>CADASTRAR</span>
        </button>
      </div>

      <DeliveryTable>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
          {recipients.map(recipient => (
          <tr key={recipient.id}>
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
            <Actions>
              <Badge>
                <MdMoreHoriz color="#666" size={25} />
              </Badge>
              <ActionList>
                <Options>
                  <Option>
                    <Link to={`/recipientform/${recipient.id}`}>
                      <MdCreate color="#4D85EE" size={15} />
                      <span>Editar</span>
                    </Link>
                  </Option>
                  <Option>
                    <Link onClick={() => deleteRecipient(recipient.id)}>
                      <MdDeleteForever color="#DF4141" size={15}/>
                      <span>Excluir</span>
                    </Link>
                  </Option>
                </Options>
              </ActionList>
            </Actions>
          </td>
        </tr>
        ))}
      </DeliveryTable>
    </Container>
  );
}

export default Recipient;
