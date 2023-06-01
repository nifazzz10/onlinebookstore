import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import BookBrowsing from '../../bookbrowsing.js/bookbrowsing';
import BookDetails from '../../bookdetails/bookdetails';
import ShoppingCart from '../../shoppingcart/shoppingcart';
import logo from "../login/Untitled_design-removebg-preview.png";

function Profile({ cartItems, setCartItems }) {
  const [profile, setProfile] = useState(null);
  const [orderHistory, setOrderHistory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's profile and order history from the server
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://onlinebookedufundd.onrender.com/profile');
        const data = await response.json();
        setProfile(data.profile);
        setOrderHistory(data.orderHistory);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      // Prepare the order data
      const orderData = {
        userId: profile._id, // Assuming profile includes the user's ID
        items: cartItems.map(item => ({
          title: item.title,
          author: item.author,
          price: item.price
        }))
      };

      // Send the order data to the server to store it
      const response = await fetch('https://onlinebookedufundd.onrender.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        // Clear the shopping cart and display a success message
        setCartItems([]);
        navigate('/cart/success');
      } else {
        console.error('Failed to place the order');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="card p-4 mt-4" style={{ width: '70%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <div className="text-center mb-4">
          <img src={logo} alt="Online book shopping" style={{ width: '200px' }} />
        </div>

        <nav>
          <ul className="d-flex justify-content-center">
         
              <Link to="/books" className="btn btn-primary btn-lg m-1" style={{ backgroundColor: '#EF5F67' }}>
                Browse Books
              </Link>
            
          
              <Link to="/cart" className="btn btn-primary btn-lg m-1" style={{ backgroundColor: '#EF5F67' }}>
                Shopping Cart
              </Link>
          
          </ul>
        </nav>
        <Routes>
          <Route path="/books" element={<BookBrowsing cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route
            path="/cart"
            element={<ShoppingCart cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />}
          />
        </Routes>
      </div>
      <div className="card p-4 mt-4" style={{ width: '70%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <h2 className="text-center">Order History</h2>
        {orderHistory && (
          <ul>
            {orderHistory.map(order => (
              <li key={order.id}>
                Order #{order.id}: {order.items.map(item => item.title).join(', ')}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Profile;
