import React from 'react'
import {Switch, Route} from "react-router-dom"
import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'


const Pages = () => {
    return (
        <Switch>

        <Route path="/" exact components={Products}/>
        <Route path="/login" exact components={Login}/>
        <Route path="/register" exact components={Register}/>
        <Route path="/cart" exact components={Cart}/>

        </Switch>
    )
}

export default Pages
