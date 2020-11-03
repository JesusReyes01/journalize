import React from  'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/Auth';
import Dashboard from './Components/Dashboard';
import Entry from './Components/Entry';
import NewEntry from './Components/NewEntry';
import ForgotPassword from './Components/ForgotPassword'

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/entry/:entryId' component={Entry} />
        <Route path='/new' component={NewEntry}/>
        <Route path='/forgotpassword' component={ForgotPassword}/>
    </Switch>
)