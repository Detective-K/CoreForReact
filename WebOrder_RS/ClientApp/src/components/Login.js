import React, { Component } from 'react';
import logo2 from '../Image/logo2.png'
//import { LoginCss } from '../css/Login.css';

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
        require("../css/Login.css");
        this.loginClick = this.loginClick.bind(this);
        localStorage.clear();
    }

    loginClick() {
        const feStr = {};
        feStr["SalesId"] = document.getElementById('login').value;
        feStr["Pwd"] = document.getElementById('password').value;
        feStr["CustId"] = document.getElementById('login').value;
        feStr["Pwd"] = document.getElementById('password').value;

        fetch("https://localhost:44363/api/Order/Login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feStr)
        }).then(function (res) {
            return res.json();
        }).then(function (JS) {
            if (JS["code"].toString() == "200") {
                localStorage.setItem("CustInfo", JSON.stringify(JS.custInfo));
                localStorage.setItem("SaleInfo", JSON.stringify(JS.saleInfo));
                window.location.href = "/";
            }
            alert(JS["message"].toString());

            console.log(JS);
        }).catch(error => console.error('Error:', error))
    }

    render() {
        return (
            <div >
                <div className="wrapper fadeInDown">
                    <div id="formContent">

                        <div className="fadeIn first">

                            <a className="navbar-brand top-navbar-brand" href="#"><img src={logo2} /> APEX</a>
                        </div>


                        <form>

                            <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" />
                            <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" />
                            <input type="button" onClick={this.loginClick} className="fadeIn fourth " value="Log In" />
                        </form>


                        <div id="formFooter">

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
