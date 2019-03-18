import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './components/Front/Landing/Landing'
import Cupcakes from './components/Front/Cupcakes/Cupcakes';
import Cakes from './components/Front/Cakes/Cakes'
import Specialty from './components/Front/SpecialtyItems/SpecialtyItems'
import Contact from './components/Front/Contact/Contact'
import Login from './components/Back/Login/Login'
import Dashboard from './components/Back/Dashboard/Dashboard';
import Edit from './components/Back/Edit/Edit'

export default (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/cakes" component={Cakes} />
        <Route path="/cupcakes" component={Cupcakes} />
        <Route path="/specialtyitems" component={Specialty} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/edit" component={Edit} />
    </Switch>
)
