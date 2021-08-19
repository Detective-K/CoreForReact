import React, { Component } from 'react';
import moment from 'react-moment';

export class OrderList extends Component {
    static displayName = OrderList.name;

    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
        require("../css/OrderList.css");
        this.state = { forecasts: [], forecasts2: [], loading: true };
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
    static renderOrderTable(forecasts) {

        const SaleInfo = JSON.parse(localStorage.getItem("SaleInfo"));

        const CustInfo = JSON.parse(localStorage.getItem("CustInfo"));
        const test = { 'SaleInfo': JSON.stringify(SaleInfo), 'CustInfo': JSON.stringify(CustInfo) };
        const filterMember = "BAC001";

        let get_lub = (fetObj) => {
            let temp = fetObj.ods.Lubrication;
            if ((CustInfo[0].custId != "BAJ003") && (("A,C").indexOf(fetObj.ods.PartNo.substring(0, 1)) > 0)) {
                if (fetObj.ods.Spec.substring(0, 1) == "P") {
                    if (fetObj.ods.Lubrication == "Multemp AC-D" || fetObj.ods.Lubrication == "Grease") {
                        temp = "Grease";
                    }
                    else {
                        temp = <div> {fetObj.ods.Lubrication} <sup><font color="red">(1)</font></sup></div>;
                    }
                }
                else if (fetObj.ods.Spec.substring(0, 3) == "AFX" || fetObj.ods.Spec.substring(0, 2) == "AT" || fetObj.ods.PartNo.substring(1, 2) == "42") {
                    //AFX AT 系列預設潤滑油為Multemp AC-D
                    //GL預設潤滑油為Multemp AC-D
                    if (fetObj.ods.Lubrication == "Multemp AC-D" || fetObj.ods.Lubrication == "Grease") {
                        temp = "Grease";
                    }
                    else {
                        temp = <div> {fetObj.ods.Lubrication} <sup><font color="red">(1)</font></sup></div>;
                    }
                }
                else if (("G4,G5").indexOf(fetObj.ods.PartNo.substring(1, 2)) > 0) {
                    //AES預設食物油
                    if (fetObj.ods.Lubrication == "Food Grade Grease") {
                        temp = "Food Grade Grease";
                    }
                    else {
                        temp = <div> {fetObj.ods.Lubrication} <sup><font color="red">(1)</font></sup></div>;
                    }

                }
                else {
                    //預設油品show空白
                    if (fetObj.ods.Lubrication == "Nye Nyogel 792D" || fetObj.ods.Lubrication == "Oil / Gel") {
                        temp = "Oil / Gel";
                    }
                    else {
                        temp = <div> {fetObj.ods.Lubrication} <sup><font color="red">(1)</font></sup></div>;
                    }
                }
            }
            else {
                //預設油品show空白
                if (fetObj.ods.Lubrication == "Multemp AC-D" || fetObj.ods.Lubrication == "Grease") {
                    temp = "Grease";
                }
                else {
                    temp = <div> {fetObj.ods.Lubrication} <sup><font color="red">(1)</font></sup></div>;
                }
            }

            if (temp == "other") {
                temp = "Else";

                if (fetObj.ods.LubricationT1.length > 0) {
                    temp = <div> {fetObj.ods.LubricationT1} <sup><font color="red">(1)</font></sup></div>;
                }
            }
            return temp;
        }

        let Fun_show_warranty = (fetObj) => {
            let temp = fetObj.ods.IsWarranty;
            if (("A,C").indexOf(fetObj.ods.PartNo.substring(0, 1)) > 0) {
                if (!fetObj.ods.InertiaApp || parseFloat(fetObj.ods.InertiaApp) == 0) {
                    if (fetObj.ods.IsWarranty == "True") {
                        temp = <div>Yes<sup><font color="red">(2)</font></sup></div>;
                    }
                    else {
                        temp = <div> No<sup><font color="red">(3)</font></sup> </div>;
                    }
                }
                else {
                    if (fetObj.ods.IsWarranty == "True") {
                        if (fetObj.ods.InertiaAppWarranty == "True") {
                            temp = "Yes";
                        }
                        else {
                            temp = <div> No<sup><font color="red">(4)</font></sup></div>;
                        }

                    }
                    else {
                        temp = <div> No<sup><font color="red">(3)</font></sup></div>;
                    }
                }
            }
            else {
                if (fetObj.ods.IsWarranty == "True") {
                    temp = "Yes";
                }
                else {
                    temp = "No";
                }
            }
            return temp;
        }

        return (
            <div>
                {forecasts[0].Data.map((forecast, index) =>
                    <dl class="row no-gutters">
                        <dd class="col-sm-12">
                            <h4><span class="badge badge-secondary">{moment(forecast.OrderDate).format('YYYY-MM-DD')} </span></h4>
                            <div id="accordion">
                                <div className="card">
                                    <div className="card-header no-padding-LR no-padding-TB " id={"heading" + index}>
                                        <h5 className="mb-0">
                                            <button className="btn btn-link accordionBtn no-padding-LR" data-toggle="collapse" data-target={"#collapse" + index} aria-expanded="true" aria-controls={"collapse" + index}>
                                                <legend>      <div className="row no-gutters">
                                                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 ">{forecast.OrderId}</div>
                                                    <div className="col-6  col-sm-6 col-md-6 col-lg-6 ">{forecast.Pono}</div>
                                                </div></legend>
                                            </button>
                                        </h5>
                                    </div>

                                    <div id={"collapse" + index} className="collapse " aria-labelledby={"heading" + index} data-parent="#accordion">
                                        <div className="card-body">
                                            <table className="table table-sm table-striped table-bordered" >
                                                <thead>
                                                    <tr>
                                                        <th colSpan="4" >
                                                            <div className="row">
                                                                <div className="  col-6 col-sm-5 col-md-7 col-lg-7 col-xl-7">Ordering Code </div>
                                                                <div className="col-3 col-sm-3  col-md-2  col-lg-1 col-xl-1  text-right">{"Q'ty"}</div>
                                                                <div className="col-3 col-sm-3 col-md-2   col-lg-2 col-xl-2  text-right">Unit Price</div>
                                                                <div className="col-1 col-sm-1 col-md-12  col-lg-12 col-xl-2  text-right "></div>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {forecasts[0].Data2.map((forecast2, index2) => {
                                                        if ((forecast2.ocs.OrderId == forecast.OrderId) && forecast2.ods) {
                                                            return <tr>
                                                                <td colSpan="4">
                                                                    <div className="row">
                                                                        <div className="col-12  col-sm-6 col-md-7 col-lg-7 col-xl-7  "> {(forecast2.ods.Spec.indexOf("舊") >= 0 ? forecast2.ods.Spec.substring(0, forecast2.ods.Spec.indexOf("舊")) + " / " + forecast2.ods.Mtmaker + " " + forecast2.ods.MotoName : forecast2.ods.Mtmaker != "" ? forecast2.ods.Spec + " / " + forecast2.ods.Mtmaker + " " + forecast2.ods.MotoName : forecast2.ods.Spec)}</div>
                                                                        <div className="col-9  col-sm-2 col-md-2 col-lg-1 c ol-xl-1 text-right ">{forecast2.ods.Qty}</div>

                                                                        <div className="col-3 col-sm-3  col-md-2 col-lg-2 col-xl-2 text-right">{CustInfo.length > 0 ? (filterMember.indexOf(CustInfo[0].custId) > 0 ? "****" : forecast2.ods.Price) : forecast2.ods.Price}</div>
                                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-2  col-xl-2 text-right">
                                                                            <button type="button" className="btn btn-info btn-sm  " data-toggle="modal" data-target={"#Modal" + index2}>
                                                                                Detail
                                                                                </button>
                                                                                &nbsp;&nbsp;&nbsp;
                                                                                <button type="button" class="btn btn-danger btn-sm">
                                                                                <i class="fas fa-trash-alt"></i>
                                                                            </button>
                                                                        </div>
                                                                        <div className="modal fade" id={"Modal" + index2} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                                                <div className="modal-content">
                                                                                    <div className="modal-header">
                                                                                        <h5 className="modal-title" id="exampleModalLongTitle"> {(forecast2.ods.Spec.indexOf("舊") >= 0 ? forecast2.ods.Spec.substring(0, forecast2.ods.Spec.indexOf("舊")) + " / " + forecast2.ods.Mtmaker + " " + forecast2.ods.MotoName : forecast2.ods.Mtmaker != "" ? forecast2.ods.Spec + " / " + forecast2.ods.Mtmaker + " " + forecast2.ods.MotoName : forecast2.ods.Spec)}</h5>
                                                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                            <span aria-hidden="true">&times;</span>
                                                                                        </button>
                                                                                    </div>
                                                                                    <div className="modal-body">
                                                                                        <dl className="row">
                                                                                            <dt className="col-5 col-sm-5">{"Quantity"}</dt>
                                                                                            <dd className="col-7 col-sm-7">{forecast2.ods.Qty}</dd>
                                                                                            <dt className="col-5 col-sm-5">Unit Price</dt>
                                                                                            <dd className="col-7 col-sm-7">{CustInfo.length > 0 ? (filterMember.indexOf(CustInfo[0].custId) > 0 ? "****" : forecast2.ods.Price) : forecast2.ods.Price}</dd>
                                                                                            <dt className="col-5 col-sm-5">Part No.</dt>
                                                                                            <dd className="col-7 col-sm-7">{forecast2.ods.PartNo}</dd>
                                                                                            <dt className="col-5 col-sm-5">Discount</dt>
                                                                                            <dd className="col-7 col-sm-7">{(CustInfo.length > 0 ? (filterMember.indexOf(CustInfo[0].custId) > 0 ? "****" : forecast2.ods.Discount) : forecast2.ods.Discount) + "%"} </dd>

                                                                                            <dt className="col-5 col-sm-5">Total Price</dt>
                                                                                            <dd className="col-7 col-sm-7">{(CustInfo.length > 0 ? (filterMember.indexOf(CustInfo[0].custId) > 0 ? "****" : forecast2.ods.SubTot) : forecast2.ods.SubTot)}</dd>
                                                                                            <dt className="col-5 col-sm-5">Currency</dt>
                                                                                            <dd className="col-7 col-sm-7">{forecast2.ocs.Currency}</dd>

                                                                                            <dt className="col-5 col-sm-5">Lubrication</dt>
                                                                                            <dd className="col-7 col-sm-7">{get_lub(forecast2)}</dd>
                                                                                            <dt className="col-5 col-sm-5">Warranty</dt>
                                                                                            <dd className="col-7 col-sm-7">{Fun_show_warranty(forecast2)}</dd>
                                                                                            <dt className="col-5 col-sm-5">Memo</dt>
                                                                                            <dd className="col-7 col-sm-7">{forecast2.ods.Memo}</dd>
                                                                                            <dt className="col-5 col-sm-5">Customization</dt>
                                                                                            <dd className="col-7 col-sm-7">{forecast2.ods.Memo ? forecast2.ods.Memo : ""}</dd>
                                                                                        </dl>
                                                                                        <dl className="row">
                                                                                            <dt className="col-sm-12 description-red text-danger">(1)&nbsp;Non-standard lubrication.</dt>
                                                                                            <dt className="col-sm-12 description-red text-danger">(2)&nbsp;WARNING!!&nbsp;<sup>(*)</sup>></dt>
                                                                                            <dt className="col-sm-12 description-red text-danger">(3)&nbsp;WARNING!!&nbsp;&nbsp;No Warranty by the selected ratio.</dt>
                                                                                            <dt className="col-sm-12 description-red text-danger">(4)&nbsp;WARNING!!&nbsp;&nbsp;No Warranty due to exceeding back-drive </dt>
                                                                                            <dt className="col-sm-12 description-red text-danger">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;torque from application.</dt>
                                                                                            <dt className="col-sm-12 description-red text-danger">*&nbsp;Price for reference only. For the real price, refer to P/I.</dt>
                                                                                        </dl>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>;
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                            <dl className="row">
                                                <dd className="col text-center">
                                                    <div class="btn-group" role="group">
                                                        <button id="btnGroupDrop1" type="button" className="btn btn btn-success dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Add Item
                                                                     </button>
                                                        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                            <a class="dropdown-item" href="#/Gearbox">Gearbox</a>
                                                            <a class="dropdown-item" href="#/RackPinion">Rack / Pinion</a>
                                                            <a class="dropdown-item" href="#/GearboxRackPinion">Gearbox + Rack + Pinion</a>
                                                        </div>
                                                    </div>
                                                </dd>
                                            </dl>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </dd>
                    </dl>
                )}
            </div>
        );
    }

    addClick() {

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
            : OrderList.renderOrderTable(this.state.forecasts);
        let contents2 = this.state.loading
            ? <p><em>Loading...</em></p>
            : OrderList.renderOrderTable(this.state.forecasts2);
        return (
            <main role="main" className="container-fluid">
                <br />
                <br />
                <br />
                <PageTitle head={<h3>Orders to APEX</h3>} />
                <div className="row">
                    <div className="col-lg-4 col-lg-offset-4"> <input type="search" id="search" value="" className="form-control" placeholder="Search" /> </div>
                    <div className="col-lg-4 col-lg-offset-4">
                        <NewOrder onClick={this.loginClick} btname="Add New Order" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">

                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#home">Not Confirmed</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#menu1">In Processing</a>
                            </li>

                        </ul>
                        <div class="tab-content">
                            <div id="home" class="container tab-pane active"> <br />
                                {contents}
                            </div>
                            <div id="menu1" class="container tab-pane fade"><br />
                                {contents2}
                            </div>

                        </div>



                    </div>
                </div>
            </main>
        );
    }
}
