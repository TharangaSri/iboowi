import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.entities.
//const patient = (state = { address:{}, phones:[], allergies:[], familyhistory:[] }, action) => {

const doctor = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.DOCTOR_REQUEST:
      return state
    //return merge({}, state, action.response)
    case ActionTypes.DOCTOR_SUCCESS:
      return merge(action.response)
    //return merge({}, state, action.response)
    case ActionTypes.DOCTOR_FAILURE:
      return state
    //return merge({}, state, action.response)
    default:
      return state
  }
}

const patients = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.PATIENTSBYDOCTOR_REQUEST:
      return []
    //return state
    //return merge([], state, action.response)
    case ActionTypes.PATIENTSBYDOCTOR_SUCCESS:
      return action.response
    //return merge([], state, action.response)
    case ActionTypes.PATIENTSBYDOCTOR_FAILURE:
      return state
    //return merge({}, state, action.response)
    default:
      return state
  }
}

const patient = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.PATIENT_REQUEST:
      return state
    //return merge({}, state, action.response)
    case ActionTypes.PATIENT_SUCCESS:
      return merge(action.response)
    //return merge({}, state, action.response)
    case ActionTypes.PATIENT_FAILURE:
      return state
    //return merge({}, state, action.response)
    case ActionTypes.REGISTER_SUCCESS:
      return merge({}, state, action.response)
    default:
      return state
  }
}

const drugs = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.DRUGS_REQUEST:
      return state
    //return merge({}, state, action.response)
    case ActionTypes.DRUGS_SUCCESS:
      return merge([], state, action.response)
    case ActionTypes.DRUGS_FAILURE:
      return state
    //return merge({}, state, action.response)
    default:
      return state
  }
}

const brands = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.BRANDS_REQUEST:
      return state
    //return merge({}, state, action.response)
    case ActionTypes.BRANDS_SUCCESS:
      return merge([], state, action.response)
    case ActionTypes.BRANDS_FAILURE:
      return state
    //return merge({}, state, action.response)
    default:
      return state
  }
}

const tests = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.LABTESTS_REQUEST:
      return state
    //return merge({}, state, action.response)
    case ActionTypes.LABTESTS_SUCCESS:
      return merge([], state, action.response)
    case ActionTypes.LABTESTS_FAILURE:
      return state
    //return merge({}, state, action.response)
    default:
      return state
  }
}

const medicalhistory = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.MEDICALHISTORYBYDOCTOR_REQUEST:
      return state
    //return merge({}, state, action.response)
    case ActionTypes.MEDICALHISTORYBYDOCTOR_SUCCESS:
      return action.response
    //return merge([], state, action.response)
    case ActionTypes.MEDICALHISTORYBYDOCTOR_FAILURE:
      return state
    //return merge({}, state, action.response)
    default:
      return state
  }
}

// const medicalhistory = (state = [], action) => {
//   switch (action.type) {
//     case ActionTypes.MEDICALHISTORY_REQUEST:
//       return state
//     //return merge({}, state, action.response)
//     case ActionTypes.MEDICALHISTORY_SUCCESS:
//       return merge([], state, action.response)
//     case ActionTypes.MEDICALHISTORY_FAILURE:
//       return state
//     //return merge({}, state, action.response)
//     default:
//       return state
//   }
// }

const diagnoses = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.PATIENTDIAGNOSIS_REQUEST:
      return state
    //return merge({}, state, action.response)
    case ActionTypes.PATIENTDIAGNOSIS_SUCCESS:
      return action.response
    //return merge({}, state, action.response)
    case ActionTypes.PATIENTDIAGNOSIS_FAILURE:
      return state
    //return merge({}, state, action.response)
    default:
      return state
  }
}

const auth = (state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  errorMessage: '',
  user: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null
}, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return merge({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case ActionTypes.LOGIN_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
        errorMessage: ''
      })
    case ActionTypes.LOGIN_FAILURE:
      return merge({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case ActionTypes.LOGOUT_SUCCESS:
      return merge({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case ActionTypes.ME_FROM_TOKEN_SUCCESS:
      return merge({}, state, {
        user: action.currentUser
      })
    default:
      return state
  }
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

const rootReducer = combineReducers({
  auth,
  patients,
  patient,
  doctor,
  medicalhistory,
  errorMessage,
  routing,
  drugs,
  tests,
  brands,
  diagnoses,
  form: formReducer
})

export default rootReducer
