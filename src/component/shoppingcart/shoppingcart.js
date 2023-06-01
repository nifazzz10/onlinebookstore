import React from 'react';
import { Trash } from 'react-bootstrap-icons';
import logo from "../regandlogin/login/Untitled_design-removebg-preview.png"

export default function ShoppingCart({ cartItems = [], handleRemoveFromCart }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleCheckout = async () => {
    // create a CheckoutSession on your server
    const response = await fetch('https://onlinebookedufundd.onrender.com/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cartItems })
    });
    const data = await response.json();
    const sessionId = data.sessionId;

    // redirect the user to the Stripe Checkout page
    const stripe = window.Stripe('pk_test_51NDls2SJYorgBX6jJkGL2YBArJ1tX1iFyrYBfJ69wvZHaPW1uaHBI9pyuZVL0dhzhyxosKzgeA8TON7Szn4P47bz00iQkQaCxy');
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '70%', backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)', color: 'black' }}>
        <div className="text-center mb-4">
          <img src={logo} alt="Online book shopping" style={{ width: '200px' }} />
        </div>
        <h5 className="text-center">Shopping Cart</h5>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  {item.title} - ${item.price}
                </span>
                <button className="btn btn-outline-danger" onClick={() => handleRemoveFromCart(index)}>
                  <Trash size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <>
            <p className="mt-3 text-center">Total Price: ${totalPrice}</p>
            <button className="btn btn-success d-block mx-auto" onClick={handleCheckout}>
              Checkout with Stripe
            </button>
          </>
        )}
      </div>
    </div>
  );
}
