import React from 'react'
import Main from '../components/layouts/Main';
import Blank from '../components/layouts/Blank';

import DoctorLoginView from '../views/DoctorLogin';
import DashboardView from '../views/Dashboard';
import PatientRegisterView from '../views/PatientRegister';
import PatientEditView from '../views/PatientEdit';
import PatientDiagnoseView from '../views/PatientDiagnose';
import PatientDiagnosisSummaryView from '../views/PatientDiagnosisSummary';
import MainView from '../views/Main';
import MinorView from '../views/Minor';

import { Route, Router, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

export default

    <Route path="/" component={Main}>
        <IndexRoute component={DashboardView} />
        <Route path="login" component={DoctorLoginView} />
        <Route path="dashboard" component={DashboardView} />
        <Route path="patients/register" component={PatientRegisterView} />
        <Route path="patients/id/:patientid/edit" component={PatientEditView} />
        <Route path="patients/id/:patientid" component={PatientDiagnoseView} />
        <Route path="patients/:patientid/diagnose/:diagnosesid" component={PatientDiagnosisSummaryView} />
        <Route path="test" component={MainView} />
    </Route>

    /*<Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRedirect to="/dashboard" />
            <Route path="/dashboard" component={DashboardView}> </Route>
            <Route path="/patients/id/:patientid" component={PatientDiagnoseView} />
            <Route path="/login" component={MinorView}> </Route>
        </Route>
    </Router>*/

/*
<Router history={browserHistory}>
    <Route path="/" component={Main}>
        <IndexRedirect to="/dashboard" />
        <Route path="dashboard" component={DashboardView}> </Route>
        <Route path="login" component={MinorView}> </Route>
    </Route>
</Router>    
*/

