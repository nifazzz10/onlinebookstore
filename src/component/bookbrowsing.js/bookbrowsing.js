import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CartPlus, ArrowLeft } from 'react-bootstrap-icons';
import ShoppingCart from '../shoppingcart/shoppingcart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Bookbrowsing.css'; // Import custom CSS for styling
import logo from "../regandlogin/login/Untitled_design-removebg-preview.png"
export default function Bookbrowsing({ cartItems, setCartItems }) {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState('all');
  const [filter, setFilter] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // fetch the books from the server
    const fetchBooks = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/books?category=${category}&filter=${filter}`);
      const data = await response.json();
      setBooks(data.books);
    };
    fetchBooks();
  }, [category, filter]);

  useEffect(() => {
    // if an id is provided in the URL, find the corresponding book
    if (id) {
      const book = books.find((book) => book.id === id);
      setSelectedBook(book);
    } else {
      setSelectedBook(null);
    }
  }, [id, books]);

  const handleAddToCart = (book) => {
    setCartItems((items) => [...items, book]);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((items) => items.filter((item, i) => i !== index));
  };

  const handleCheckout = () => {
    // Handle checkout using Stripe here
    // Add your Stripe implementation code
  };

  return (
    <div className="container">
    
      <div className="row justify-content-center mb-4">
      <div className="text-center mb-4">
          <img src={logo} alt="Online book shopping" style={{ width: '150px' }} />
        </div>
      
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6">
              <h5 className="form-label">Category:</h5>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="all">All</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="mystery">Mystery</option>
              </select>
            </div>
            <div className="col-md-6">
              <h5 className="form-label">Filter:</h5>
              <input type="text" className="form-control" value={filter} onChange={(e) => setFilter(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {selectedBook && (
          <>
            <div className="col-md-6">
              <div className="card mb-4 glass-card">
                <div className="card-body">
                  <h2 className="card-title">{selectedBook.title}</h2>
                  <p className="card-text">by {selectedBook.author}</p>
                  <p className="card-text">Price: {selectedBook.price}</p>
                  <p className="card-text">Publisher: {selectedBook.publisher}</p>
                  <button className="btn btn-primary" onClick={() => handleAddToCart(selectedBook)}>
                    <CartPlus className="me-2" /> Add to Cart
                  </button>
                  {/* add more book details here */}
                  <button className="m-2 btn btn-primary" onClick={() => setSelectedBook(null)}>
                    <ArrowLeft className="me-2" /> Back
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-4 glass-card">
                <div className="card-body">
                  <ShoppingCart cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />
                </div>
              </div>
            </div>
          </>
        )}
        {!selectedBook &&
          books.map((book) => (
            <div className="col-md-6" key={book.id} onClick={() => setSelectedBook(book)}>
              <div className="card mb-4 glass-card">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">by {book.author}</p>
                  </div>
                  <h4 className="card-text">${book.price}</h4>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
