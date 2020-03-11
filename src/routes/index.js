import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Delivery from '../pages/Delivery';
import Deliveryman from '../pages/Deliveryman';
import Recipient from '../pages/Recipient';
import DeliveryProblem from '../pages/DeliveryProblem';
import DeliveryForm from '../pages/DeliveryForm';
import RecipientForm from '../pages/RecipientForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" component={Delivery} isPrivate />
      <Route path="/deliverymans" component={Deliveryman} isPrivate />
      <Route path="/recipients" component={Recipient} isPrivate />
      <Route path="/deliveryproblems" component={DeliveryProblem} isPrivate />
      <Route path="/deliveryform" component={DeliveryForm} isPrivate />
      <Route path="/recipientform" component={RecipientForm} isPrivate />
    </Switch>
  );
}
