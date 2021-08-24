import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Search from 'react-search';
import Moment from 'react-moment';


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
        const Delivery = [
            { value: 'A', label: 'BY UPS' },
            { value: 'B', label: 'BY DHL' },
            { value: 'C', label: 'BY TNT' },
            { value: 'D', label: 'BY Fedex' },
            { value: 'E', label: 'BY EMS' },
            { value: 'F', label: 'BY Aircargo' },
            { value: 'EUR', label: 'EUR' },
            { value: 'EUR', label: 'EUR' }
        ];
        const CustInfo = JSON.parse(localStorage.getItem("CustInfo"));
        const SaleInfo = JSON.parse(localStorage.getItem("SaleInfo"));
        let elementDisable = SaleInfo[0].salesId != "" ? true : false;
        this.state = {
            Currency: Currency, Delivery: Delivery, CustInfo: CustInfo, repos: [], CurrencyValue: { value: CustInfo[0].countryCode, label: CustInfo[0].countryCode },
            elementDisable: elementDisable, DeliveryValue: { value: "", label: "" }
        };
        this.addClick = this.addClick.bind(this);

    }

    handleItemsChange(items) {
        if (items.length > 1) {
            items.splice(0, 1);
        }
        if (items.length > 0) {          
            this.state.CustInfo[0].custId = items[0].value.substring(0, items[0].value.indexOf("/"));
            const searchValue = items[0].value.substring(0, items[0].value.indexOf("/"));
            let url = ` https://localhost:44363/api/Order/CustSearchInfo?CustId=${searchValue}`
            fetch(url).then((response) => {
                return response.json();
            }).then((results) => {
                if (results != undefined) {
                    this.state.CustInfo = results;
                    this.state.CurrencyValue.label = results[0].CountryCode;
                    this.state.CurrencyValue.value = results[0].CountryCode;
                }
            });
        }  
    }

    CurrencyhandleChange(e) {
        this.state.CurrencyValue.label = e.label;
        this.state.CurrencyValue.value = e.value;
    }
    DeliveryhandleChange(e) {
        this.state.DeliveryValue.label = e.label;
        this.state.DeliveryValue.value = e.value;
    }

    getItemsAsync(searchValue, cb) {
        let url = ` https://localhost:44363/api/Order/CustSearchInfo?CustId=${searchValue}`
        fetch(url).then((response) => {
            return response.json();
        }).then((results) => {
            if (results != undefined) {
                let items = results.map(
                    (res, i) => {
                        return {
                            id: i, value: res.CustId + "/" + res.Name
                        }
                    })
                this.setState({ repos: items })
                cb(searchValue)
            }
        });
    }
    addClick()
    {
        let feStr = {};
        feStr["CustId"] = this.state.CustInfo[0].custId;
        feStr["Deliver"] = this.state.CustInfo[0].deliver;
        feStr["Pono"] = document.getElementById('Pono').value;
        feStr["DelivAddr"] = this.state.CustInfo[0].addr;
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
                                    {this.state.elementDisable ? (
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">Cust</span>
                                            </div>                                        
                                            <Search id= "SearchCS" type="text" className="form-control" items={this.state.repos}
                                                placeholder=""
                                                multiple={true}
                                                NotFoundPlaceholder="Please search for some cust ID"
                                                getItemsAsync={this.getItemsAsync.bind(this)}
                                                onItemsChanged={this.handleItemsChange.bind(this)} />
                                        </div>
                                    </div> ) : null }
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">P.O. NO</span>
                                            </div>
                                            <input id = "Pono" type="text" className="form-control" placeholder="P.O. NO" aria-label="P.O. NO" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">Currency</span>
                                            </div>
                                            <div className="form-control p-0">
                                                <Select id="currencySel"
                                                    value={this.state.CurrencyValue}
                                                    options={this.state.Currency}
                                                    onChange={value => this.CurrencyhandleChange(value)}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">Delivery way</span>
                                            </div>
                                            <div className="form-control p-0">
                                                <Select id="deliverySel"
                                                    options={this.state.Delivery}
                                                    onChange={value => this.DeliveryhandleChange(value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">Order Date</span>
                                            </div>
                                            <input type="text" className="form-control" value={new Date().toLocaleDateString()} aria-describedby="basic-addon1" disabled />
                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">Delivery date</span>
                                            </div>
                                            <input type="date" class="form-control" id="deliveryDate" name="deliveryDate" min={new Date().toISOString().slice(0, -14)} />
                              
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" onClick={this.addClick} className="btn btn-success">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}