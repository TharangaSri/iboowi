import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, Location } from 'react-router';

class Navigation extends Component {

    componentDidMount() {
        const { menu } = this.refs;
        $(menu).metisMenu();
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    secondLevelActive(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <ul className="nav metismenu" id="side-menu" ref="menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element">
                            <span>
                                <img alt="image" className="img-circle" src="/img/profile_small.jpg" />
                            </span>
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">Dr. Demo</strong>
                                </span> <span className="text-muted text-xs block">General Practitioner<b className="caret"></b></span> </span> </a>
                            <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a href="#">Profile</a></li>
                                {/*<li><a href="#">Contacts</a></li>*/}
                                <li className="divider"></li>
                                <li><a href="#"> Logout</a></li>
                            </ul>
                        </div>
                        <div className="logo-element">
                            P33
                            </div>
                    </li>
                    <li className={this.activeRoute("/dashboard")}>
                        <Link to="/dashboard"><i className="fa fa-th-large"></i> <span className="nav-label">Dashboard</span></Link>
                    </li>

                    <li>
                        {/*<img alt="image" className="" src="/img/placeholder.png" />*/}
                    </li>
                    {/*<li className={this.activeRoute("/minor")}>
                        <Link to="/minor"><i className="fa fa-th-large"></i> <span className="nav-label">Minor view</span></Link>
                    </li>*/}
                </ul>

            </nav>
        )
    }
}

export default Navigation