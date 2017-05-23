import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import _ from 'lodash'
import moment from 'moment'
import { loadPatient, loadPatientDiagnosis } from '../actions'

import DemographicData from '../components/DemographicData'

const loadData = ({ patientid, diagnosesid, loadPatient, loadPatientDiagnosis }) => {
    loadPatient(patientid)
    loadPatientDiagnosis(diagnosesid)
}

class PatientDiagnosePage extends Component {

    static propTypes = {
        patientid: PropTypes.string.isRequired,
        diagnosesid: PropTypes.string.isRequired,
        patient: PropTypes.object,
        diagnoses: PropTypes.object,
        loadPatient: PropTypes.func.isRequired,
        loadPatientDiagnosis: PropTypes.func.isRequired
    }

    componentWillMount() {
        loadData(this.props)
    }

    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            //this.handleGoClick()
        }
    }

    handleGoClick = () => {

    }

    renderVitals() {
        const { diagnoses } = this.props
        if (!diagnoses.vitals) {
            return null
        }

        return (
            <div>
                <p><b>Weight:</b> {diagnoses.vitals.weight ? diagnoses.vitals.weight : ''} <b>Height:</b> {diagnoses.vitals.height ? diagnoses.vitals.height : ''} <b>Temperature:</b> {diagnoses.vitals.temperature ? diagnoses.vitals.temperature : ''} <b>Blood Pressure:</b> {diagnoses.vitals.bloodpressure ? diagnoses.vitals.bloodpressure : ''}</p>
            </div>
        )
    }

    handlePrintClick = () => {
        //window.print();
        var content = document.getElementById("divcontents");
        var pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        // pri.document.close();
        // pri.focus();
        // pri.print();
        setTimeout(function () { // wait until all resources loaded 
            pri.document.close(); // necessary for IE >= 10
            pri.focus(); // necessary for IE >= 10
            pri.print(); // change window to winPrint
            pri.close(); // change window to winPrint
        }, 250);
    }

    render() {
        const { diagnoses } = this.props

        if (_.isEmpty(diagnoses)) {
            return null
        }

        return (
            <div>
                <iframe id="ifmcontentstoprint" style={{ height: '0px', width: '0px', position: 'absolute', fontFamily: 'Roboto, sans-serif' }}></iframe>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Patient Diagnosis Summary</h2>
                        <ol className="breadcrumb">
                            <li>
                                <a href="/dashboard">Home</a>
                            </li>
                            <li>
                                <a>Diagnose Patient</a>
                            </li>
                            <li className="active">
                                <strong>Patient Diagnosis Summary</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-2">

                    </div>
                </div>

                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">

                        <DemographicData {...this.props} />

                        <div className="col-lg-9">
                            <div className="ibox">
                                <div className="ibox-title">
                                    <h5>Patient Diagnosis <small>Summary of patient vitals and diagnosis</small></h5>
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
                                <div className="ibox-content">
                                    <div class="form-group"><label class="col-lg-2 control-label">Medical Condition</label>
                                        <div class="col-lg-10"><p class="form-control-static">{diagnoses.medicalcondition}</p></div>
                                    </div>
                                    <div class="form-group"><label class="col-lg-2 control-label">Diagnosis</label>
                                        <div class="col-lg-10"><p class="form-control-static">{diagnoses.diagnosis}</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-9">
                            <div className="ibox">
                                <div className="ibox-title">
                                    <h5>Patient Prescription <small>Prescription of drugs and tests prescribed to the patient</small></h5>
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
                                <div className="ibox-content">

                                    <div id="divcontents">
                                        <section>
                                            {/*<div>
                                                <img src="/images/pulse33qr.png" alt="" />
                                            </div>*/}
                                            {diagnoses.doctor.map((doc, i) =>
                                                <div key={i}>
                                                    <p>
                                                        {doc.name}< br />
                                                        {doc.address}<br />
                                                        Reg.: {doc.regno}<br />
                                                        Phone: {doc.number1}</p>
                                                </div>
                                            )}
                                        </section>
                                        <div style={{ clear: 'both' }}></div>

                                        {diagnoses.patient.map((patient, i) =>
                                            <div key={i}>
                                                <p>Patient's Name : {patient.title} {patient.firstname} {patient.lastname} (Age: {moment().diff(patient.birthdate, 'years')} yrs) <br />
                                                    Address : {patient.address ? patient.address.street ? patient.address.street : '' : ''}{patient.address ? patient.address.city ? ', ' + patient.address.city : '' : ''}{patient.address ? patient.address.country ? ', ' + patient.address.country : '' : ''}</p>
                                            </div>
                                        )}

                                        <p>Date: {moment(diagnoses.addmissiondate).format("MMM DD YY")}</p>

                                        <p>Prescription</p>
                                        <p>Drugs</p>
                                        {diagnoses.prescription.map((pres, i) =>
                                            (!_.isEmpty(pres)) ?
                                                <div key={i}>
                                                    #{i + 1} {pres.drug.genericname} - {pres.when} {pres.meals} {pres.duration} {pres.durationunit} {pres.addinstructions}<br />
                                                </div> :
                                                <p key={i} style={{ marginBottom: 0 }}>No drugs prescribed.</p>
                                        )}
                                        <p>{diagnoses.prescriptionremark ? 'Remark: ' + diagnoses.prescriptionremark : ''}</p>

                                        <p>Tests</p>
                                        {diagnoses.labtest.map((test, i) =>
                                            (!_.isEmpty(test)) ?
                                                <div key={i}>
                                                    {test.test.name}{test.instructions ? ' - ' + test.instructions : ''}<br />
                                                </div>
                                                :
                                                <p key={i} style={{ marginBottom: 0 }}>No tests prescribed.</p>
                                        )}

                                        {diagnoses.doctor.map((doc, i) =>
                                            <div key={i}>
                                                <p>
                                                    < br />
                                                    < br />
                                                    {doc.name}< br />
                                                    {doc.qualifications}
                                                </p>
                                            </div>
                                        )}

                                    </div>

                                    <div className="form-group">
                                        <div className="">
                                            <button className="btn btn-primary" type="submit" style={{ width: '100%' }} onClick={this.handlePrintClick}>Print Prescription</button>
                                        </div>
                                    </div>

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
    const diagnosesid = ownProps.params.diagnosesid

    const {
                    patient,
        diagnoses
    } = state

    return {
        patientid,
        diagnosesid,
        patient,
        diagnoses
    }
}

export default connect(mapStateToProps, {
    loadPatient,
    loadPatientDiagnosis
})(PatientDiagnosePage)