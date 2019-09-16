import { Route, Switch } from "react-router-dom";
import React from "react";
import App from './App.js';

function Routes() {
    return (
        <Switch>
            <Route path="/" component={App} />
        </Switch>
    );
}

export default Routes;