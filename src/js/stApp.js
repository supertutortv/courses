import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import allYourBase from './components/allYourBase'
import Signup from './components/Signup'
import STSecured from './components/STSecured'
import STTV from './_st'

window._st = STTV

ReactDOM.render( 
    <BrowserRouter>
        <Switch>
            {_st.loading = true}
            <Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' render={() => <Redirect to='/auth/token' />} />
            <Route path='/' render={(p) => <STSecured {...p} />} />
        </Switch>
    </BrowserRouter>,
document.getElementById('stApp') )