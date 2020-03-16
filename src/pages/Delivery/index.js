import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { MdAdd, MdMoreHoriz, MdVisibility, MdCreate, MdDeleteForever } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import history from '../../services/history';
import { Container, DeliveryTable, Status, Actions, Badge, ActionList, Options, Option, ModalTags } from './styles';


function Delivery() {
  Modal.setAppElement('#root');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [deliveries, setDeliveries] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const customStyles = {
    overlay: {
      backgroundColor: 'grey',
      opacity: 1,
    },
    content: {
      width: '20%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '1px 1px 8px #000000',
    }
  }

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries', {
        params: {
          q: searchValue,
        },
      });

      setDeliveries(response.data);
    }
    loadDeliveries();
  }, [searchValue]);

  function handleToggleOpenModal() {
    setModalIsOpen(!modalIsOpen);
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
                      <Link onClick={handleToggleOpenModal}>
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

                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={handleToggleOpenModal}
                  style={customStyles}
                >
                  <ModalTags>
                    <span>Informações da encomenda</span>
                    <p>{delivery.recipient.address}, {delivery.recipient.number}</p>
                    <p>{delivery.recipient.city} - {delivery.recipient.state}</p>
                    <p>{delivery.recipient.zip_code}</p>
                    <br/>
                    <span>Datas</span>
                    <br/>
                    <span>Retirada:</span><p>{delivery.start_date ? delivery.start_date : 'Não retirado'}</p>
                    <span>Entrega:</span><p>{delivery.end_date ? delivery.end_date : 'Não entregue'}</p>
                    <br/>
                    <span>Assinatura do destinatário</span>
                  </ModalTags>
                </Modal>
              </Actions>
            </td>
          </tr>
          ))}
      </DeliveryTable>
    </Container>
 );
}

export default Delivery;
