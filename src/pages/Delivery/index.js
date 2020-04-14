import React, { useState, useEffect } from 'react';
import { MdAdd, MdMoreHoriz, MdVisibility, MdCreate, MdDeleteForever } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal';

import api from '../../services/api';

import history from '../../services/history';
import { Container, DeliveryTable, Status, Actions, Badge, ActionList, Options, Option, Signature } from './styles';


function Delivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries', {
        params: {
          q: searchValue,
        },
      });

      const data = response.data.map(deli => ({
        ...deli,
        modalIsOpen: false,
      }));

      setDeliveries(data);
    }
    loadDeliveries();
  }, [searchValue]);

  function handleToggleOpenModal(id) {
    console.tron.log(id);
    setDeliveries(
      deliveries.map(deli => {
        if (deli.id === id) {
          return { ...deli, modalIsOpen: !deli.modalIsOpen };
        }
        return { ...deli };
      })
    );
  }

  async function deleteDelivery(id) {

    if(window.confirm("Confirma a exclusão da encomenda?")){
      try {
        await api.delete(`/deliveries/${id}`);
        toast.success(
          `A encomenda ${id} foi removida com sucesso`
        );
        window.location.reload();
      } catch (err) {
        toast.error(`Não foi possível remover a encomenda ${id}`);
      }
    }
  }

  return (
      <Container>
      <header>
        <strong>Gerenciando encomendas</strong>
      </header>
      <div>
        <div>
          <Input
            name="busca"
            type="text"
            placeholder="Buscar por encomendas"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
        <button type="button" onClick={() => history.push('/deliveryform')}>
            <MdAdd size={25} color="#FFF" />
            <span>CADASTRAR</span>
        </button>
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
              <img src={delivery.deliveryman.avatar.url|| 'https://api.adorable.io/avatars/50/abott@adorable.png'} alt={delivery.deliveryman.name}/>
              <span>{delivery.deliveryman.name}</span>
            </td>
            <td>
              <span>{delivery.recipient.city}</span>
            </td>
            <td>
              <span>{delivery.recipient.state}</span>
            </td>
            <td>
              <Status status={delivery.status}>
                <span>{delivery.status}</span>
              </Status>
            </td>
            <td>
              <Actions>
                <Badge>
                  <MdMoreHoriz color="#666" size={25} />
                </Badge>
                <ActionList>
                  <Options>
                    <Option>
                      <Link onClick={() => handleToggleOpenModal(delivery.id)}>
                        <MdVisibility color="#7D40E7" size={15} />
                        <span>Visualizar</span>
                      </Link>
                    </Option>
                    <Option>
                      <Link to={`/deliveryform/${delivery.id}`}>
                        <MdCreate color="#4D85EE" size={15} />
                        <span>Editar</span>
                      </Link>
                    </Option>
                    <Option>
                      <Link onClick={() => deleteDelivery(delivery.id)}>
                        <MdDeleteForever color="#DF4141" size={15} />
                        <span>Excluir</span>
                      </Link>
                    </Option>
                  </Options>
                </ActionList>
              </Actions>
                <Modal
                  visible={delivery.modalIsOpen}
                  handler={handleToggleOpenModal}
                  handlerParam={delivery.id}
                >
                  <h4>Informações da encomenda</h4>
                  <p>
                    {delivery.recipient.address}, {delivery.recipient.number}
                  </p>
                  <p>
                    {delivery.recipient.city}, {delivery.recipient.state}
                  </p>
                  <p>{delivery.recipient.zip_code}</p>
                  <hr />
                  <h4>Datas</h4>
                  <p>
                    <strong>Retirada:</strong>{' '}
                    {delivery.start_date ? (
                      format(parseISO(delivery.start_date), 'dd/MM/yyyy')
                    ) : (
                      <>--/--/----</>
                    )}
                  </p>
                  <p>
                    <strong>Entrega:</strong>{' '}
                    {delivery.end_date ? (
                      format(parseISO(delivery.end_date), 'dd/MM/yyyy')
                    ) : (
                      <>--/--/----</>
                    )}
                  </p>
                  <hr />
                  <h4>Assinatura do destinatário</h4>
                  {delivery.signature ? (
                      <Signature>
                        <img src={delivery.signature.url} alt="assinatura" />
                      </Signature>
                    ) : (
                      <p>Sem assinatura</p>
                    )}
                </Modal>
            </td>
          </tr>
          ))}
      </DeliveryTable>
    </Container>
 );
}

export default Delivery;
