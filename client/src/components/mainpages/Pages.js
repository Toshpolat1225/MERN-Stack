import React from 'react'
import {Routes, Route} from "react-router-dom";
import Products from './products/Products';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import NotFound from './utils/NotFound/NotFound';


const Pages = () => {
    return (
        <Routes>
        <Route path="/" exact components={Products}/>
        <Route path="/login" exact components={Login}/>
        <Route path="/register" exact components={Register}/>
        <Route path="/cart" exact components={Cart}/>

        <Route path="*" exact components={NotFound}/>
        </Routes>
    )
}

export default Pages
