import React, {useState} from 'react';
import Modal from 'react-modal';

import { MdMoreHoriz, MdVisibility, MdCreate, MdDeleteForever } from 'react-icons/md'

import { Container, Badge, ActionList, Action } from './styles';

export default function Actions() {
  Modal.setAppElement('#root');
  const [visible, setVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function handleToggleOpenModal() {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible}>
      <MdMoreHoriz size={36} color="#f1f1f1"/>
      </Badge>

      <ActionList visible={visible}>
        <Action>
          <MdVisibility size={36} color="#f1f1f1"/>
          <button onClick={handleToggleOpenModal} type="button">Visualizar</button>
        </Action>
        <Action>
          <MdCreate size={36} color="#f1f1f1"/>
          <button type="button">Editar</button>
        </Action>
        <Action>
          <MdDeleteForever size={36} color="#f1f1f1"/>
          <button type="button">Excluir</button>
        </Action>
      </ActionList>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleToggleOpenModal}
        style={
          {
            overlay: {
              backgroundColor: 'grey'
            },
            content: {
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'

            }
          }
        }
      >
        <h1>Teste h1</h1>
        <p>Teste p</p>
        <button onClick={handleToggleOpenModal} type="button">Fechar</button>
      </Modal>
    </Container>
  );
}
