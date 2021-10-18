import { faUserCheck } from '@fortawesome/fontawesome-free-solid';
import React, { Component } from 'react';
import { AccordionCt } from './AccordionCt';
import { NewOrder } from './NewOrder';
import Select from 'react-select';
import $ from 'jquery';
import moto_photo2 from '../Image/moto_photo2.png'
import moto_photo_YY from '../Image/moto_photo_YY.jpg'
import moto_photo_YN from '../Image/moto_photo_YN.jpg'
import moto_photo_NY from '../Image/moto_photo_NY.jpg'

export class Gearbox extends Component {
    static displayName = Gearbox.name;

    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
        let mountTypeData = [
            { value: 'N', label: 'Flange Mount' },
            { value: 'Y', label: 'Face Mount' }
        ];
        let motorIFData = [
            { value: 'N', label: 'Squaret' },
            { value: 'Y', label: 'Round' }
        ];
        let LZData = [
            { value: 'M3', label: 'M3' },
            { value: 'M4', label: 'M4' },
            { value: 'M5', label: 'M5' },
            { value: 'M6', label: 'M6' },
            { value: 'M8', label: 'M8' },
            { value: 'M10', label: 'M10' },
            { value: 'M12', label: 'M12' },
            { value: 'M14', label: 'M14' },
            { value: 'M18', label: 'M18' },
            { value: 'M20', label: 'M20' },
            { value: 'M22', label: 'M22' },
            { value: 'M24', label: 'M24' },
            { value: 'NO.4-40 UNC', label: 'NO.4-40 UNC' },
            { value: 'NO.5-40 UNC', label: 'NO.5-40 UNC' },
            { value: 'NO.6-32 UNC', label: 'NO.6-32 UNC' },
            { value: 'NO.8-32 UNC', label: 'NO.8-32 UNC' },
            { value: '10-24 UNC', label: '10-24 UNC' },
            { value: 'NO.12-24 UNC', label: 'NO.12-24 UNC' },
            { value: '1/4-20 UNC', label: '1/4-20 UNC' },
            { value: '5/16-28 UNC', label: '5/16-28 UNC' },
            { value: '3/8-16 UNC', label: '3/8-16 UNC' },
            { value: '7/16-14 UNC', label: '7/16-14 UNC' },
            { value: '1/2-13 UNC', label: '1/2-13 UNC' },
            { value: '9/16-12 UNC', label: '9/16-12 UNC' },
            { value: '5/8-11 UNC', label: '5/8-11 UNC' },
            { value: '3/4-10 UNC', label: '3/4-10 UNC' },
            { value: '7/8-9 UNC', label: '7/8-9 UNC' }
        ];

        let tabsIndex = 0;
        this.state = {
            mortorData: [], modelData: [],
            gearBoxData: [], gearBoxModelData: [],
            ratioData: [], shaftData: [],
            backlashData: [],
            mountTypeData: mountTypeData,
            motorIFData: motorIFData,
            isSale: "", select: { value: [] },
            gbSelect: { value: [] },
            gbModelSelect: { value: [] },
            ratioSelect: { value: [] },
            shaftSelect: { value: [] },
            backlashSelect: { value: [] },
            MT: "", MIF: "", LZData: LZData,
            range: 0,
            tabsIndex: tabsIndex
        };
        this.MortorHandleChange = this.MortorHandleChange.bind(this);
        this.tabsClick = this.tabsClick.bind(this);
        this.RangeClick = this.RangeClick.bind(this);
        this.ResultSearchClick = this.ResultSearchClick.bind(this);
    }

    componentDidMount() {
        this.populateApiData();
    }


    async populateApiData() {
        const feStr = {};
        const SaleInfo = JSON.parse(localStorage.getItem("SaleInfo"));
        const CustInfo = JSON.parse(localStorage.getItem("CustInfo"));
        feStr["isSale"] = SaleInfo[0].salesId != "" ? "Y" : "N";
        feStr["tcOek01"] = "";
        feStr["custId"] = CustInfo[0].custId;
        const searchValue = JSON.stringify(feStr);

        const response = await fetch(` https://localhost:44363/api/Order/GearBoxInit?feStr=${searchValue}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        let mortorOptions = data.mortorInfo.map((item, index) => ({ value: item.tcOek01, label: item.tcOek01 }));
        let gearBoxOptions = data.gearBoxInfo.map((item, index) => ({ value: item.tcMme01, label: item.tcMme02 }));

        this.setState({
            mortorData: mortorOptions, gearBoxData: gearBoxOptions
            , gbSelect: {
                value: gearBoxOptions.length != 0 ? gearBoxOptions[0] : { value: "", label: "" }
            }
            , isSale: SaleInfo[0].salesId != "" ? "Y" : "N"
        });
    }

    async MortorHandleChange(e) {
        this.state.mortorData.label = e.label;
        this.state.mortorData.value = e.value;

        this.ModelClear();
        this.GBModelClear();
        this.RatioClear();
        this.ShaftClear();
        this.BacklashClear();
        const CustInfo = JSON.parse(localStorage.getItem("CustInfo"));
        const feStr = {};
        feStr["isSale"] = this.state.isSale;
        feStr["tcOek01"] = e.value;
        feStr["custId"] = CustInfo[0].custId;
        const searchValue = JSON.stringify(feStr);

        const response = await fetch(` https://localhost:44363/api/Order/GearBoxInit?feStr=${searchValue}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        let modelOptions = data.modelInfo.map((item, index) => ({ value: item.tcOek02, label: item.tcOek02, interface_flag: item.tcOek27, show_flag: item.tcOek21 }));
        let gearBoxOptions = data.gearBoxInfo.map((item, index) => ({ value: item.tcMme01, label: item.tcMme02 }));
        this.setState({
            modelData: modelOptions, gearBoxData: gearBoxOptions, select: {
                value: modelOptions.length != 0 ? modelOptions[0] : { value: "", label: "" }
            }
            , gbSelect: {
                value: { value: "", label: "" }
            }
        });
    }

    GBHandleChange = async e => {
        this.GBSetValue(e);
        this.GBModelClear();
        this.RatioClear();
        this.ShaftClear();
        this.BacklashClear();
        const CustInfo = JSON.parse(localStorage.getItem("CustInfo"));
        let feStr = {};
        feStr["GBSeries"] = e.value;
        feStr["GBModel"] = "";
        feStr["Range"] = this.state.range;
        feStr["Ratio"] = "";
        feStr["isSale"] = this.state.isSale;
        feStr["custId"] = CustInfo[0].custId;
        switch (this.state.tabsIndex) {
            case 1:
                break;
            case 2:
                break;
            default:
                feStr["Brand"] = this.state.mortorData.label == undefined ? "" : this.state.mortorData.label;
                feStr["Spec"] = this.state.select.value.label == undefined ? "" : this.state.select.value.label;
                feStr["InertiaApp"] = !isNaN(document.getElementById("inputKg").value) ? document.getElementById("inputKg").value : "";
                break;
        }
        const searchValue = JSON.stringify(feStr);
        const response = await fetch(` https://localhost:44363/api/Order/GearBoxDetail?feStr=${searchValue}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        let gearBoxModelOptions = data.reducerInfo.map((item, index) => ({ value: item.tcMmd03, label: item.tcMmd03 }));
        let ratioOptions = data.ratioInfo.map((item, index) => ({ value: item.tcMmd04, label: item.tcMmd04 }));
        let shaftOptions = this.PublicOptions({ "name": "shaft", "item": data.backlashShaft.length == 0 ? "" : data.backlashShaft[0].tcMmd22 });
        let backlashOptions = this.PublicOptions({ "name": "backlash", "item": data.backlashShaft.length == 0 ? "" : data.backlashShaft[0].tcMmd23 });

        this.setState({
            gearBoxModelData: gearBoxModelOptions,
            gbModelSelect: {
                value: gearBoxModelOptions.length != 0 ? gearBoxModelOptions[0] : { value: "", label: "" }
            },
            ratioData: ratioOptions,
            ratioSelect: {
                value: ratioOptions.length != 0 ? ratioOptions[0] : { value: "", label: "" }
            },
            shaftData: shaftOptions,
            shaftSelect: {
                value: shaftOptions.length != 0 ? shaftOptions[0] : { value: "", label: "" }
            },
            backlashData: backlashOptions,
            backlashSelect: {
                value: backlashOptions.length != 0 ? backlashOptions[0] : { value: "", label: "" }
            }
        });
    }
    GBSetValue = value => {
        this.setState(prevState => ({
            gbSelect: {
                value
            }
        }));
    };
    GBClear = () => {
        this.GBSetValue(null);
        this.setState({
            gearBoxData: [],
            gbSelect: {
                value: { value: "", label: "" }
            }
        });
    };
    GBModelHandleChange = async e => {
        this.GBModelSetValue(e);
        this.RatioClear();
        this.ShaftClear();
        this.BacklashClear();
        const CustInfo = JSON.parse(localStorage.getItem("CustInfo"));
        let feStr = {}
        feStr["GBSeries"] = this.state.gbSelect.value.value;
        feStr["GBModel"] = e.value;
        feStr["Range"] = this.state.range;;
        feStr["Ratio"] = "";
        feStr["isSale"] = this.state.isSale;
        feStr["custId"] = CustInfo[0].custId;
        switch (this.state.tabsIndex) {
            case 1:
                break;
            case 2:
                break;
            default:
                feStr["Brand"] = this.state.mortorData.label == undefined ? "" : this.state.mortorData.label;
                feStr["Spec"] = this.state.select.value.label == undefined ? "" : this.state.select.value.label;
                feStr["InertiaApp"] = !isNaN(document.getElementById("inputKg").value) ? document.getElementById("inputKg").value : "";
                break;
        }
        const searchValue = JSON.stringify(feStr);
        const response = await fetch(` https://localhost:44363/api/Order/GearBoxDetail?feStr=${searchValue}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        let ratioOptions = data.ratioInfo.map((item, index) => ({ value: item.tcMmd04, label: item.tcMmd04 }));
        let shaftOptions = this.PublicOptions({ "name": "shaft", "item": data.backlashShaft.length == 0 ? "" :data.backlashShaft[0].tcMmd22 });
        let backlashOptions = this.PublicOptions({ "name": "backlash", "item": data.backlashShaft.length == 0 ? "" : data.backlashShaft[0].tcMmd23 });

        this.setState({
            ratioData: ratioOptions,
            ratioSelect: {
                value: ratioOptions.length != 0 ? ratioOptions[0] : { value: "", label: "" }
            },
            shaftData: shaftOptions,
            shaftSelect: {
                value: shaftOptions.length != 0 ? shaftOptions[0] : { value: "", label: "" }
            },
            backlashData: backlashOptions,
            backlashSelect: {
                value: backlashOptions.length != 0 ? backlashOptions[0] : { value: "", label: "" }
            }
        });
    };
    GBModelSetValue = value => {
        this.setState(prevState => ({
            gbModelSelect: {
                value
            }
        }));
    };
    GBModelClear = () => {
        this.GBModelSetValue(null);
        this.setState({
            gearBoxModelData: [],
            gbModelSelect: {
                value: { value: "", label: "" }
            }
        });
    };
    RatioHandleChange = async e =>
    {
        this.RatioSetValue(e);
        this.ShaftClear();
        this.BacklashClear();
        const CustInfo = JSON.parse(localStorage.getItem("CustInfo"));
        let feStr = {}
        feStr["GBSeries"] = this.state.gbSelect.value.value;
        feStr["GBModel"] = this.state.gbModelSelect.value.value;
        feStr["Range"] = this.state.range;;
        feStr["Ratio"] = e.value;
        feStr["isSale"] = this.state.isSale;
        feStr["custId"] = CustInfo[0].custId;
        switch (this.state.tabsIndex) {
            case 1:
                break;
            case 2:
                break;
            default:
                feStr["Brand"] = this.state.mortorData.label == undefined ? "" : this.state.mortorData.label;
                feStr["Spec"] = this.state.select.value.label == undefined ? "" : this.state.select.value.label;
                feStr["InertiaApp"] = !isNaN(document.getElementById("inputKg").value) ? document.getElementById("inputKg").value : "";
                break;
        }
        const searchValue = JSON.stringify(feStr);
        const response = await fetch(` https://localhost:44363/api/Order/GearBoxDetail?feStr=${searchValue}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        let shaftOptions = this.PublicOptions({ "name": "shaft", "item": data.backlashShaft.length == 0 ? "" : data.backlashShaft[0].tcMmd22 });
        let backlashOptions = this.PublicOptions({ "name": "backlash", "item": data.backlashShaft.length == 0 ? "" : data.backlashShaft[0].tcMmd23 });

        this.setState({
            shaftData: shaftOptions,
            shaftSelect: {
                value: shaftOptions.length != 0 ? shaftOptions[0] : { value: "", label: "" }
            },
            backlashData: backlashOptions,
            backlashSelect: {
                value: backlashOptions.length != 0 ? backlashOptions[0] : { value: "", label: "" }
            }
        });
    };
    RatioSetValue = value => {
        this.setState(prevState => ({
            ratioSelect: {
                value
            }
        }));
    };
    RatioClear = () => {
        this.RatioSetValue(null);
        this.setState({
            ratioData: [],
            ratioSelect: {
                value: { value: "", label: "" }
            }
        });
    };
    ShaftHandleChange = value => {
        this.ShaftSetValue(value);
    };
    ShaftSetValue = value => {
        this.setState(prevState => ({
            shaftSelect: {
                value
            }
        }));
    };
    ShaftClear = () => {
        this.ShaftSetValue(null);
        this.setState({
            shaftData: [],
            shaftSelect: {
                value: { value: "", label: "" }
            }
        });
    };
    BacklashHandleChange = value => {
        this.BacklashSetValue(value);
    };
    BacklashSetValue = value => {
        this.setState(prevState => ({
            backlashSelect: {
                value
            }
        }));
    };
    BacklashClear = () => {
        this.BacklashSetValue(null);
        this.setState({
            backlashData: [],
            backlashSelect: {
                value: { value: "", label: "" }
            }
        });
    };
    LZHandleChange(e) {
        this.state.LZData.label = e.label;
        this.state.LZData.value = e.value;
    }

    MountHandleChange(e) {
        this.state.mountTypeData.label = e.label;
        this.state.mountTypeData.value = e.value;
        this.setState({ MT: e.value });
    }
    MotorIFHandleChange(e) {
        this.state.motorIFData.label = e.label;
        this.state.motorIFData.value = e.value;
        this.setState({ MIF: e.value });
    }

    ModelHandleChange = value => {
        this.SetValue(value);
    };
    SetValue = value => {
        this.setState(prevState => ({
            select: {
                value
            }
        }));
    };
    ModelClear = () => {
        this.SetValue(null);
    };

    tabsClick = value => {
        this.setState({ tabsIndex: value });
    };
    RangeClick = value => {
        this.setState({ range: value });
        this.GBModelClear();
        this.RatioClear();
        this.ShaftClear();
        this.BacklashClear();
    }

    ResultSearchClick = async () =>
    {
        const CustInfo = JSON.parse(localStorage.getItem("CustInfo"));
        let feStr = {};
        feStr["Motor"] = { "Brand": this.state.mortorData.label, "Spec": this.state.select.value.label };
        feStr["GearBox"] = {
            "GBSeries": this.state.gbSelect.value.value, "GBModel": this.state.gbModelSelect.value.value,
            "Ratio": this.state.ratioSelect.value.value, "Shaft": this.state.shaftSelect.value.value,
            "Backlash": this.state.backlashSelect.value.value
        };
        feStr["custId"] = CustInfo[0].custId;
        feStr["isSale"] = this.state.isSale;
        const searchValue = JSON.stringify(feStr);
        const res = fetch(`https://localhost:44363/api/Order/GearBoxReSult?feStr=${searchValue}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json"
            } 
        });
    }

    PublicOptions = (e) => {
        let Options = [];
        switch (e.name) {
            case "shaft":
                if (e.item == "1") {
                    Options = [
                        { value: "S1", label: "S1" },
                        { value: "S2", label: "S2" }
                    ]
                }
                else if (e.item == "2") {
                    Options = [
                        { value: "S1", label: "S1" },
                        { value: "S2", label: "S2" },
                        { value: "S3", label: "S3" }
                    ]
                }
                else if (e.item == "3") {
                    Options = [
                        { value: "S1", label: "S1" },
                        { value: "S2", label: "S2" },
                        { value: "S3", label: "S3" },
                        { value: "S4", label: "S4" }
                    ]
                }
                break;
            case "backlash":
                if (e.item == "1") {
                    Options = [
                        { value: "P0", label: "P0" },
                        { value: "P1", label: "P1" },
                        { value: "P2", label: "P2" }
                    ]
                }
                break;
        };
        return Options;
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
        const { select } = this.state;
        const { gbModelSelect } = this.state;
        const { gbSelect } = this.state;
        const { ratioSelect } = this.state;
        const { shaftSelect } = this.state;
        const { backlashSelect } = this.state;
        let motorImgUrl;
        switch (this.state.MT) {
            case "Y":
                motorImgUrl = this.state.MIF == "Y" ? moto_photo_YY : moto_photo_NY;
                break;
            default:
                motorImgUrl = this.state.MIF == "Y" ? moto_photo_YN : moto_photo2;
                break;
        }
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

                                        <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item">
                                                <a className=" nav-link active " id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => this.tabsClick(0)} >Motor<br />Model</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => this.tabsClick(1)} >Motor<br />Dimension</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false" onClick={() => this.tabsClick(2)}>Adapter<br />Part-No.</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                                <dl className="row">
                                                    <dt className="col-3">
                                                        <label>Brand</label>
                                                    </dt>
                                                    <dd className="col-9">
                                                        <Select id="brandSel"
                                                            options={this.state.mortorData}
                                                            onChange={(e) => this.MortorHandleChange(e)} />
                                                    </dd>
                                                    <dt className="col-3">
                                                        <label>Model</label>
                                                    </dt>
                                                    <dd className="col-9">
                                                        <Select id="modelSel"
                                                            value={select.value}
                                                            options={this.state.modelData}
                                                            onChange={this.ModelHandleChange} />
                                                    </dd>
                                                </dl>
                                                <dl className="row">
                                                    <dd className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="inputKg">
                                                                <a href="#" data-toggle="modal" data-target="#motorInfoModal" >The max. Moment of Inertia of Application  <i className="fas fa-info-circle fa-lg"></i>
                                                                </a>

                                                                <div className="modal fade" id="motorInfoModal">
                                                                    <div className="modal-dialog modal-dialog-centered">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h4 className="modal-title">Information</h4>
                                                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                                            </div>
                                                                            <div className="modal-body">
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

                                            </div>
                                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                <dl className="row">
                                                    <dt className="col-12 col-xl-6">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend ">
                                                                <span className="input-group-text motor-Dimension">Mount Type</span>
                                                            </div>
                                                            <div className="form-control p-0">
                                                                <Select
                                                                    options={this.state.mountTypeData}
                                                                    defaultValue={this.state.mountTypeData[0]}
                                                                    onChange={e => this.MountHandleChange(e)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </dt>
                                                    <dt className="col-12 col-xl-6">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend ">
                                                                <span className="input-group-text motor-Dimension">Motor Interface</span>
                                                            </div>
                                                            <div className="form-control p-0">
                                                                <Select
                                                                    options={this.state.motorIFData}
                                                                    defaultValue={this.state.motorIFData[0]}
                                                                    onChange={e => this.MotorIFHandleChange(e)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </dt>
                                                </dl>
                                                <dl className="row">
                                                    <dd className="col-12 text-center">
                                                        <img src={motorImgUrl} className="img-thumbnail" />
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
                                                        <div className="input-group ">
                                                            <div className="input-group-prepend ">
                                                                <span className="input-group-text">LC</span>
                                                            </div>
                                                            <input type="text" className="form-control" />
                                                            <span className="text-danger">*</span>
                                                        </div>
                                                    </dt>
                                                    <dt className="col-6 ">
                                                        <div className="input-group ">
                                                            <div className="input-group-prepend ">
                                                                <span className="input-group-text">{this.state.MT != "Y" ? 'LZ' : 'LZ1'}</span>
                                                            </div>
                                                            {this.state.MT != "Y"
                                                                ? <input id="txtLZ" type="text" className="form-control" />
                                                                : <Select className="form-control bg-F0  p-0"
                                                                    options={this.state.LZData}
                                                                    defaultValue={this.state.LZData[0]}
                                                                    onChange={e => this.LZHandleChange(e)}
                                                                />
                                                            }
                                                            <span className="text-danger">*</span>
                                                        </div>
                                                    </dt>
                                                </dl>
                                                <dl className="row">
                                                    <dt className="col-6">
                                                        <div className="input-group ">
                                                            <div className="input-group-prepend ">
                                                                <span className="input-group-text">LT</span>
                                                            </div>
                                                            <input type="text" className="form-control" />
                                                            <span>&nbsp;&nbsp;</span>
                                                        </div>
                                                    </dt>
                                                    {this.state.MT != 'Y' &&
                                                        <dt className="col-6 ">
                                                            <div className="input-group ">
                                                                <div className="input-group-prepend ">
                                                                    <span className="input-group-text">LG</span>
                                                                </div>
                                                                <input type="text" className="form-control" />
                                                                <span>&nbsp;&nbsp;</span>
                                                            </div>
                                                        </dt>
                                                    }
                                                </dl>
                                                <dl className="row">
                                                    <dt className="col-6 ">
                                                        <div className="input-group ">
                                                            <div className="input-group-prepend ">
                                                                <span className="input-group-text">LB</span>
                                                            </div>
                                                            <input type="text" className="form-control" />
                                                            <span className="text-danger">*</span>
                                                        </div>
                                                    </dt>
                                                    <dt className="col-6 ">
                                                        <div className="input-group ">
                                                            <div className="input-group-prepend ">
                                                                <span className="input-group-text">S &nbsp;</span>
                                                            </div>
                                                            <input type="text" className="form-control" />
                                                            <span className="text-danger">*</span>
                                                        </div>
                                                    </dt>
                                                </dl>
                                                <dl className="row">
                                                    <dt className="col-6 ">
                                                        <div className="input-group ">
                                                            <div className="input-group-prepend ">
                                                                <span className="input-group-text">LR</span>
                                                            </div>
                                                            <input type="text" className="form-control" />
                                                            <span className="text-danger">*</span>
                                                        </div>
                                                    </dt>
                                                    <dt className="col-6 ">
                                                        <div className="input-group ">
                                                            <div className="input-group-prepend ">
                                                                <span className="input-group-text">LE</span>
                                                            </div>
                                                            <input type="text" className="form-control" />
                                                            <span>&nbsp;&nbsp;</span>
                                                        </div>
                                                    </dt>
                                                </dl>
                                            </div>
                                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="inputAdapter">Adapter Part-No.</label>
                                                        <input type="text" className="form-control" id="inputAdapter" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="inputMotorShaft">Motor Shaft</label>
                                                        <input type="text" className="form-control" id="inputMotorShaft" />
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
                                                <div className="btn-toolbar d-inline-block" role="toolbar" aria-label="Toolbar with button groups">
                                                    <div className="btn-group mr-2 " role="group" aria-label="First group">
                                                        <button type="button" className="btn btn-success btn-sm active" onClick={() => this.RangeClick(0)}> &nbsp; Standard &nbsp;  &nbsp;</button>
                                                    </div>
                                                    <div className="btn-group mr-2" role="group" aria-label="Second group">
                                                        <button type="button" className="btn btn-warning btn-sm" onClick={() => this.RangeClick(1)}>Unlimited 1</button>
                                                    </div>
                                                    <div className="btn-group" role="group" aria-label="Third group">
                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => this.RangeClick(2)}>Unlimited 2</button>
                                                    </div>
                                                </div>
                                            </dt>
                                        </dl><br />
                                        <dl className="row">
                                            <dt className="col-6 col-sm-6 col-md-6">

                                                <a href="#" data-toggle="modal" data-target="#gearboxInfoModal"  > <label className="text-dark">Gearbox</label> <i className="fas fa-info-circle fa-lg"></i>
                                                </a>

                                                <div className="modal fade" id="gearboxInfoModal">
                                                    <div className="modal-dialog modal-dialog-centered">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h4 className="modal-title">Information</h4>
                                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <dl className="row">
                                                                    <dd className="col-12 text-danger">XXXXXXXXXXXXXXXX</dd>
                                                                </dl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Select className=" form-control-xs p-0"
                                                    value={gbSelect.value}
                                                    options={this.state.gearBoxData}
                                                    onChange={this.GBHandleChange}
                                                />

                                            </dt>
                                            <dt className="col-6 col-sm-6 col-md-6">
                                                <label>Model</label>
                                                <Select className=" form-control-xs p-0"
                                                    value={gbModelSelect.value}
                                                    options={this.state.gearBoxModelData}
                                                    onChange={this.GBModelHandleChange}
                                                />
                                            </dt>
                                        </dl>
                                        <dl className="row">
                                            <dt className="col-6 col-sm-6 col-md-6">
                                                <label>Ratio</label>
                                                <Select className=" form-control-xs p-0"
                                                    value={ratioSelect.value}
                                                    options={this.state.ratioData}
                                                    onChange={this.RatioHandleChange}
                                                />
                                            </dt>
                                            <dt className="col-6 col-sm-6 col-md-6">
                                                <label>Shaft Option</label>
                                                <Select className=" form-control-xs p-0"
                                                    value={shaftSelect.value}
                                                    options={this.state.shaftData}
                                                    onChange={this.ShaftHandleChange}
                                                />
                                            </dt>
                                        </dl>
                                        <dl className="row">
                                            <dt className="col-6 col-sm-6 col-md-6">
                                                <label>Backlash</label>
                                                <Select className=" form-control-xs p-0"
                                                    value={backlashSelect.value}
                                                    options={this.state.backlashData}
                                                    onChange={this.BacklashHandleChange}
                                                />
                                            </dt>
                                        </dl><br />
                                        <dl className="row">
                                            <dt className="col-12 text-center" >
                                                <button type="button" className=" btn btn-success btn-sm" onClick={this.ResultSearchClick }>&nbsp;&nbsp;&nbsp; Check &nbsp;&nbsp;&nbsp;</button>
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

                                            <dd className=" col-12 text-center">
                                                <img src="http://www.apexdyna.com/images/gearbox/pro_samll01.png" width="191" height="180" />
                                            </dd>

                                            <dt className="col-12 text-center">
                                                <h5 className="card-title">Ordering Code</h5>
                                                <h4 className="card-text"><span className="badge badge-primary">AB090 - 003 - S2 - P2 /</span></h4>
                                                <h4 className="card-text"><span className="badge badge-primary">ABB 8C1.1.30.1.xxxxxx.G.xxB</span></h4>
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
                                                        <dl className="row">
                                                            <dt className="col-5" >Brand </dt> <dd className="col-7">ABB</dd>
                                                            <dt className="col-5" >Model </dt> <dd className="col-7">8C1.1.30.1.xxxxxx.G.xxB</dd>
                                                            <dt className="col-5" >Motor Shaft</dt> <dd className="col-7">19 mm</dd>
                                                            <dt className="col-5" >Output Power </dt> <dd className="col-7">0.38 Kw</dd>
                                                            <dt className="col-5" >Rated Speed </dt> <dd className="col-7">3000 rpm</dd>
                                                            <dt className="col-5" >Rated Torque</dt> <dd className="col-7">1.20 Nm</dd>
                                                            <dt className="col-5" >Max. Speed</dt> <dd className="col-7">3000 rpm</dd>
                                                            <dt className="col-5" >Peak Torque</dt> <dd className="col-7">4.60 Nm</dd>
                                                            <dt className="col-5" >Inertia</dt> <dd className="col-7">0.90 kgcm<font size="1"><sup>^2</sup></font></dd>
                                                        </dl>
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
