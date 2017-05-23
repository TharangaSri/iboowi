import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import moment from 'moment'

export default class DemographicData extends Component {

    renderAllergies() {
        const { patient } = this.props
        if (!patient.allergies) {
            return (
                <div>
                    None
                </div>
            )
        }

        if (patient.allergies.length === 0) {
            return (
                <div>
                    None
                </div>
            )
        }

        return (
            <div>
                <h4>Allergies</h4>
                {patient.allergies.map((allergy, i) => //{
                    (!_.isEmpty(allergy)) ?
                        <div key={i}>
                            <p>Substance : {allergy.drug.genericname ? allergy.drug.genericname : ''}</p>
                            <p>Sensitivity : {allergy.sensitivity ? allergy.sensitivity : ''}</p>
                        </div>
                        : 'None'
                )}
            </div>
        )
    }

    renderFamilyHistory() {
        const { patient } = this.props
        if (!patient.familyhistory) {
            return (
                <div>
                    <h4>Family History</h4>
                    None
                </div>
            )
        }

        if (patient.familyhistory.length === 0) {
            return (
                <div>
                    <h4>Family History</h4>
                    None
                </div>
            )
        }

        return (
            <div>
                <h4>Family History</h4>
                {patient.familyhistory.map((fh, i) =>
                    (!_.isEmpty(fh)) ?
                        <div key={i}>
                            <p>Condition : {fh.condition}</p>
                            <p>Relationship : {fh.relationship}</p>
                        </div>
                        : ''
                )}
            </div>
        )
    }

    render() {
        const { patient } = this.props
        //const isEmpty = patient.length === 0

        if (_.isEmpty(patient)) {
            return (
                <div>
                    Loading...
                </div>
            )
        }

        return (
            <div>
                <div className="col-lg-3">
                    <div className="ibox">
                        <div className="ibox-title">
                            <h5>Patient Demographic Data <small></small></h5>
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
                            <h4>Patient Information</h4>
                            <p>Patient : {patient.title} {patient.firstname} {patient.lastname}</p>
                            <p>Date of Birth : {moment(patient.birthdate).format("MMM Do YY") + ' (' + moment().diff(patient.birthdate, 'years') + ')'}</p>
                            <p>Gender : {patient.gender}</p>
                            <p>Marital Status : {patient.maritalstatus ? patient.maritalstatus : ''}</p>
                            <p>Bloodtype : {patient.bloodtype ? patient.bloodtype : ''}</p>
                            <p>Alcoholic : {patient.alcoholic ? patient.alcoholic === true ? 'Yes' : 'No' : ''}</p>
                            <p>Smoker : {patient.smoker ? patient.smoker === true ? 'Yes' : 'No' : ''}</p>

                            {this.renderAllergies()}

                            <h4>Post Medical History</h4>
                            {patient.postmedicalhistory ? patient.postmedicalhistory : 'None'}

                            <h4>Post Surgical History</h4>
                            {patient.postsurgicalhistory ? patient.postsurgicalhistory : 'None'}

                            {this.renderFamilyHistory()}

                            <h4>Contact Information</h4>
                            <p>Home : {patient.phones ? patient.phones.home : ''}</p>
                            <p>Mobile : {patient.phones ? patient.phones.mobile : ''}</p>
                            <p>Email : {patient.email ? patient.email : ''}</p>
                            <p>Street : {patient.address ? patient.address.street : ''}</p>
                            <p>City : {patient.address ? patient.address.city : ''}</p>
                            <p>Country : {patient.address ? patient.address.country : ''}</p>
                        </div>
                    </div>
                </div>
            </div>

            /*<Card>
                <CardTitle title="Demographic Data" subtitle="Patient demographic data." />

                <CardHeader style={{paddingBottom: 0}}
                    title={patient.title + ' ' + patient.firstname + ' ' + patient.lastname}
                    subtitle={moment().diff(patient.birthdate, 'years') + ' ' + patient.gender}
                    avatar={<Avatar backgroundColor={pink400}> {patient.firstname.charAt(0).toUpperCase() + patient.lastname.charAt(0).toUpperCase()} </Avatar>}
                    //avatar={'/images/' + patient.avatar}
                />
                <CardText style={{paddingTop: 0}}>
                    <h4>Patient Information</h4>
                    <p>Patient : {patient.title} {patient.firstname} {patient.lastname}</p>
                    <p>Date of Birth : {moment(patient.birthdate).format("MMM Do YY")}</p>
                    <p>Gender : {patient.gender}</p>
                    <p>Marital Status : {patient.maritalstatus}</p>
                    <p>Bloodtype : {patient.bloodtype}</p>
                    <p>Alcoholic : {patient.alcoholic ? patient.alcoholic === true ? 'Yes' : 'No' : ''}</p>
                    <p>Smoker : {patient.smoker ? patient.smoker === true ? 'Yes' : 'No' : ''}</p>

                    {this.renderAllergies()}

                    <h4>Post Medical History</h4>
                    {patient.postmedicalhistory}

                    <h4>Post Surgical History</h4>
                    {patient.postsurgicalhistory}

                    {this.renderFamilyHistory()}

                    <h4>Contact Information</h4>
                    <p>Home : {patient.phones ? patient.phones.home : ''}</p>
                    <p>Mobile : {patient.phones ? patient.phones.mobile : ''}</p>
                    <p>Email : {patient.email}</p>
                    <p>Street : {patient.address ? patient.address.street : ''}</p>
                    <p>City : {patient.address ? patient.address.city : ''}</p>
                    <p>Country : {patient.address ? patient.address.country : ''}</p>
                </CardText>
            </Card>*/
        )
    }
}