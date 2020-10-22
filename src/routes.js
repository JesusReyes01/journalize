import React from  'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Dashboard from './Components/Dashboard/Dashboard';
import Entry from './Components/Entry/Entry';
import NewEntry from './Components/NewEntry/NewEntry';

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/entry/:entryId' component={Entry} />
        <Route path='/new' component={NewEntry}/>
    </Switch>
)