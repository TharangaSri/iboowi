import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap';
import { smoothlyMenu } from '../layouts/Helpers';

class TopHeader extends Component {

    toggleNavigation(e) {
        e.preventDefault();
        $("body").toggleClass("mini-navbar");
        //$("body").toggleClass("fixed-sidebar fixed-nav mini-navbar")
        smoothlyMenu();
    }

    render() {
        return (
            <div className="row border-bottom">
                <nav className="navbar navbar-fixed-top white-bg" role="navigation" style={{ marginBottom: 0 }}>
                    <div className="navbar-header">
                        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " onClick={this.toggleNavigation} href="#"><i className="fa fa-bars"></i> </a>
                        {/*<form role="search" className="navbar-form-custom" action="search_results.html">
                            <div className="form-group">
                                <input type="text" placeholder="Search for something..." className="form-control" name="top-search" id="top-search" />
                            </div>
                        </form>*/}
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        <li>
                            <span className="m-r-sm text-muted welcome-message">Welcome to Pulse33 Dr. Demo</span>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-sign-out"></i> Log out
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default TopHeader