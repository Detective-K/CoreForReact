import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import { Home } from './OrderList';
import { FetchData } from './FetchData';
import { Counter } from './Counter';


export default class Main extends Component {
    static displayName = Main.name;

    render() {
        return (
            <Layout>
                <Route exact path='/Main' component={Home} />
                <Route path='/Main/counter' component={Counter} />
                <Route path='/Main/fetch-data' component={FetchData} />
            </Layout>
        );
    }
}
