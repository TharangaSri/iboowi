import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import moment from 'moment'

import { loadPatientsByDoctor } from '../actions'

const loadData = ({ user, loadPatientsByDoctor }) => {
    loadPatientsByDoctor(user._id)
    //loadPatientsByDoctor('58d5e9faffaafca529eeb02c')
}

class Dashboard extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object,
        patients: PropTypes.array,
        loadPatientsByDoctor: PropTypes.func.isRequired
    }

    componentWillMount() {
        const { isAuthenticated } = this.props
        if (!isAuthenticated) {
            // Redirect to homepage
            browserHistory.push(`/login`)
        }
        else {
            loadData(this.props)
        }
    }

    componentWillReceiveProps(nextProps) {
        const { isAuthenticated } = nextProps
        const { isAuthenticated: wasAuthenticated } = this.props

        if (wasAuthenticated && !isAuthenticated) {
            // Redirect to homepage
            browserHistory.push(`/login`)
        }
    }

    handleChange = nextValue => {

    }

    handleRowSelection(rows) {
        if (rows.length !== 0) {
            const { patients } = this.props
            const patientId = patients[rows]._id
            window.console.debug('PatientId: ', patients[rows]._id)
            browserHistory.push(`patients/id/${patientId}`)
        }
    }

    handleRegisterClick = () => {
        browserHistory.push(`/patients/register`)
    }

    render() {

        const { patients, user } = this.props

        const isEmpty = patients.length === 0
        const len = patients.length

        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="ibox">
                    <div className="ibox-content">
                        <div className="row">
                            <div className="col-lg-12">

                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label className="control-label" htmlFor="product_name">NIC</label>
                                            <input type="text" id="product_name" name="product_name" value="" placeholder="NIC" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label className="control-label" htmlFor="price">Patient Name</label>
                                            <input type="text" id="price" name="price" value="" placeholder="Name" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label className="control-label" htmlFor="quantity">Phone #</label>
                                            <input type="text" id="quantity" name="quantity" value="" placeholder="Phone #" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            {/*<label className="control-label" htmlFor="add">Register Patient</label>*/}
                                            <button className="btn btn-primary" type="submit" style={{ width: '100%' }} onClick={this.handleRegisterClick}>Register Patient</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>NIC </th>
                                                <th>First Name </th>
                                                <th>Last Name</th>
                                                <th>Phone #</th>
                                                <th>Date of Birth</th>
                                                <th>City</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {patients.map((patient, i) =>
                                                <tr key={i}>
                                                    <td>{++i}</td>
                                                    <td>{patient.nic}</td>
                                                    <td>{patient.firstname}</td>
                                                    <td>{patient.lastname}</td>
                                                    <td>{patient.phones ? patient.phones.mobile ? patient.phones.mobile : '' : ''}</td>
                                                    <td>{moment(patient.birthdate).format("MMM DD YYYY")}</td>
                                                    <td>{
                                                        patient.address ? patient.address.city ? patient.address.city : '' : ''
                                                    }</td>
                                                    <td className="text-right">
                                                        <div className="btn-group">
                                                            <Link to={`/patients/id/${patient._id}`}><button className="btn-white btn btn-xs" >View</button></Link>
                                                            <Link to={`/patients/id/${patient._id}/edit`}><button className="btn-white btn btn-xs">Edit</button></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

}

const mapStateToProps = (state, ownProps) => {

    const {
        auth,
        patients
    } = state

    const { isAuthenticated, user } = auth

    return {
        isAuthenticated,
        user,
        patients
    }
}

export default connect(mapStateToProps, {
    loadPatientsByDoctor
})(Dashboard)