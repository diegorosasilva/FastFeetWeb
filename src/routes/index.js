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
import DeliverymanForm from '../pages/DeliverymanForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" component={Delivery} isPrivate />
      <Route
        path="/deliveryform/:id"
        component={DeliveryForm}
        isPrivate
      />
      <Route path="/deliverymans" component={Deliveryman} isPrivate />
      <Route
        path="/deliverymansform/:id"
        component={DeliverymanForm}
        isPrivate
      />
      <Route path="/recipients" component={Recipient} isPrivate />
      <Route
        path="/recipientform/:id"
        component={RecipientForm}
        isPrivate
      />
      <Route path="/deliveryproblems" component={DeliveryProblem} isPrivate />
      <Route path="/deliveryform" component={DeliveryForm} isPrivate />
      <Route path="/recipientform" component={RecipientForm} isPrivate />
      <Route path="/deliverymanform" component={DeliverymanForm} isPrivate />
    </Switch>
  );
}
