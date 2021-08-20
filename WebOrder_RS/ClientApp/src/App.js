import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Layout } from './components/Layout';
import { OrderList } from './components/OrderList';
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
                    <Route path="/Login"  component={Login} />
                    <Layout>
                        <Route exact path='/' component={OrderList} />
                        <Route path='/Counter' component={Counter} />
                        <Route path='/Fetch-data' component={FetchData} />
                    </Layout>
                </Switch>
            </Router>
        );
    }
}

