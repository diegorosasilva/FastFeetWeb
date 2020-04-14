import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal';

import { MdMoreHoriz, MdVisibility, MdDeleteForever } from 'react-icons/md'

import { Container, DeliveryTable, Actions, Badge, ActionList, Options, Option } from './styles';


function DeliveryProblem() {
  const [deliveryproblems, setDeliveryproblems] = useState([]);

  useEffect(() => {
    async function loadDeliveryproblems() {
      const response = await api.get('deliveryproblems');

      const data = response.data.map(prob => ({
        ...prob,
        modalIsOpen: false,
      }));

      setDeliveryproblems(data);
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

  function handleToggleOpenModal(id) {
    setDeliveryproblems(
      deliveryproblems.map(prob => {
        if (prob.id === id) {
          return { ...prob, modalIsOpen: !prob.modalIsOpen };
        }
        return { ...prob };
      })
    );
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
                    <Link onClick={() => handleToggleOpenModal(deliveryproblem.id)}>
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
            </Actions>
            <Modal
              visible={deliveryproblem.modalIsOpen}
              handler={handleToggleOpenModal}
              handlerParam={deliveryproblem.id}
            >
              <h4>VISUALIZAR PROBLEMA</h4>
              <p>{deliveryproblem.description}</p>
            </Modal>
          </td>
        </tr>
        ))}
      </DeliveryTable>
    </Container>
  );
}

export default DeliveryProblem;
