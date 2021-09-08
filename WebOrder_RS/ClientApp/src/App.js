import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Layout } from './components/Layout';
import { OrderList } from './components/OrderList';
import { Gearbox } from './components/Gearbox';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Login } from './components/Login';
import 'bootstrap/dist/js/bootstrap.min.js';

import fontawesome from '@fortawesome/fontawesome'
import { faUser, faKey } from '@fortawesome/fontawesome-free-solid'

import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (

            <Router>
                <Switch>
                    <Route  path="/Login" component={Login} />
                    <Layout>
                        <Route exact path='/' component={OrderList} />
                        <Route path='/Gearbox' component={Gearbox} />
                        <Route path='/Counter' component={Counter} />
                        <Route path='/Fetch-data' component={FetchData} />
                    </Layout>
                </Switch>
            </Router>
        );
    }
}

