import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import _ from 'lodash'
import moment from 'moment'

import { loadPatient, loadPatientMedicalHistoryByDoctor } from '../actions'

import DemographicData from '../components/DemographicData'
import DiagnosisCard from '../components/DiagnosisCard'

const loadData = ({ patientid, user, loadPatient, loadPatientMedicalHistoryByDoctor }) => {
    loadPatient(patientid)
    loadPatientMedicalHistoryByDoctor(patientid, user._id)
    //loadPatientMedicalHistoryByDoctor(patientid, '58d5e9faffaafca529eeb02c')
}

class PatientPage extends Component {

    static propTypes = {
        patientid: PropTypes.string.isRequired,
        patient: PropTypes.object,
        loadPatient: PropTypes.func.isRequired,
        loadPatientMedicalHistoryByDoctor: PropTypes.func.isRequired
    }

    componentWillMount() {
        loadData(this.props)
    }

    componentWillReceiveProps(nextProps) {
        const { isAuthenticated, patients } = nextProps
        const { isAuthenticated: wasAuthenticated, patients: newpatients } = this.props

        if (wasAuthenticated && !isAuthenticated) {
            // Redirect to homepage
            browserHistory.push(`/login`)
        }

        if (nextProps.patientid !== this.props.patientid) {
            loadData(nextProps)
        }
    }

    handleRegisterClick = () => {
        browserHistory.push(`/patients/register`)
    }

    renderVitals(diagnoses) {
        //const { diagnoses } = this.props
        if (!diagnoses.vitals) {
            return null
        }

        return (
            <div>
                <p><b>Weight:</b> {diagnoses.vitals.weight ? diagnoses.vitals.weight + 'Kg' : ''} <b>Height:</b> {diagnoses.vitals.height ? diagnoses.vitals.height + 'cm' : ''} <b>Temperature:</b> {diagnoses.vitals.temperature ? diagnoses.vitals.temperature + '°F' : ''} <b>Blood Pressure:</b> {diagnoses.vitals.bloodpressure ? diagnoses.vitals.bloodpressure + 'mmHg' : ''}</p>
            </div>
        )
    }


    render() {
        const { patient, medicalhistory, patientid } = this.props
        const isEmpty = medicalhistory.length === 0

        if (_.isEmpty(patient)) {
            return (
                <div >
                </div>
            )
        }

        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Diagnose Patient</h2>
                        <ol className="breadcrumb">
                            <li>
                                <a href="/dashboard">Home</a>
                            </li>
                            {/*<li>
                            <a>Patient Library</a>
                        </li>*/}
                            <li className="active">
                                <strong>Diagnose Patient</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-2">

                    </div>
                </div>

                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">
                        <DemographicData {...this.props} />

                        <DiagnosisCard {...this.props} />

                        <div className="col-lg-12">
                            <div className="ibox">
                                <div className="ibox-title">
                                    <h5>Patient Medical History <small>Recent records of patient medical history</small></h5>
                                    <div className="ibox-tools">
                                        <a className="collapse-link">
                                            <i className="fa fa-chevron-up"></i>
                                        </a>
                                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                            <i className="fa fa-wrench"></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-user">
                                            <li><a href="#">Config option 1</a>
                                            </li>
                                            <li><a href="#">Config option 2</a>
                                            </li>
                                        </ul>
                                        <a className="close-link">
                                            <i className="fa fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="ibox-content no-padding">
                                    {isEmpty ? 
                                        <p> </p>
                                        :
                                        <ul className="list-group">
                                            {medicalhistory.map((diagnoses, i) =>
                                                <li key={i} className="list-group-item">

                                                    <p><a className="text-info" target="_blank" href={`/patients/${diagnoses.patientid}/diagnose/${diagnoses._id}`}>{diagnoses.doctor[0].name + ' : ' + diagnoses.location[0].name}</a> {'Patient visited ' + diagnoses.doctor[0].type + ' for ' + diagnoses.diagnosis}</p>
                                                    <small className="block text-muted"><i className="fa fa-clock-o"></i> {moment(diagnoses.addmissiondate).format("MMM DD YY")}</small>

                                                    {/*{this.renderVitals(diagnoses)}

                                                        <p><b>Medical Condition:</b> {diagnoses.medicalcondition}</p>

                                                        <p><b>Diagnosis:</b> {diagnoses.diagnosis}</p>

                                                        <p><b>Drugs:</b></p>

                                                        {diagnoses.prescription.map((pres, i) =>
                                                            (!_.isEmpty(pres)) ?
                                                                <div key={i}>
                                                                    #{i + 1} {pres.drug.genericname} - {pres.when} {pres.meals} {pres.duration} {pres.durationunit} {pres.addinstructions}<br />
                                                                </div>
                                                                :
                                                                <p key={i} style={{ marginBottom: 0 }}>None</p>
                                                        )}

                                                        <p><b>Tests:</b></p>

                                                        {diagnoses.labtest.map((test, i) =>
                                                            (!_.isEmpty(test)) ?
                                                                <div key={i}>
                                                                    {test.test.name}{test.instructions ? ' - ' + test.instructions : ''}<br />
                                                                </div>
                                                                :
                                                                'None'
                                                        )}*/}
                                                </li>
                                            )}
                                            {/*<li className="list-group-item">
                                            <p><a className="text-info" href="#">@Alan Marry</a> I belive that. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                            <small className="block text-muted"><i className="fa fa-clock-o"></i> 1 minuts ago</small>
                                        </li>*/}
                                        </ul>

                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const patientid = ownProps.params.patientid

    const {
                        auth,
        patient,
        medicalhistory
    } = state

    const { isAuthenticated, user } = auth

    return {
        isAuthenticated,
        patientid,
        user,
        patient,
        medicalhistory
    }
}

export default connect(mapStateToProps, {
    loadPatient,
    loadPatientMedicalHistoryByDoctor
})(PatientPage)
