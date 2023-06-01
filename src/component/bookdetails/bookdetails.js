import React, { useState, useEffect } from 'react';

function BookDetails({ bookId }) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    // fetch the book details from the server
    const fetchBook = async () => {
      const response = await fetch(`/books/${bookId}`);
      const data = await response.json();
      setBook(data.book);
    }
    fetchBook();
  }, [bookId]);

  if (!book) return null;

  return (
    <>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Publisher: {book.publisher}</p>
      <p>Price: ${book.price}</p>
      <h2>Reviews</h2>
      <ul>
        {book.reviews.map(review => (
          <li key={review.id}>
            {review.rating} stars: {review.text}
          </li>
        ))}
      </ul>
    </>
  );
}

export default BookDetails;