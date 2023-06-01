import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './component/regandlogin/reg/reg';
import Login from './component/regandlogin/login/login';
import Profile from './component/regandlogin/profile/profile';
import Bookbrowsing from './component/bookbrowsing.js/bookbrowsing';
import ShoppingCart from './component/shoppingcart/shoppingcart';
import Cancel from './component/ordercancelpage/cancel';
import "./App.css"
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile cartItems={cartItems} setCartItems={setCartItems} />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          path="/books"
          element={
            isAuthenticated ? (
              <Bookbrowsing
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        /> <Route path="/cancel" element={<Cancel/>} />
        <Route
          path="/cart"
          element={
            isAuthenticated ? (
              <ShoppingCart cartItems={cartItems} />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
