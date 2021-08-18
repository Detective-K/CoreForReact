import React, { Component } from 'react';

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        // 為了讓 `this` 能在 callback 中被使用，這裡的綁定是必要的：
        this.loginClick = this.loginClick.bind(this);
    }

    loginClick() {
        const feStr = {};
        feStr["SalesId"] = document.getElementById('login');
        feStr["Pwd"] = document.getElementById('password');
        feStr["CustId"] = document.getElementById('login');
        feStr["Pwd"] = document.getElementById('password');

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
                window.location.href = "index.html";
            }
            alert(JS["message"].toString());

            console.log(JS);
        }).catch(error => console.error('Error:', error))
    }

    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">

                    <div className="fadeIn first">

                        <a className="navbar-brand top-navbar-brand" href="#"><img src="http://192.168.150.33/AttendanceSystem/public/images/logo2.png" /> APEX</a>
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
        );
    }
}
