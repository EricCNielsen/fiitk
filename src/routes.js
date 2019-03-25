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
import WeddingCakes from './components/Front/SubCakes/Wedding';
import BirthdayCakes from './components/Front/SubCakes/Birthday';
import SpecialCakes from './components/Front/SubCakes/SpecialOrder';
import SimpleCupcakes from './components/Front/SubCupcakes/Simplecupcakes';
import CreateUser from './components/Back/CreateUser/CreateUser'
import ViewUsers from './components/Back/ViewUsers/ViewUsers'


export default (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/cupcakes" component={Cupcakes} />
        <Route path="/specialtyitems" component={Specialty} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard/viewusers" component={ViewUsers} />
        <Route path="/dashboard/createuser" component={CreateUser} />
        <Route path="/dashboard/edit" component={Edit} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/cakes/wedding" component={WeddingCakes} />
        <Route path="/cakes/birthday" component={BirthdayCakes} />
        <Route path="/cakes/special" component={SpecialCakes} />
        <Route path="/cakes" component={Cakes} />
        <Route path="/cupcakes/simple" component={SimpleCupcakes} />
        <Route path="/cupcakes" component={Cupcakes} />
    </Switch>
)
