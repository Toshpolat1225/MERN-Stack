import React from 'react'
import {Routes, Route} from "react-router-dom";
import Products from './products/Products';
import DetailProduct from './detailProduct/DetailProduct';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import NotFound from './utils/NotFound/NotFound';


const Pages = () => {
    return (
        <Routes>
        <Route path="/" exact element={<Products/>}/>
        <Route path="/detail/:id" exact element={<DetailProduct/>}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/register" exact element={<Register/>}/>
        <Route path="/cart" exact element={<Cart/>}/>

        <Route path="*" exact element={<NotFound/>}/>
        </Routes>
    )
}

export default Pages
