import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);
        const CustInfo = JSON.parse(localStorage.getItem("CustInfo"));
        const SaleInfo = JSON.parse(localStorage.getItem("SaleInfo"));
        if (!CustInfo && !SaleInfo) {
            window.location.href = "/Login";
        }
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }


    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">APEX</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse " isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Order</NavLink>
                                </NavItem>
                                <NavItem className="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        DesignTool
                        </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <NavLink tag={Link} className="text-dark dropdown-item nav-link" to="/Gearbox">Gearbox</NavLink>
                                        <NavLink tag={Link} className="text-dark dropdown-item nav-link" to="/RackPinion">Rack / Pinion</NavLink>
                                        <NavLink tag={Link} className="text-dark dropdown-item nav-link" to="/GearboxRackPinion">Gearbox + Rack + Pinion</NavLink>
                                    </div>

                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/Counter">Counter</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/Fetch-data">Fetch data</NavLink>
                                </NavItem>

                                <form className="form-inline my-2 my-lg-0">
                                    <input className="btn btn-outline-success my-2 my-sm-0" formaction="/Login" value="Sing Out" type="submit" />
                                </form>
                            </ul>

                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
