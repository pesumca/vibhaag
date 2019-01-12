import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import second from './second';

export default ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/second`} />
        <Route path={`${match.url}/second`} component={second} />
        <Redirect to="/error" />
    </Switch>
);