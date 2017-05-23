import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormSection, Field, FieldArray, reduxForm } from 'redux-form'
import { browserHistory } from 'react-router'
import { routerActions } from 'react-router-redux'

import { loadDrugs, updatePatient, loadPatientInfo } from '../actions'

import VirtualizedSelectInput from '../components/VirtualizedSelectInput'

const validate = values => {
    const errors = {}
    const requiredFields = ['firstname', 'lastname', 'birthdate', 'gender', 'title']
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.allergies || !values.allergies.length) {
        //errors.members = { _error: 'At least one member must be entered' }
    } else {
        const allergiesArrayErrors = []
        values.allergies.forEach((allergy, allergyIndex) => {
            const allergyErrors = {}
            if (!allergy || !allergy.drugid) {
                allergyErrors.drugid = 'Required'
                allergiesArrayErrors[allergyIndex] = allergyErrors
            }
            if (!allergy || !allergy.sensitivity) {
                allergyErrors.sensitivity = 'Required'
                allergiesArrayErrors[allergyIndex] = allergyErrors
            }
            return allergyErrors
        })
        if (allergiesArrayErrors.length) {
            errors.allergies = allergiesArrayErrors
        }
    }

    if (!values.familyhistory || !values.familyhistory.length) {
        //errors.members = { _error: 'At least one member must be entered' }
    } else {
        const familyhistoryArrayErrors = []
        values.familyhistory.forEach((history, historyIndex) => {
            const historyErrors = {}
            if (!history || !history.condition) {
                historyErrors.condition = 'Required'
                familyhistoryArrayErrors[historyIndex] = historyErrors
            }
            if (!history || !history.relationship) {
                historyErrors.relationship = 'Required'
                familyhistoryArrayErrors[historyIndex] = historyErrors
            }
            return historyErrors
        })
        if (familyhistoryArrayErrors.length) {
            errors.familyhistory = familyhistoryArrayErrors
        }
    }

    return errors
}

const renderTextField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <input {...input} placeholder={label} type={type} className="form-control" />
        <small className="text-danger">{touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </small>
    </div>
)

const renderTextAreaField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <textarea {...input} placeholder={label} type={type} className="form-control" />
        <small className="text-danger">{touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </small>
    </div>
)

const renderSelectFieldTitle = ({ input, label, meta: { touched, error } }) => (
    <div>
        <select {...input} placeholder={label} className="form-control">
            <option value=""></option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Miss.">Miss.</option>
            <option value="Rev.">Rev.</option>
            <option value="Ms.">Ms.</option>
        </select>
        <small className="text-danger">{touched && error && <span>{error}</span>}</small>
    </div>
)

const renderSelectFieldMS = ({ input, label, meta: { touched, error } }) => (
    <div>
        <select {...input} placeholder={label} className="form-control">
            <option value=""></option>
            <option value="Married">Married</option>
            <option value="Single">Single</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
        </select>
        <small className="text-danger">{touched && error && <span>{error}</span>}</small>
    </div>
)

const renderSelectFieldBloodType = ({ input, label, meta: { touched, error } }) => (
    <div>
        <select {...input} placeholder={label} className="form-control">
            <option value=""></option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A–">A–</option>
            <option value="B+">B+</option>
            <option value="B–">B–</option>
            <option value="AB+">AB+</option>
            <option value="AB–">AB–</option>
        </select>
        <small className="text-danger">{touched && error && <span>{error}</span>}</small>
    </div>
)

const renderSelectFieldCountry = ({ input, label, meta: { touched, error } }) => (
    <div>
        <select {...input} placeholder={label} className="form-control">
            <option value=""></option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Australia">Australia</option>
        </select>
        <small className="text-danger">{touched && error && <span>{error}</span>}</small>
    </div>
)


class renderRadioGroup extends Component {
    render() {
        const { input, meta, options } = this.props
        const hasError = meta.touched && meta.error;

        return (
            <div>
                {options.map(o =>
                    <div className="i-checks">
                        <label key={o.value}><input type="radio" {...input} value={o.value} checked={o.value === input.value} /> {o.title}</label>
                    </div>
                )}

                {hasError && <small className="text-danger"><span>{meta.error}</span></small>}
            </div>
        );
    }
}


const text = value => value && /[^a-zA-Z]+/.test(value) ? 'Must be text' : undefined

const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

const max10 = value => value && value.length > 10 ? 'NIC cannot exceed 10 characters' : undefined

const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined

const minValue0 = minValue(0)

const maxValue = max => value =>
    value && value > max ? `Must be less than ${max}` : undefined

const maxValue999 = maxValue(999)

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const loadData = ({ loadDrugs, loadPatientInfo, patientid }) => {
    loadDrugs()
    loadPatientInfo(patientid)
}

let PatientEditPage = class PatientEditPage extends Component {

    static propTypes = {
        updatePatient: PropTypes.func.isRequired,
        loadDrugs: PropTypes.func.isRequired,
        loadPatientInfo: PropTypes.func.isRequired
    }

    componentWillMount() {
        loadData(this.props)
    }

    handleSubmit(data) {
        const { patientid } = this.props
        data.avatar = 'no-avatar.jpg'
        data.doctorid = this.props.user._id
        delete data._id
        //console.log(data)
        ///data._id = patientid

        let patientRegisterPromise = this.props.updatePatient(data, patientid)

        patientRegisterPromise.then(function (result) {
            browserHistory.push(`/`)
        })
    }

    handleSubmitWithDiagnose(data) {
        const { patientid } = this.props
        data.avatar = 'no-avatar.jpg'
        data.doctorid = this.props.user._id
        delete data._id

        let patientRegisterPromise = this.props.updatePatient(data, patientid)

        patientRegisterPromise.then(function (result) {
            //console.log('result: ', result)
            //browserHistory.push(`/patients/id/` + result._id)
            browserHistory.push(`/patients/id/` + patientid)
        })
    }

    handleSelection = (values, name) => this.setState({ [name]: values })

    render() {
        const { drugs, handleSubmit, pristine, reset, submitting, fields } = this.props

        return (
            <div>
                <div className="row wrapper border-bottom white-bg page-heading">
                    <div className="col-lg-10">
                        <h2>Edit Patient</h2>
                        <ol className="breadcrumb">
                            <li>
                                <a href="/dashboard">Home</a>
                            </li>
                            <li className="active">
                                <strong>Edit Patient</strong>
                            </li>
                        </ol>
                    </div>
                    <div className="col-lg-2">

                    </div>
                </div>

                <div className="wrapper wrapper-content animated fadeInRight">
                    <form autoComplete="off" className="">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="ibox">
                                    <div className="ibox-title">
                                        <h5>Patient Demographic Data <small></small></h5>
                                    </div>
                                    <div className="ibox-content">

                                        <div className="form-group">
                                            <label class="col-lg-2 control-label">NIC</label>
                                            <Field name="nic" component={renderTextField} validate={[max10]} label="National ID" />
                                        </div>
                                        <div className="form-group">
                                            <label class="col-lg-2 control-label">Title</label>
                                            <Field name="title" component={renderSelectFieldTitle} label="Title" />
                                        </div>
                                        <div className="form-group">
                                            <label class="col-lg-2 control-label">First Name</label>
                                            <Field name="firstname" component={renderTextField} validate={[text]} label="First Name" />
                                        </div>
                                        <div className="form-group">
                                            <label class="col-lg-2 control-label">Last Name</label>
                                            <Field name="lastname" component={renderTextField} validate={[text]} label="Last Name" />
                                        </div>
                                        <div className="form-group">
                                            <label class="col-lg-2 control-label">Date of birth</label>
                                            <Field name="birthdate" component={renderTextField} label="Date of birth" />
                                        </div>
                                        <div className="form-group">
                                            <label class="col-lg-2 control-label">Gender</label>
                                            <Field name="gender" component={renderRadioGroup} options={[
                                                { title: 'Male', value: 'Male' },
                                                { title: 'Female', value: 'Female' }
                                            ]} />
                                        </div>
                                        <div className="form-group">
                                            <label class="col-lg-2 control-label">Marital Status</label>
                                            <Field name="maritalstatus" component={renderSelectFieldMS} label="Marital Status" />
                                        </div>
                                        <div className="form-group">
                                            <label class="col-lg-2 control-label">Blood Type</label>
                                            <Field name="bloodtype" component={renderSelectFieldBloodType} label="Blood Type" />
                                        </div>
                                        <div className="form-group">
                                            <div className="i-checks"><label>
                                                <Field
                                                    name="alcoholic"
                                                    id="alcoholic"
                                                    component="input"
                                                    type="checkbox"
                                                />
                                                <i></i> Alcoholic </label></div>

                                            <div className="i-checks"><label>
                                                <Field
                                                    name="smoker"
                                                    id="smoker"
                                                    component="input"
                                                    type="checkbox"
                                                />
                                                <i></i> Smoker </label></div>
                                        </div>
                                        <FormSection name="phones">
                                            <div className="form-group">
                                                <label class="col-lg-2 control-label">Home #</label>
                                                <Field name="home" component={renderTextField} validate={[number]} label="Home" />
                                            </div>
                                            <div className="form-group">
                                                <label class="col-lg-2 control-label">Mobile #</label>
                                                <Field name="mobile" component={renderTextField} validate={[number]} label="Mobile" />
                                            </div>
                                        </FormSection>
                                        <div className="form-group">
                                            <label class="col-lg-2 control-label">Email</label>
                                            <Field name="email" component={renderTextField} label="Email" />
                                        </div>
                                        <FormSection name="address">
                                            <div className="form-group">
                                                <label class="col-lg-2 control-label">Street</label>
                                                <Field name="street" component={renderTextField} label="Street" />
                                            </div>
                                            <div className="form-group">
                                                <label class="col-lg-2 control-label">City</label>
                                                <Field name="city" component={renderTextField} label="City" />
                                            </div>
                                            <div className="form-group">
                                                <label class="col-lg-2 control-label">Country</label>
                                                <Field name="country" component={renderSelectFieldCountry} label="Country" />
                                            </div>
                                        </FormSection>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-9">
                                <div className="ibox">
                                    <div className="ibox-title">
                                        <h5>Patient Allergies <small>Please fill in any allergy conditions the patient might have.</small></h5>
                                    </div>
                                    <div className="ibox-content">
                                        <FieldArray name="allergies" component={renderAllergies} drugs={drugs} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-9">
                                <div className="ibox">
                                    <div className="ibox-title">
                                        <h5>Post Medical History <small>Please enter patient post medical history</small></h5>
                                    </div>
                                    <div className="ibox-content">
                                        <div className="form-group">
                                            <Field name="postmedicalhistory" component={renderTextAreaField} type="textarea" label="Post Medical History" />
                                        </div>
                                    </div>

                                    <div className="ibox-title">
                                        <h5>Post Surgical History <small>Please enter patient post surgical history</small></h5>
                                    </div>
                                    <div className="ibox-content">
                                        <div className="form-group">
                                            <Field name="postsurgicalhistory" component={renderTextAreaField} type="textarea" label="Post Surgical History" />
                                        </div>
                                    </div>

                                    <div className="ibox-title">
                                        <h5>Patient Family History <small>Please enter patient family conditions</small></h5>
                                    </div>
                                    <div className="ibox-content">
                                        <FieldArray name="familyhistory" component={renderFamilyHistory} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div class="col-sm-4 col-sm-offset-2">
                                    <button className="btn btn-primary" type="submit" onClick={handleSubmit(this.handleSubmitWithDiagnose.bind(this))}>Update Patient & Diagnose</button>
                                    <button className="btn btn-white" type="submit" onClick={handleSubmit(this.handleSubmit.bind(this))}>Update Patient</button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const renderAllergies = ({ fields, drugs }) => (
    <div>
        {fields.map((allergy, index) =>

            <div key={index} className="col-sm-12">
                <div className="row">

                    <div className="col-md-5">
                        <Field
                            name={`${allergy}.drugid`}
                            placeholder={'Generic'}
                            clearable={false}
                            options={
                                drugs.map((drug, index) => {
                                    return { value: drug._id, label: drug.genericname }
                                })
                            }
                            optionHeight={80}
                            component={VirtualizedSelectInput}
                        />
                    </div>
                    {/*<div>
                    <Field name={`${allergy}.sensitivity`}
                        component={SelectField}
                        hintText="Sensitivity" fullWidth={false}>
                        <MenuItem value="High" primaryText="High" />
                        <MenuItem value="Medium" primaryText="Medium" />
                        <MenuItem value="Low" primaryText="Low" />
                    </Field>
                </div>*/}
                    <button className="btn btn-white" onClick={() => fields.remove(index)} ><i className="fa fa-trash"></i> </button>
                </div>
                <div className="hr-line-dashed"></div>
            </div>
        )}

        <div className="row">
            <div className="form-group">
                <div className="col-sm-4 col-sm-offset-2">
                    <button className="btn btn-primary" type="button" onClick={() => fields.push({})}>Add Allergy</button>
                </div>
            </div>
        </div>

    </div>
)

const renderFamilyHistory = ({ fields }) => (
    <div>
        {fields.map((history, index) =>
            <div key={index} className="col-sm-12">
                <div className="row">
                    <div className="col-md-3">
                        <Field
                            name={`${history}.condition`}
                            type="text"
                            component={renderTextField}
                            label="Condition" />
                    </div>
                    <div className="col-md-3">
                        <Field
                            name={`${history}.relationship`}
                            type="text"
                            component={renderTextField}
                            label="Relationship" />
                    </div>
                    <button className="btn btn-white" onClick={() => fields.remove(index)} ><i className="fa fa-trash"></i> </button>

                    <div className="hr-line-dashed"></div>
                </div>
            </div>
        )}

        <div className="row">
            <div className="form-group">
                <div className="col-sm-4 col-sm-offset-2">
                    <button className="btn btn-primary" type="button" onClick={() => fields.push({})}>Add Condition</button>
                </div>
            </div>
        </div>

    </div>
)

PatientEditPage = reduxForm({
    form: 'PatientEditPage',
    validate,
    enableReinitialize: true
})(PatientEditPage)

const mapStateToProps = (state, ownProps) => {
    const patientid = ownProps.params.patientid

    const { drugs, patient, auth } = state

    const { user } = auth

    return {
        patientid,
        drugs,
        initialValues: patient,
        user
        //initialValues: { nic: patient.nic }
    }
}

PatientEditPage = connect(mapStateToProps, {
    loadDrugs,
    updatePatient,
    loadPatientInfo
})(PatientEditPage)

export default PatientEditPage