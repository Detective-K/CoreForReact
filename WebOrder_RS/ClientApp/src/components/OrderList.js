import { faUserCheck } from '@fortawesome/fontawesome-free-solid';
import React, { Component } from 'react';
import Moment from 'react-moment';
import { NewOrder } from './NewOrder';
import { RenderOrderTable } from './RenderOrderTable';


export class OrderList extends Component {
    static displayName = OrderList.name;

    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
        require("../css/OrderList.css");
        this.state = {
            forecasts: [], forecasts2: [], temp : "", loading: true
        };
    }

    componentDidMount() {
        this.populateApiData();
    }


    async populateApiData() {
        const feStr = {};
        const CustInfo = JSON.parse(localStorage.getItem("CustInfo"));
        feStr["CustId"] = CustInfo[0].custId;
        feStr["Ostatus"] = "0";
        const response = await fetch("https://localhost:44363/api/Order/OrderList?feStr=" + JSON.stringify(feStr), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        feStr["Ostatus"] = "2";
        const response2 = await fetch("https://localhost:44363/api/Order/OrderList?feStr=" + JSON.stringify(feStr), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data2 = await response2.json();

        this.setState({ forecasts: data, forecasts2: data2, loading: false });
    }

    render() {

        const PageTitle = (props) => {
            return (
                <div className="row color-Apex  text-center mb-3">
                    <div className="offset-md-3 col-md-6">
                        {props.head}
                    </div>
                </div>
            )
        };
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <RenderOrderTable state={ this.state} />;
        let contents2 = this.state.loading
            ? <p><em>Loading...</em></p>
            : <RenderOrderTable state={this.state} />;
        return (
            <main role="main" className="container-fluid">
                <PageTitle head={<h3>Orders to APEX</h3>} />
                <div className="row">
                    <div className="col-lg-4 col-lg-offset-4"> <input type="search" id="search"  className="form-control" placeholder="Search" /> </div>
                    <div className="col-lg-4 col-lg-offset-4">
                        <NewOrder btname="Add New Order" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">

                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#home">Not Confirmed</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#menu1">In Processing</a>
                            </li>

                        </ul>
                        <div className="tab-content">
                            <div id="home" className="container tab-pane active"> <br />
                                {contents}
                            </div>
                            <div id="menu1" className="container tab-pane fade"><br />
                                {contents2}
                            </div>

                        </div>



                    </div>
                </div>
            </main>
        );
    }
}
