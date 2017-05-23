import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormSection, Field, reduxForm, FieldArray } from 'redux-form'
import { browserHistory } from 'react-router'
import { routerActions } from 'react-router-redux'

import SelectInput from '../components/SelectInput'
import VirtualizedSelectInput from '../components/VirtualizedSelectInput'

import { loadDrugs, loadDrugBrands, loadLabTests, saveDiagnosis } from '../actions'


const validate = values => {
    const errors = {}
    const requiredFields = ['medicalcondition', 'diagnosis', 'email', 'favoriteColor', 'notes']
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.prescription || !values.prescription.length) {
        //errors.members = { _error: 'At least one member must be entered' }
    } else {
        const prescriptionArrayErrors = []
        values.prescription.forEach((drug, drugIndex) => {
            const drugErrors = {}
            if (!drug || !drug.drugid) {
                drugErrors.drugid = 'Required'
                prescriptionArrayErrors[drugIndex] = drugErrors
            }
            return drugErrors
        })
        if (prescriptionArrayErrors.length) {
            errors.prescription = prescriptionArrayErrors
        }
    }

    if (!values.labtest || !values.labtest.length) {
        //errors.members = { _error: 'At least one member must be entered' }
    } else {
        const labtestArrayErrors = []
        values.labtest.forEach((test, testIndex) => {
            const testErrors = {}
            if (!test || !test.testid) {
                testErrors.testid = 'Required'
                labtestArrayErrors[testIndex] = testErrors
            }
            return testErrors
        })
        if (labtestArrayErrors.length) {
            errors.labtest = labtestArrayErrors
        }
    }

    return errors
}

const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const minValue0 = minValue(0)

const maxValue = max => value =>
    value && value > max ? `Must be less than ${max}` : undefined
const maxValue999 = maxValue(999)


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
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

const renderSelectFieldUnit = ({ input, label, meta: { touched, error } }) => (
    <div>
        <select {...input} placeholder={label} className="form-control">
            <option value=""></option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
        </select>
        <small className="text-danger">{touched && error && <span>{error}</span>}</small>
    </div>
)

const renderSelectFieldMeals = ({ input, label, meta: { touched, error } }) => (
    <div>
        <select {...input} className="form-control">
            <option value=""></option>
            <option value="a.c.">a.c.</option>
            <option value="p.c.">p.c.</option>
        </select>
        <small className="text-danger">{touched && error && <span>{error}</span>}</small>
    </div>
)

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
    return sleep(0)
        .then(() => {
            window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        })
}

const loadData = ({ loadDrugs, loadDrugBrands, loadLabTests }) => {
    loadDrugs()
    loadDrugBrands()
    loadLabTests()
}

let DiagnosisCard = class DiagnosisCard extends Component {

    static propTypes = {
        saveDiagnosis: PropTypes.func.isRequired,
        loadDrugs: PropTypes.func.isRequired,
        loadDrugBrands: PropTypes.func.isRequired,
        loadLabTests: PropTypes.func.isRequired
    }

    componentWillMount() {
        loadData(this.props)
    }

    handleSubmit(data) {
        const { patientid, user } = this.props
        data.patientid = patientid //'582aacff3894c3afd7ad4677'
        data.doctorid = '58d5e9faffaafca529eeb02c' //user._id  //'58d5e9faffaafca529eeb02c'
        data.locationid = '5892fd2500f0e261bd8d6a8e'
        data.addmissiondate = new Date()
        this.props.saveDiagnosis(data)
        routerActions.push('/patients/id/' + patientid)
        //browserHistory.push('/patients/id/582aacff3894c3afd7ad4677')
    }

    render() {
        const { drugs, brands, tests, handleSubmit, pristine, reset, submitting } = this.props

        return (
            <div>
                <div className="col-lg-9">
                    <div className="ibox">

                        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))} autoComplete="off" className="" role="form">
                            <div className="ibox-title">
                                <h5>Diagnose Patient <small>Patient diagnosis card captures vitals and diagnosis data of the patient.</small></h5>
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
                            <div className="ibox-content form-horizontal">

                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Vitals</label>
                                    <div className="col-sm-10">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <Field name="weight" label="Weight (Kg)" component={renderField} type="number" validate={[number, minValue0, maxValue999]} />
                                            </div>
                                            <div className="col-md-3">
                                                <Field name="height" label="Height (cm)" component={renderField} type="number" validate={[number, minValue0, maxValue999]} />
                                            </div>
                                            <div className="col-md-3">
                                                <Field name="temperature" label="Temp. (°F)" component={renderField} type="number" validate={[number, minValue0, maxValue999]} />
                                            </div>
                                            <div className="col-md-3">
                                                <Field name="bloodpressure" label="BP (mmHg)" component={renderField} type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="hr-line-dashed"></div>

                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Medical Condition</label>
                                    <div className="col-sm-10">
                                        <Field name="medicalcondition" component={renderTextAreaField} type="textarea" label="Medical Condition" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Diagnosis</label>
                                    <div className="col-sm-10">
                                        <Field name="diagnosis" component={renderTextAreaField} type="textarea" label="Diagnosis" />
                                    </div>
                                </div>

                                {/*<div className="hr-line-dashed"></div>*/}

                            </div>

                            <div className="ibox-title">
                                <h5>Drug Prescription <small>Prescribe patient drugs below.</small></h5>
                            </div>
                            <div className="ibox-content form-horizontal">
                                <FieldArray name="prescription" component={renderPrescription} drugs={drugs} brands={brands} />
                            </div>

                            <div className="ibox-title">
                                <h5>Test Prescription <small>Prescribe patient tests below.</small></h5>
                            </div>
                            <div className="ibox-content form-horizontal">
                                <FieldArray name="labtest" component={renderLabTest} tests={tests} />
                            </div>

                            {/*<div className="hr-line-dashed"></div>*/}
                            <div className="form-group">
                                <div className="">
                                    <button className="btn btn-primary" type="submit" style={{ width : '100%' }}>Save Patient Diagnosis Card</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const renderPrescription = ({ fields, drugs, brands }) => (
    <div>
        {fields.map((allergy, index) =>
            <div className="col-sm-12">
                <div key={index} className="row">
                    {/*<div className="col-md-1">
                    #{index + 1}
                </div>*/}
                    <div className="col-md-2">
                        <Field
                            name={`${allergy}.drugid`}
                            placeholder={'Brand'}
                            clearable={false}
                            component={VirtualizedSelectInput}
                            options={
                                brands.map((brand, index) => {
                                    return { value: brand._id, label: brand.genericname }
                                })
                            }
                        />
                    </div>

                    <div className="col-md-4">
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

                    <div className="col-md-2">
                        <Field
                            name={`${allergy}.when`}
                            placeholder={'When'}
                            clearable={false}
                            options={whenoptions}
                            component={VirtualizedSelectInput}
                        />
                    </div>

                    <div className="col-md-1">
                        <Field
                            name={`${allergy}.duration`}
                            component={renderField}
                            label=""
                            validate={[number, minValue0, maxValue999]}
                            type="number">
                        </Field>
                    </div>

                    <div className="col-md-1">
                        <Field
                            name={`${allergy}.durationunit`}
                            component={renderSelectFieldUnit}
                            label="Unit">
                        </Field>
                    </div>

                    <div className="col-md-1">
                        <Field
                            name={`${allergy}.meals`}
                            component={renderSelectFieldMeals}
                            label="Meals">
                        </Field>
                    </div>

                    <button className="btn btn-white" onClick={() => fields.remove(index)} ><i className="fa fa-trash"></i> </button>

                </div>

                <div className="hr-line-dashed"></div>

            </div>

        )}
        <div className="row">
            <div className="form-group">
                <div className="col-sm-4 col-sm-offset-2">
                    <button className="btn btn-primary" type="button" onClick={() => fields.push({})}>Add New Drug</button>
                </div>
            </div>
        </div>
    </div>
)

const renderLabTest = ({ fields, tests }) => (

    <div>
        {fields.map((labtests, index) =>
            <div key={index} className="col-sm-12">
                <div className="row">

                    <div className="col-md-3">
                        <Field
                            name={`${labtests}.testid`}
                            placeholder={'Test'}
                            clearable={false}
                            options={
                                tests.map((test, index) => {
                                    return { value: test._id, label: test.name }
                                })
                            }
                            component={SelectInput}
                        />
                    </div>

                    <div className="col-md-3">
                        <Field
                            name={`${labtests}.instructions`}
                            component={renderField}
                            label="Instructions"
                        >
                        </Field>
                    </div>

                    <button className="btn btn-white" onClick={() => fields.remove(index)} ><i className="fa fa-trash"></i> </button>
                </div>
                <div className="hr-line-dashed"></div>
            </div>
        )}

        <div className="row">
            <div className="form-group">
                <div className="col-sm-4 col-sm-offset-2">
                    <button className="btn btn-primary" type="button" onClick={() => fields.push({})}>Add New Test</button>
                </div>
            </div>
        </div>
    </div>
)



DiagnosisCard = reduxForm({
    form: 'DiagnosisCard',
    validate
})(DiagnosisCard)

const mapStateToProps = (state, ownProps) => {
    const { drugs, brands, tests, auth } = state

    const { user } = auth

    return { drugs, brands, tests, user }
}

DiagnosisCard = connect(mapStateToProps, {
    loadDrugs,
    loadDrugBrands,
    loadLabTests,
    saveDiagnosis
})(DiagnosisCard)

export default DiagnosisCard

const whenoptions = [
    { 'label': 'a.m.', 'value': 'a.m.' },
    { 'label': 'b.d.s', 'value': 'b.d.s' },
    { 'label': 'b.i.d.', 'value': 'b.i.d.' },
    { 'label': 'h.s.', 'value': 'h.s.' },
    { 'label': 'p.m.', 'value': 'p.m.' },
    { 'label': 'q.', 'value': 'q.' },
    { 'label': 'q.1.d.', 'value': 'q.1.d.' },
    { 'label': 'q.1.h.', 'value': 'q.1.h.' },
    { 'label': 'q.2.h.', 'value': 'q.2.h.' },
    { 'label': 'q.4.h.', 'value': 'q.4.h.' },
    { 'label': 'q.6.h.', 'value': 'q.6.h.' },
    { 'label': 'q.8.h.', 'value': 'q.8.h.' },
    { 'label': 'q.a.m.', 'value': 'q.a.m.' },
    { 'label': 'q.d.', 'value': 'q.d.' },
    { 'label': 'q.d.s.', 'value': 'q.d.s.' },
    { 'label': 'q.h.', 'value': 'q.h.' },
    { 'label': 'q.h.s.', 'value': 'q.h.s.' },
    { 'label': 'q.i.d', 'value': 'q.i.d' },
    { 'label': 'q.o.d.', 'value': 'q.o.d.' },
    { 'label': 'q.p.m.', 'value': 'q.p.m.' },
    { 'label': 'Stat.', 'value': 'Stat.' },
    { 'label': 't.d.s', 'value': 't.d.s' },
    { 'label': 't.i.d.', 'value': 't.i.d.' }
];