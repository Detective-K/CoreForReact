import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Omnibar from 'omnibar';
import ResultItem from './OmbibarResultItem';
import GitHubSearchExtension from './GitHubSearchExtension';

export class NewOrder extends React.Component {
    static displayName = NewOrder.name;

    constructor(props) {
        super(props);
        require("../css/OrderList.css");
        const Currency = [
            { value: 'TWD', label: 'TWD' },
            { value: 'USD', label: 'USD' },
            { value: 'CNY', label: 'CNY' },
            { value: 'EUR', label: 'EUR' }
        ];
        const options = [
            { value: 'TWD', label: 'TWD' },
            { value: 'USD', label: 'USD' },
            { value: 'CNY', label: 'CNY' },
            { value: 'EUR', label: 'EUR' }
        ];
        const CustInfo = JSON.parse(localStorage.getItem("CustInfo"));
        this.state = { Currency: Currency, selectedValue: { value: CustInfo[0].countryCode, label: CustInfo[0].countryCode } };
    }
    handleChange(value) {
        this.setState({ selectedValue: value })
    }
    render() {

        return (
            <div>
                <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#modalSignUP">
                    {this.props.btname}
                </button>
                <div className="modal fade" id="modalSignUP" tabindex="-1" role="dialog" aria-labelledby="ModalLSignUP" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalLSignUP">Add New Orders</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <Omnibar
                                        placeholder="Search Cust"
                                        maxResults={10}
                                        maxViewableResults={5}
                                        extensions={[
                                            GitHubSearchExtension,
                                        ]}>
                                        {ResultItem}
                                    </Omnibar>
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">P.O. NO</span>
                                            </div>
                                            <input type="text" className="form-control" placeholder="P.O. NO" aria-label="P.O. NO" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">Currency</span>
                                            </div>
                                            <div className="form-control p-0">
                                                <Select id="currencySel"
                                                    value={this.state.selectedValue}
                                                    options={this.state.Currency}
                                                    onChange={value => this.handleChange(value)}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">Delivery way</span>
                                            </div>
                                            <select className="form-control" id="deliverySel">
                                                <option>By UPS</option>
                                                <option>BY DHL</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">Order Date</span>
                                            </div>
                                            <input type="text" className="form-control" value="2021/04/01" aria-describedby="basic-addon1" disabled />
                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">Delivery date</span>
                                            </div>
                                            <input type="date" class="form-control" id="deliveryDate" name="deliveryDate" />
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}