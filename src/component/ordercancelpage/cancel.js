import React from 'react';
import { Link } from 'react-router-dom';

function Cancel() {
  return (
    <div>
      <h1 className="text-center">Order Canceled</h1>
      <p className="text-center">Your order has been canceled.</p>
      <div className="text-center">
        <Link to="/profile" className="btn btn-primary">
          Back to Profile
        </Link>
      </div>
    </div>
  );
}

export default Cancel;
