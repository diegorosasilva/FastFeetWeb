import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { MdMoreHoriz, MdVisibility, MdDeleteForever } from 'react-icons/md'

import { Container, DeliveryTable, Actions, Badge, ActionList, Options, Option, ModalTags } from './styles';

function DeliveryProblem() {
  Modal.setAppElement('#root');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [deliveryproblems, setDeliveryproblems] = useState([]);

  const customStyles = {
    overlay: {
      backgroundColor: 'grey',
      opacity: 0.9,
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
    async function loadDeliveryproblems() {
      const response = await api.get('deliveryproblems');

      setDeliveryproblems(response.data);
    }
    loadDeliveryproblems();
  }, []);

  async function cancelDelivery(id) {
    if(window.confirm("Confirma o cancelamento da encomenda ?")){
      try {
        await api.put(`/problem/${id}/cancel-delivery`);
        toast.success(
          `O encomenda ${id} foi cancelada com sucesso`
        );
        window.location.reload();
      } catch (err) {
        toast.error(`Não foi possível cancelar a encomenda ${id}`);
      }
    }
  }

  function handleToggleOpenModal() {
    setModalIsOpen(!modalIsOpen);
  }

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
          <tr key={deliveryproblem.id}>
          <td>
            <span>#{deliveryproblem.delivery_id}</span>
          </td>
          <td>
            <span>{deliveryproblem.description}</span>
          </td>
          <td>
            <Actions id={deliveryproblem.id}>
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
                    <Link onClick={() => cancelDelivery(deliveryproblem.id)}>
                      <MdDeleteForever color="#DF4141" size={15} />
                      <span>Cancelar encomenda</span>
                    </Link>
                  </Option>
                </Options>
              </ActionList>
              <p>{deliveryproblem.id}</p>
            </Actions>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={handleToggleOpenModal}
              style={customStyles}
            >
              <ModalTags>
                <span>VISUALIZAR PROBLEMA</span>
                <p>{deliveryproblem.id}</p>
              </ModalTags>
            </Modal>
          </td>
        </tr>
        ))}
      </DeliveryTable>
    </Container>
  );
}

export default DeliveryProblem;
