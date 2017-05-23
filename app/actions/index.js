import { CALL_API } from '../middleware/api'
import { browserHistory } from 'react-router'

//const API_ROOT = 'http://localhost:3292/api/'
//const API_ROOT = 'http://pulse-server.ap-southeast-1.elasticbeanstalk.com/api/'
const API_ROOT = 'http://lowCost-env.g7ch9fekq9.us-east-1.elasticbeanstalk.com/api/'

// ----------------------------------------------------- //

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user: user.profile,
    id_token: user.token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function loginUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds)
  }

  return dispatch => {
    dispatch(requestLogin(creds))
    return fetch(API_ROOT + 'auth/doctors/login', config)
      .then(response =>
        response.json()
          .then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          !Array.isArray(user.message) ? dispatch(loginError(user.message)) : dispatch(loginError(user.message[0].msg))
          return Promise.reject(user)
        }
        else {
          localStorage.setItem('profile', JSON.stringify(user.profile))
          localStorage.setItem('id_token', user.token)
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}


export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
    dispatch(receiveLogout())
  }
}

// ----------------------------------------------------- //

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

function requestRegister(patientdata) {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    patientdata
  }
}

function receiveRegister(patientdata) {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    patientdata
  }
}

function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    message
  }
}

export function registerPatient(patientdata) {
  //console.log('Register Patient', patientdata)  
  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patientdata)
  }

  return dispatch => {
    dispatch(requestRegister(patientdata))
    return fetch(API_ROOT + 'patients', config)
      .then(response =>
        response.json()
          .then(register => ({ register, response }))
      ).then(({ register, response }) => {
        if (!response.ok) {
          //!Array.isArray(register.message) ? dispatch(registerError(register.message)) : dispatch(registerError(register.message[0].msg))    
          return Promise.reject(register)
        }
        else {
          //console.log('Reg:', register)
          dispatch(receiveRegister(register))
          return Promise.resolve(register)
          //dispatch(receiveRegister())
          //dispatch(loginUser(creds))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// ----------------------------------------------------- //

export const UPDATE_PATIENT_REQUEST = 'UPDATE_PATIENT_REQUEST'
export const UPDATE_PATIENT_SUCCESS = 'UPDATE_PATIENT_SUCCESS'
export const UPDATE_PATIENT_FAILURE = 'UPDATE_PATIENT_FAILURE'

function requestUpdate(patientdata) {
  return {
    type: UPDATE_PATIENT_REQUEST,
    isFetching: true,
    patientdata
  }
}

function receiveUpdate(patientdata) {
  return {
    type: UPDATE_PATIENT_SUCCESS,
    isFetching: false,
    patientdata
  }
}

function updateError(message) {
  return {
    type: UPDATE_PATIENT_FAILURE,
    isFetching: false,
    message
  }
}

export function updatePatient(patientdata, id) {
  //console.log('Update Patient', patientdata)
  let config = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patientdata)
  }

  return dispatch => {
    dispatch(requestUpdate(patientdata))
    return fetch(API_ROOT + 'patients/' + id, config)
      .then(response =>
        response.json()
          .then(register => ({ register, response }))
      ).then(({ register, response }) => {
        if (!response.ok) {
          //!Array.isArray(register.message) ? dispatch(registerError(register.message)) : dispatch(registerError(register.message[0].msg))    
          return Promise.reject(register)
        }
        else {
          //console.log('Update:', register)
          dispatch(receiveUpdate(register))
          return Promise.resolve(register)
          //dispatch(receiveRegister())
          //dispatch(loginUser(creds))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// ----------------------------------------------------- //

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

const fetchUser = login => ({
  [CALL_API]: {
    types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
    endpoint: `patients/${login}`
  }
})

export const loadUser = (login, requiredFields = []) => (dispatch, getState) => {
  return dispatch(fetchUser(login))
}

// ----------------------------------------------------- //

export const DRUGS_REQUEST = 'DRUGS_REQUEST'
export const DRUGS_SUCCESS = 'DRUGS_SUCCESS'
export const DRUGS_FAILURE = 'DRUGS_FAILURE'

const fetchDrugs = () => ({
  [CALL_API]: {
    types: [DRUGS_REQUEST, DRUGS_SUCCESS, DRUGS_FAILURE],
    endpoint: `drugs`
  }
})

export const loadDrugs = () => (dispatch, getState) => {
  return dispatch(fetchDrugs())
}

// ----------------------------------------------------- //

export const BRANDS_REQUEST = 'BRANDS_REQUEST'
export const BRANDS_SUCCESS = 'BRANDS_SUCCESS'
export const BRANDS_FAILURE = 'BRANDS_FAILURE'

const fetchDrugBrands = () => ({
  [CALL_API]: {
    types: [BRANDS_REQUEST, BRANDS_SUCCESS, BRANDS_FAILURE],
    endpoint: `drugs/brands`
  }
})

export const loadDrugBrands = () => (dispatch, getState) => {
  return dispatch(fetchDrugBrands())
}

// ----------------------------------------------------- //

export const LABTESTS_REQUEST = 'LABTESTS_REQUEST'
export const LABTESTS_SUCCESS = 'LABTESTS_SUCCESS'
export const LABTESTS_FAILURE = 'LABTESTS_FAILURE'

const fetchLabTests = () => ({
  [CALL_API]: {
    types: [LABTESTS_REQUEST, LABTESTS_SUCCESS, LABTESTS_FAILURE],
    endpoint: `tests`
  }
})

export const loadLabTests = () => (dispatch, getState) => {
  return dispatch(fetchLabTests())
}

// ----------------------------------------------------- //

export const PATIENT_REQUEST = 'PATIENT_REQUEST'
export const PATIENT_SUCCESS = 'PATIENT_SUCCESS'
export const PATIENT_FAILURE = 'PATIENT_FAILURE'

const fetchPatient = patientid => ({
  [CALL_API]: {
    types: [PATIENT_REQUEST, PATIENT_SUCCESS, PATIENT_FAILURE],
    endpoint: `patients/${patientid}`
  }
})

export const loadPatient = (patientid) => (dispatch, getState) => {
  return dispatch(fetchPatient(patientid))
}

// ----------------------------------------------------- //

// export const PATIENT_INFO_REQUEST = 'PATIENT_INFO_REQUEST'
// export const PATIENT_INFO_SUCCESS = 'PATIENT_INFO_SUCCESS'
// export const PATIENT_INFO_FAILURE = 'PATIENT_INFO_FAILURE'

const fetchPatientInfo = patientid => ({
  [CALL_API]: {
    types: [PATIENT_REQUEST, PATIENT_SUCCESS, PATIENT_FAILURE],
    endpoint: `patients/info/${patientid}`
  }
})

export const loadPatientInfo = (patientid) => (dispatch, getState) => {
  return dispatch(fetchPatientInfo(patientid))
}

// ----------------------------------------------------- //

export const DOCTOR_REQUEST = 'DOCTOR_REQUEST'
export const DOCTOR_SUCCESS = 'DOCTOR_SUCCESS'
export const DOCTOR_FAILURE = 'DOCTOR_FAILURE'

const fetchDoctor = doctorid => ({
  [CALL_API]: {
    types: [DOCTOR_REQUEST, DOCTOR_SUCCESS, DOCTOR_FAILURE],
    endpoint: `users/${doctorid}`
  }
})

export const loadDoctor = (doctorid) => (dispatch, getState) => {
  return dispatch(fetchDoctor(doctorid))
}

// ----------------------------------------------------- //

export const PATIENTSBYDOCTOR_REQUEST = 'PATIENTSBYDOCTOR_REQUEST'
export const PATIENTSBYDOCTOR_SUCCESS = 'PATIENTSBYDOCTOR_SUCCESS'
export const PATIENTSBYDOCTOR_FAILURE = 'PATIENTSBYDOCTOR_FAILURE'

const fetchPatientByDoctor = doctorid => ({
  [CALL_API]: {
    types: [PATIENTSBYDOCTOR_REQUEST, PATIENTSBYDOCTOR_SUCCESS, PATIENTSBYDOCTOR_FAILURE],
    endpoint: `patients/doctor/${doctorid}`
  }
})

export const loadPatientsByDoctor = (doctorid) => (dispatch, getState) => {
  return dispatch(fetchPatientByDoctor(doctorid))
}

// ----------------------------------------------------- //

export const MEDICALHISTORY_REQUEST = 'MEDICALHISTORY_REQUEST'
export const MEDICALHISTORY_SUCCESS = 'MEDICALHISTORY_SUCCESS'
export const MEDICALHISTORY_FAILURE = 'MEDICALHISTORY_FAILURE'

const fetchPatientMedicalHistory = patientid => ({
  [CALL_API]: {
    types: [MEDICALHISTORY_REQUEST, MEDICALHISTORY_SUCCESS, MEDICALHISTORY_FAILURE],
    endpoint: `patients/${patientid}/diagnoses`
  }
})

export const loadPatientMedicalHistory = (patientid) => (dispatch, getState) => {
  return dispatch(fetchPatientMedicalHistory(patientid))
}

// ----------------------------------------------------- //

export const MEDICALHISTORYBYDOCTOR_REQUEST = 'MEDICALHISTORYBYDOCTOR_REQUEST'
export const MEDICALHISTORYBYDOCTOR_SUCCESS = 'MEDICALHISTORYBYDOCTOR_SUCCESS'
export const MEDICALHISTORYBYDOCTOR_FAILURE = 'MEDICALHISTORYBYDOCTOR_FAILURE'

const fetchPatientMedicalHistoryByDoctor = (patientid, docid) => ({
  [CALL_API]: {
    types: [MEDICALHISTORYBYDOCTOR_REQUEST, MEDICALHISTORYBYDOCTOR_SUCCESS, MEDICALHISTORYBYDOCTOR_FAILURE],
    endpoint: `patients/${patientid}/diagnoses/doctor/${docid}`
  }
})

export const loadPatientMedicalHistoryByDoctor = (patientid, docid) => (dispatch, getState) => {
  return dispatch(fetchPatientMedicalHistoryByDoctor(patientid, docid))
}

// ----------------------------------------------------- //

export const PATIENTDIAGNOSIS_REQUEST = 'PATIENTDIAGNOSIS_REQUEST'
export const PATIENTDIAGNOSIS_SUCCESS = 'PATIENTDIAGNOSIS_SUCCESS'
export const PATIENTDIAGNOSIS_FAILURE = 'PATIENTDIAGNOSIS_FAILURE'

const fetchPatientDiagnosis = diagnosesid => ({
  [CALL_API]: {
    types: [PATIENTDIAGNOSIS_REQUEST, PATIENTDIAGNOSIS_SUCCESS, PATIENTDIAGNOSIS_FAILURE],
    endpoint: `patients/diagnoses/${diagnosesid}`
  }
})

export const loadPatientDiagnosis = (diagnosesid) => (dispatch, getState) => {
  return dispatch(fetchPatientDiagnosis(diagnosesid))
}

// ----------------------------------------------------- //

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE
})

// ----------------------------------------------------- //

export const SAVEDIAGNOSIS_REQUEST = 'SAVEDIAGNOSIS_REQUEST'
export const SAVEDIAGNOSIS_SUCCESS = 'SAVEDIAGNOSIS_SUCCESS'
export const SAVEDIAGNOSIS_FAILURE = 'SAVEDIAGNOSIS_FAILURE'

function requestSaveDiagnosis(diagnosisdata) {
  return {
    type: SAVEDIAGNOSIS_REQUEST,
    isFetching: true,
    diagnosisdata
  }
}

function receiveSaveDiagnosis() {
  return {
    type: SAVEDIAGNOSIS_SUCCESS,
    isFetching: false
  }
}

function saveDiagnosisError(message) {
  return {
    type: SAVEDIAGNOSIS_FAILURE,
    isFetching: false,
    message
  }
}

export function saveDiagnosis(diagnosisdata) {
  //console.log('Save Diagnosis', diagnosisdata)

  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(diagnosisdata)
  }

  return dispatch => {
    dispatch(requestSaveDiagnosis(diagnosisdata))
    return fetch(API_ROOT + 'patients/diagnoses', config)
      .then(response =>
        response.json()
          .then(register => ({ register, response }))
      ).then(({ register, response }) => {
        if (!response.ok) {
          //!Array.isArray(register.message) ? dispatch(registerError(register.message)) : dispatch(registerError(register.message[0].msg))    
          return Promise.reject(register)
        }
        else {
          dispatch(browserHistory.push('/patients/' + register.patientid + '/diagnose/' + register._id))
          //dispatch(receiveRegister())
          //dispatch(loginUser(creds))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// ----------------------------------------------------- //

export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';

function meFromToken(tokenFromStorage) {
  //check if the token is still valid, if so, get me from the server

  // const request = axios({
  //   method: 'get',
  //   url: `${ROOT_URL}/me/from/token?token=${tokenFromStorage}`,
  //   headers: {
  //     'Authorization': `Bearer ${tokenFromStorage}`
  //   }
  // });

  return {
    type: ME_FROM_TOKEN,
    tokenFromStorage
  };
}

function meFromTokenSuccess(currentUser) {
  return {
    type: ME_FROM_TOKEN_SUCCESS,
    currentUser
  };
}

function meFromTokenFailure(error) {
  return {
    type: ME_FROM_TOKEN_FAILURE,
    error
  };
}


export function loadUserFromToken() {

  let tokenFromStorage = localStorage.getItem('id_token');
  if (!tokenFromStorage || tokenFromStorage === '') {//if there is no token, dont bother
    return;
  }

  let config = {
    method: 'GET',
    headers: { 'Authorization': `Bearer ` + tokenFromStorage }
  }

  return dispatch => {
    dispatch(meFromToken(tokenFromStorage))
    return fetch(API_ROOT + 'auth/doctors/token?token=' + tokenFromStorage, config)
      .then(response =>
        response.json()
          .then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          //localStorage.removeItem('id_token');//remove token from storage
          //dispatch(meFromTokenFailure(response.payload));
        }
        else {
          //localStorage.setItem('id_token', response.token);
          // console.log('response.user: ', user.user)
          // console.log('response.token: ', user.token)
          dispatch(meFromTokenSuccess(user.user))
        }
      }).catch(err => console.log("Error: ", err))
  }

  // //fetch user from token (if server deems it's valid token)
  // dispatch(meFromToken(token))
  //   .then((response) => {
  //     if (!response.error) {
  //       //reset token (possibly new token that was regenerated by the server)
  //       localStorage.setItem('id_token', response.payload.data.token);
  //       dispatch(meFromTokenSuccess(response.payload))
  //     } else {
  //       localStorage.removeItem('id_token');//remove token from storage
  //       dispatch(meFromTokenFailure(response.payload));
  //     }
  //   });
}