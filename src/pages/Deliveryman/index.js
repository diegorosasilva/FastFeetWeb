import React, { useState, useEffect } from 'react';
import { MdAdd, MdMoreHoriz, MdCreate, MdDeleteForever } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import history from '../../services/history';
import { Container, DeliveryTable, Actions, Badge, ActionList, Options, Option } from './styles';


function Deliveryman() {
  const [deliverymans, setDeliverymans] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    async function loadDeliverymans() {
      const response = await api.get('deliverymans', {
        params: {
          q: searchValue,
        },
      });

      setDeliverymans(response.data);
    }
    loadDeliverymans();
  }, [searchValue]);

  async function deleteDeliveryman(id) {

    if(window.confirm("Confirma a exclusão do entregador?")){
      try {
        await api.delete(`/deliverymans/${id}`);
        toast.success(
          `O entregador ${id} foi removido com sucesso`
        );
        window.location.reload();
      } catch (err) {
        toast.error(`Não foi possível remover o entregador ${id}`);
      }
    }
  }

    return (
      <Container>
        <header>
          <strong>Gerenciando entregadores</strong>
        </header>
        <div>
          <div>
            <Input
              name="busca"
              type="text"
              placeholder="Buscar por entregadores"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
          </div>
          <button type="button" onClick={() => history.push('/deliverymanform')}>
            <MdAdd size={25} color="#FFF" />
            <span>CADASTRAR</span>
        </button>
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
            <tr key ={deliveryman.id}>
            <td>
              <span>#{deliveryman.id}</span>
            </td>
            <td>
              <img src={deliveryman.avatar.url || 'https://api.adorable.io/avatars/50/abott@adorable.png'} alt={deliveryman.name}/>
            </td>
            <td>
              <span>{deliveryman.name}</span>
            </td>
            <td>
              <span>{deliveryman.email}</span>
            </td>
            <td>
              <Actions>
                <Badge>
                  <MdMoreHoriz color="#666" size={25} />
                </Badge>
                <ActionList>
                  <Options>
                    <Option>
                      <Link to={`/deliverymansform/${deliveryman.id}`}>
                        <MdCreate color="#4D85EE" size={15} />
                        <span>Editar</span>
                      </Link>
                    </Option>
                    <Option>
                      <Link onClick={() => deleteDeliveryman(deliveryman.id)}>
                        <MdDeleteForever color="#DF4141" size={15} />
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

export default Deliveryman;
