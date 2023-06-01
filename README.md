
# Online Bookstore Application

This is a web-based online bookstore application that allows users to browse and purchase books. The application is built using the following technologies:

- Front-end: React.js
- Back-end: Node.js, Express.js
- Database: MongoDB
- Payment Processing: Stripe

## Features

- User registration and login functionality.
- Book browsing with filtering and searching options.
- Book details page with information about the selected book.
- Shopping cart functionality to add and remove books.
- Secure payment processing using Stripe.
- Order placement and order history for users.
- User profile page displaying personal information and order history.

## Prerequisites

- Node.js installed on your machine
- MongoDB Atlas account for database access
- Stripe account for payment processing

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/online-bookstore.git
    ```

2. Navigate to the project directory:
    ```bash
    cd online-bookstore
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Configure the application:
    - Rename the `.env.example` file to `.env`.
    - Set the MongoDB connection string in the `.env` file.
    - Set the Stripe secret key in the `.env` file.

5. Start the application:
    ```bash
    npm start
    ```

6. Open the application in your browser:
    ```bash
    http://localhost:3000
    ```

## Usage

1. Register a new user account using a valid email and password.
2. Log in to the application using your registered credentials.
3. Browse books by category or search for specific titles or authors.
4. View book details by clicking on a book card.
5. Add books to your shopping cart and review the cart contents.
6. Proceed to checkout to complete the purchase using Stripe.
7. View your order history on the user profile page.

