import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

//import Notifications from '~/components/Notifications';

import { signOut } from '../../store/modules/auth/actions';
import logo from '../../assets/fastfeet-logo.png';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <Link to ="/deliveries">ENCOMENDAS</Link>
          <Link to ="/deliverymans">ENTREGADORES</Link>
          <Link to ="/recipients">DESTINATÁRIOS</Link>
          <Link to ="/deliveryproblems">PROBLEMAS</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleSignOut}>Sair do sistema</button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
