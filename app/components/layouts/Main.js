import React, { Component } from 'react'
import { connect } from 'react-redux'
import Progress from '../common/Progress';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import TopHeader from '../common/TopHeader';
import { correctHeight, detectBody } from './Helpers';

class Main extends Component {

    render() {
        const { isAuthenticated } = this.props
        let wrapperClass = "gray-bg " + this.props.location.pathname;

        if (!isAuthenticated) {
            return (
                <div>
                    {this.props.children}
                </div>
            )
        }

        return (
            <div id="wrapper">
                <Progress />
                <Navigation location={this.props.location} />

                <div id="page-wrapper" className={wrapperClass}>

                    <TopHeader />

                    {this.props.children}

                    <Footer />

                </div>

            </div>

        )
    }

    componentDidMount() {

        // Run correctHeight function on load and resize window event
        $(window).bind("load resize", function () {
            correctHeight();
            detectBody();
        });

        // Correct height of wrapper after metisMenu animation.
        $('.metismenu a').click(() => {
            setTimeout(() => {
                correctHeight();
            }, 300)
        });
    }
}

function mapStateToProps(state, ownProps) {
    const {
        auth
    } = state

    const { isAuthenticated } = auth

    return {
        isAuthenticated
    }
}

export default connect(mapStateToProps, {    
})(Main)