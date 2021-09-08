import { faUserCheck } from '@fortawesome/fontawesome-free-solid';
import React, { Component } from 'react';
import { AccordionCt } from './AccordionCt';
import { NewOrder } from './NewOrder';

export class Gearbox extends Component {
    static displayName = Gearbox.name;

    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
/*        require("../css/OrderList.css");*/
        this.state = {
            forecasts: [], forecasts2: [], temp: "", loading: true
        };
    }

    componentDidMount() {
        this.populateApiData();
    }


    async populateApiData() {
        const SaleInfo = JSON.parse(localStorage.getItem("SaleInfo"));
        const CustInfo = JSON.parse(localStorage.getItem("CustInfo"));        
        const searchValue = SaleInfo[0].salesId != "" ? "Y": "N" ;

        const response = await fetch(` https://localhost:44363/api/Order/CustSearchInfo?CustId=${searchValue}`, {
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
    static renderOrderTable(forecasts, state) {

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
        const Downloaddrawing = () => {
            return (
                <dl className="row no-gutters bg-F0 text-center">
                    <dt className="col-12"><h5>Download</h5></dt>
                    <dt className="col-3" ><button type="button" className="btn btn btn-success btn-sm">&nbsp;&nbsp; PDF &nbsp;&nbsp;</button> </dt>
                    <dt className="col-3" ><button type="button" className="btn btn btn-success btn-sm">&nbsp;&nbsp; DXF &nbsp;&nbsp;</button> </dt>
                    <dt className="col-3" ><button type="button" className="btn btn btn-success btn-sm">&nbsp;&nbsp; IGS &nbsp;&nbsp;</button> </dt>
                    <dt className="col-3" ><button type="button" className="btn btn btn-success btn-sm">&nbsp;&nbsp; STP &nbsp;&nbsp;</button> </dt>
                    <dt className="col-12">&nbsp;</dt><br />
                </dl>
            );
        };
        return (
            <main role="main" className="container-fluid"> <br />
                <PageTitle head={<h3>Gearbox + Motor</h3>} />
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <div id="accordion">
                            <div className="card">
                                <div className="card-header no-padding-TB" id="headingOne">
                                    <button className="btn btn-link accordionBtn " data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <legend>Select Motor</legend>
                                    </button>
                                </div>

                                <div id="collapseOne" className="collapse " aria-labelledby="headingOne" data-parent="#accordion">
                                    <div className="card-body">

                                        <ul class="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                                            <li class="nav-item">
                                                <a class=" nav-link active " id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Motor<br />Model</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Motor<br />Dimension</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Adapter<br />Part-No.</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content" id="pills-tabContent">
                                            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                                <dl className="row">
                                                    <dt className="col-3">
                                                        <label>Brand</label>
                                                    </dt>
                                                    <dd className="col-9">

                                                        <select name="month" className="form-control form-control-xs">
                                                            <option value="00"></option>
                                                            <option value="01">ABB</option>
                                                            <option value="02">ALLEN BRADLEY</option>
                                                            <option value="03">ALLEN BRADLEY</option>
                                                        </select>
                                                    </dd>
                                                    <dt className="col-3">
                                                        <label>Model</label>
                                                    </dt>
                                                    <dd className="col-9">
                                                        <select name="month" className="form-control form-control-xs">
                                                            <optgroup>
                                                                <option value="00"></option>
                                                                <option value="BMP0701F_PCD82+ATV32H037N4,ATV320U04N4"  >BMP0701F_PCD82+ATV32H037N4,ATV320U04N4</option>
                                                                <option value="8C1.1.30.1.xxxxxx.G.xxB">8C1.1.30.1.xxxxxx.G.xxB</option>
                                                                <option value="1326AB-A1G-11-xx">1326AB-A1G-11-xx</option>
                                                            </optgroup>
                                                        </select>
                                                    </dd>
                                                </dl>
                                                <dl className="row">
                                                    <dd className="col-12">
                                                        <div class="form-group">
                                                            <label for="inputKg">
                                                                <a href="#" data-toggle="modal" data-target="#motorInfoModal" >The max. Moment of Inertia of Application  <i class="fas fa-info-circle fa-lg"></i>
                                                                </a>

                                                                <div class="modal fade" id="motorInfoModal">
                                                                    <div class="modal-dialog modal-dialog-centered">
                                                                        <div class="modal-content">
                                                                            <div class="modal-header">
                                                                                <h4 class="modal-title">Information</h4>
                                                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                                            </div>
                                                                            <div class="modal-body">
                                                                                <dl className="row">
                                                                                    <dt className="col-2 text-danger">(*)</dt> <dd className="col-10 text-danger">Without giving the max. moment of inertia of application or giving a wrong value, the warranty could be invalid in case of a gearbox damage due to the back-drive torque from application. </dd>
                                                                                    <dt className="col-2 text-danger">(**)</dt> <dd className="col-10 text-danger">Material of AT series: Stainless<br />Material of ATB series: Carbon Steel with Phosphate<br />Material of AExxxS / AERxxxS series: Full Stainless</dd>
                                                                                </dl>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                            <input type="text" className="form-control" id="inputKg" placeholder="(Kg . cm2)" />
                                                            <small className="form-text  text-danger">To calculate the moment of inertia: <a href="https://www.apexdyna.com/dynamax.aspx" className="text-danger" target="_blank" > GO TO !!</a></small>
                                                        </div>
                                                    </dd>
                                                </dl>
                                                <dl className="row">
                                                    <dt className="col-12 text-center ">
                                                        <button type="button" className=" btn btn-success btn-sm">&nbsp;&nbsp;&nbsp; Check &nbsp;&nbsp;&nbsp;</button>
                                                    </dt>
                                                </dl>

                                            </div>
                                            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                <dl className="row">
                                                    <dt className="col-12 col-xl-6">
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend ">
                                                                <span class="input-group-text motor-Dimension">Mount Type</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <select class="form-control">
                                                                    <option value="N">Flange Mount</option>
                                                                    <option value="Y">Face Mount</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </dt>
                                                    <dt className="col-12 col-xl-6">
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend ">
                                                                <span class="input-group-text motor-Dimension">Motor Interface</span>
                                                            </div>
                                                            <div class="input-group-prepend">
                                                                <select class="form-control">
                                                                    <option value="N">Square</option>
                                                                    <option value="Y">Round</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </dt>
                                                </dl>
                                                <dl className="row">
                                                    <dd class="col-12 text-center">
                                                        <img src="http://www.apexdyna.com/weborder/image/moto_photo2.png" className="img-thumbnail" />
                                                    </dd>
                                                </dl>
                                                <dl className="row">
                                                    <dt className="col-12 text-center text-danger">* Required </dt>
                                                </dl>
                                                <dl className="row">
                                                    <dt className="col-8 input-group">
                                                        <select className="form-control bg-F0" >
                                                            <option value="" selected disabled>LA / LA1</option>
                                                            <option>LA</option>
                                                            <option>LA1</option>
                                                        </select>
                                                        <input type="text" className="form-control" />
                                                        <span className="text-danger">*</span>
                                                    </dt>
                                                </dl>
                                                <dl className="row">
                                                    <dt className="col-6 ">
                                                        <div class="input-group ">
                                                            <div class="input-group-prepend ">
                                                                <span class="input-group-text">LC</span>
                                                            </div>
                                                            <input type="text" className="form-control" />
                                                            <span className="text-danger">*</span>
                                                        </div>
                                                    </dt>
                                                    <dt className="col-6 ">
                                                        <div class="input-group ">
                                                            <div class="input-group-prepend ">
                                                                <span class="input-group-text">LZ</span>
                                                            </div>
                                                            <input type="text" className="form-control" />
                                                            <span className="text-danger">*</span>
                                                        </div>
                                                    </dt>
                                                </dl>
                                                <dl className="row">
                                                    <dt className="col-6">
                                                        <div class="input-group ">
                                                            <div class="input-group-prepend ">
                                                                <span class="input-group-text">LT</span>
                                                            </div>
                                                            <input type="text" className="form-control" />
                                                            <span>&nbsp;&nbsp;</span>
                                                        </div>
                                                    </dt>
                                                    <dt className="col-6 ">
                                                        <div class="input-group ">
                                                            <div class="input-group-prepend ">
                                                                <span class="input-group-text">LG</span>
                                                            </div>
                                                            <input type="text" className="form-control" />
                                                            <span>&nbsp;&nbsp;</span>
                                                        </div>
                                                    </dt>
                                                </dl>
                                                <dl className="row">
                                                    <dt className="col-6 ">
                                                        <div class="input-group ">
                                                            <div class="input-group-prepend ">
                                                                <span class="input-group-text">LB</span>
                                                            </div>
                                                            <input type="text" className="form-control" />
                                                            <span className="text-danger">*</span>
                                                        </div>
                                                    </dt>
                                                    <dt className="col-6 ">
                                                        <div class="input-group ">
                                                            <div class="input-group-prepend ">
                                                                <span class="input-group-text">S &nbsp;</span>
                                                            </div>
                                                            <input type="text" className="form-control" />
                                                            <span className="text-danger">*</span>
                                                        </div>
                                                    </dt>
                                                </dl>
                                                <dl className="row">
                                                    <dt className="col-6 ">
                                                        <div class="input-group ">
                                                            <div class="input-group-prepend ">
                                                                <span class="input-group-text">LR</span>
                                                            </div>
                                                            <input type="text" className="form-control" />
                                                            <span className="text-danger">*</span>
                                                        </div>
                                                    </dt>
                                                    <dt className="col-6 ">
                                                        <div class="input-group ">
                                                            <div class="input-group-prepend ">
                                                                <span class="input-group-text">LE</span>
                                                            </div>
                                                            <input type="text" className="form-control" />
                                                            <span>&nbsp;&nbsp;</span>
                                                        </div>
                                                    </dt>
                                                </dl>
                                                <dl className="row">
                                                    <dt className="col-12 text-center ">
                                                        <button type="button" className=" btn btn-success btn-sm">&nbsp;&nbsp;&nbsp; Check &nbsp;&nbsp;&nbsp;</button>
                                                    </dt>
                                                </dl>
                                            </div>
                                            <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                                <form>
                                                    <div class="form-group">
                                                        <label for="inputAdapter">Adapter Part-No.</label>
                                                        <input type="text" class="form-control" id="inputAdapter" />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="inputMotorShaft">Motor Shaft</label>
                                                        <input type="text" class="form-control" id="inputMotorShaft" />
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 text-center">
                                                            <button type="button" className=" btn btn-success btn-sm">&nbsp;&nbsp;&nbsp; Check &nbsp;&nbsp;&nbsp;</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <br />
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <div id="accordion2">
                            <div className="card">
                                <div className="card-header no-padding-TB" id="headingTwo">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link accordionBtn " data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                            <legend>Select Gearbox </legend>
                                        </button>
                                    </h5>
                                </div>

                                <div id="collapseTwo" className="collapse " aria-labelledby="headingOne" data-parent="#accordion2">
                                    <div className="card-body">
                                        <dl className="row">
                                            <dt className="col-12 text-center text-danger">If there is no motor information, to select gearbox only.</dt>
                                        </dl>
                                        <dl className="row">
                                            <dt className="col-12 text-center">
                                                <div class="btn-toolbar d-inline-block" role="toolbar" aria-label="Toolbar with button groups">
                                                    <div class="btn-group mr-2 " role="group" aria-label="First group">
                                                        <button type="button" class="btn btn-success btn-sm active"> &nbsp; Standard &nbsp;  &nbsp;</button>
                                                    </div>
                                                    <div class="btn-group mr-2" role="group" aria-label="Second group">
                                                        <button type="button" class="btn btn-warning btn-sm">Unlimited 1</button>
                                                    </div>
                                                    <div class="btn-group" role="group" aria-label="Third group">
                                                        <button type="button" class="btn btn-danger btn-sm">Unlimited 2</button>
                                                    </div>
                                                </div>
                                            </dt>
                                        </dl><br />
                                        <dl className="row">
                                            <dt className="col-6 col-sm-6 col-md-6">

                                                <a href="#" data-toggle="modal" data-target="#gearboxInfoModal"  > <label className="text-dark">Gearbox</label> <i class="fas fa-info-circle fa-lg"></i>
                                                </a>

                                                <div class="modal fade" id="gearboxInfoModal">
                                                    <div class="modal-dialog modal-dialog-centered">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h4 class="modal-title">Information</h4>
                                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <dl className="row">
                                                                    <dd className="col-12 text-danger">XXXXXXXXXXXXXXXX</dd>
                                                                </dl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <select name="month" className="form-control form-control-xs" disabled>
                                                    <option value="R01" selected="selected">AB Series</option>
                                                    <option value="R02">ABR Series</option>
                                                </select>
                                            </dt>
                                            <dt className="col-6 col-sm-6 col-md-6">
                                                <label>Model</label>
                                                <select name="month" className="form-control form-control-xs" disabled>
                                                    <option selected="selected" value="AB090">AB090</option>
                                                    <option value="AB090A">AB090A</option>
                                                </select>
                                            </dt>
                                        </dl>
                                        <dl className="row">
                                            <dt className="col-6 col-sm-6 col-md-6">
                                                <label>Ratio</label>
                                                <select name="month" className="form-control form-control-xs" disabled>
                                                    <option selected="selected" value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                            </dt>
                                            <dt className="col-6 col-sm-6 col-md-6">
                                                <label>Shaft Option</label>
                                                <select name="month" className="form-control form-control-xs" disabled>
                                                    <option selected="selected" value="S2">S2</option>
                                                    <option value="S3">S3</option>
                                                </select>
                                            </dt>
                                        </dl>
                                        <dl className="row">
                                            <dt className="col-6 col-sm-6 col-md-6">
                                                <label>Backlash</label>
                                                <select name="month" className="form-control form-control-xs" disabled>
                                                    <option value="P0">P0</option>
                                                    <option value="P1">P1</option>
                                                </select>
                                            </dt>
                                        </dl><br />
                                        <dl className="row">
                                            <dt className="col-12 text-center" >
                                                <button type="button" className=" btn btn-success btn-sm">&nbsp;&nbsp;&nbsp; Check &nbsp;&nbsp;&nbsp;</button>
                                            </dt>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <br />
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <div id="accordion3">
                            <div className="card">
                                <div className="card-header no-padding-TB" id="headingThree">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link accordionBtn " data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                            <legend> Result</legend>
                                        </button>
                                    </h5>
                                </div>

                                <div id="collapseThree" className="collapse " aria-labelledby="headingOne" data-parent="#accordion3">
                                    <div className="card-body">

                                        <dl className="row no-gutters">

                                            <dd class=" col-12 text-center">
                                                <img src="http://www.apexdyna.com/images/gearbox/pro_samll01.png" width="191" height="180" />
                                            </dd>

                                            <dt class="col-12 text-center">
                                                <h5 class="card-title">Ordering Code</h5>
                                                <h4 class="card-text"><span class="badge badge-primary">AB090 - 003 - S2 - P2 /</span></h4>
                                                <h4 class="card-text"><span class="badge badge-primary">ABB 8C1.1.30.1.xxxxxx.G.xxB</span></h4>
                                            </dt>

                                        </dl><br />
                                        <hr />
                                        <Downloaddrawing />
                                        <hr />
                                        <dl className="row no-gutters">
                                            <dt className="col-12"><h5>Bom</h5></dt>
                                            <dt className="col-3" >List</dt> <dd className="col-9">Spec</dd>
                                            <dt className="col-3" >Gearbox</dt> <dd className="col-9">AB090003S2P2 / A0100030122</dd>
                                            <dt className="col-3" >Adapter</dt> <dd className="col-9">AD-W90-M100-3 / S0401300503</dd>
                                            <dt className="col-3" >Fix Plate</dt> <dd className="col-9">[No need]</dd>
                                            <dt className="col-3" >Bushing</dt> <dd className="col-9">[No need]</dd>
                                            <dt className="col-3" >Screw </dt> <dd className="col-9">SW-1-M8X1.25P-L25 / 2111B108025</dd>
                                            <dt className="col-3" >Washer </dt> <dd className="col-9">WS-B1-D8 / 22120100501</dd>
                                        </dl><br />
                                        <hr />

                                        <dl className="row no-gutters  ">
                                            <dd className="col-12">
                                                <AccordionCt collapse="collapseGS" accordion="accordionGS" head={<dt className="col-12"><h5>Gearbox Specification</h5></dt>}
                                                    body={
                                                        <dl className="row">
                                                            <dt className="col-5" >Model </dt> <dd className="col-7">AB090 - 003 - S2 - P2</dd>
                                                            <dt className="col-5" >Ratio </dt> <dd className="col-7">3</dd>
                                                            <dt className="col-5" >Shaft Option </dt> <dd className="col-7">S2: Keyway</dd>
                                                            <dt className="col-5" >Backlash </dt> <dd className="col-7">P2: Standard Backlash</dd>
                                                            <dt className="col-5" >Output Torque</dt> <dd className="col-7">130 Nm</dd>
                                                            <dt className="col-5" >Rated Speed</dt> <dd className="col-7">4000 rpm</dd>
                                                            <dt className="col-5" >Max. Torque</dt> <dd className="col-7">234 Nm</dd>
                                                            <dt className="col-5" >Max. Speed</dt> <dd className="col-7">8000 rpm</dd>
                                                            <dt className="col-5" >Inertia</dt> <dd className="col-7">0.61 kgcm<font size="1"><sup>^2</sup></font></dd>
                                                            <dt className="col-5" >Weight </dt> <dd className="col-7">3.70 kg</dd>
                                                            <dt className="col-5" >No Load </dt> <dd className="col-7">0.67 Nm<sup><font color="red">(3)</font></sup></dd>
                                                        </dl>
                                                    }
                                                />
                                            </dd>
                                        </dl>
                                        <hr />
                                        <dl className="row no-gutters">
                                            <dd className="col-12">
                                                <AccordionCt head={<dt className="col-12"><h5>Motor Specification</h5></dt>} collapse="collapseMS" accordion="accordionMS"
                                                    body={
                                                        <div className="row">
                                                            <dt className="col-5" >Brand </dt> <dd className="col-7">ABB</dd>
                                                            <dt className="col-5" >Model </dt> <dd className="col-7">8C1.1.30.1.xxxxxx.G.xxB</dd>
                                                            <dt className="col-5" >Motor Shaft</dt> <dd className="col-7">19 mm</dd>
                                                            <dt className="col-5" >Output Power </dt> <dd className="col-7">0.38 Kw</dd>
                                                            <dt className="col-5" >Rated Speed </dt> <dd className="col-7">3000 rpm</dd>
                                                            <dt className="col-5" >Rated Torque</dt> <dd className="col-7">1.20 Nm</dd>
                                                            <dt className="col-5" >Max. Speed</dt> <dd className="col-7">3000 rpm</dd>
                                                            <dt className="col-5" >Peak Torque</dt> <dd className="col-7">4.60 Nm</dd>
                                                            <dt className="col-5" >Inertia</dt> <dd className="col-7">0.90 kgcm<font size="1"><sup>^2</sup></font></dd>
                                                        </div>
                                                    } />
                                            </dd>
                                        </dl>
                                        <hr />
                                        <dl className="row no-gutters bg-F0  text-danger  small">
                                            <dt className="col-2" >(*) </dt> <dd className="col-10">Without giving the max. moment of inertia of application or giving a wrong value, the warranty could be invalid in case of a gearbox damage due to the back-drive torque from application.</dd>
                                            <dt className="col-2" >Note (1) </dt> <dd className="col-10">The available piece-no. in stock is variable depending on incoming orders in the time.</dd>
                                            <dt className="col-2" >Note (2)</dt> <dd className="col-10">The gearboxes in stock are filled with standard grease. For non-standard grease or any customization please contact APEX.</dd>
                                            <dt className="col-2" >Note (3)</dt> <dd className="col-10">The values are measured by gearbox with ratio = 10 without loading at 3,000 rpm, or at the Nominal Input Speed(n<sub>1N</sub>).</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><br />
                <dl className="row">
                    <div className="offset-md-3 col-md-6">
                        <div id="accordion4">
                            <div className="card">
                                <div className="card-header no-padding-TB" id="headingFour">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link accordionBtn " data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                            <legend>Add to Order</legend>
                                        </button>
                                    </h5>
                                </div>

                                <div id="collapseFour" className="collapse " aria-labelledby="headingOne" data-parent="#accordion4">
                                    <div className="card-body">
                                        <dl className="row no-gutters">
                                            <dt className="col-9"><h5>Bom</h5></dt>  <dt className="col-3 text-right"><h5>Stock<sup className="text-danger">(1)</sup></h5></dt>
                                            <dt className="col-3" >List</dt> <dd className="col-6">Spec</dd><dd className="col-3"></dd>
                                            <dt className="col-3" >Gearbox</dt> <dd className="col-5">AB090003S2P2 / A0100030122</dd><dd className="col-4 text-right">{">"}100 pcs<sup className="text-danger" >(2)</sup></dd>
                                            <dt className="col-3" >Adapter</dt> <dd className="col-5">AD-W90-M100-3 / S0401300503</dd><dd className="col-4 text-right">Re-Stocking</dd>
                                            <dt className="col-3" >Fix Plate</dt> <dd className="col-6">[No need]</dd><dd className="col-3"></dd>
                                            <dt className="col-3" >Bushing</dt> <dd className="col-6">[No need]</dd><dd className="col-3"></dd>
                                            <dt className="col-3" >Screw </dt> <dd className="col-6">SW-1-M8X1.25P-L25 / 2111B108025</dd><dd className="col-3"></dd>
                                            <dt className="col-3" >Washer </dt> <dd className="col-6">WS-B1-D8 / 22120100501</dd><dd className="col-3"></dd>
                                        </dl><br />
                                        <dl className="row">
                                            <dt className="col-4">
                                                <label>Order Piece No.</label>
                                            </dt>
                                            <dd className="col-8">
                                                <input type="text" className="form-control" />
                                            </dd>
                                        </dl>
                                        <dl className="row">
                                            <dt className="col-4">
                                                <label>To Order No.</label>
                                            </dt>
                                            <dd className="col-8">
                                                <select className="form-control form-control-xs" >
                                                    <option value="AA00051004051/Heidelberg 00041980230">AA00051004051/Heidelberg 00041980230</option>
                                                    <option value="AA00051004052">AA00051004052</option>
                                                    <option value="AA00051004053">AA00051004053</option>
                                                </select>
                                            </dd>
                                        </dl>
                                        <dl className="row">
                                            <dt className="col-12 text-center">
                                                <button type="button" className=" btn btn-success btn-sm">&nbsp;&nbsp; &nbsp; Add to Order &nbsp; &nbsp;</button>
                                            </dt>
                                        </dl>
                                        <dl className="row">
                                            <dt className="col-12 text-center">
                                                <NewOrder btname="Add to New Order" />
                                            </dt>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </dl>
            </main>
        );
    }
}
