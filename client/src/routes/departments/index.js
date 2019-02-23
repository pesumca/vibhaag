import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import allDeparments from './all-departments';

export default ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/all-departments`} />
        <Route path={`${match.url}/all-departments`} component={allDeparments} />
        <Redirect to="/error" />
    </Switch>
);