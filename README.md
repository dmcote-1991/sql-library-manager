# SQL Library Manager

A dynamic and intuitive application for managing a library's collection of books, allowing users to add, update, delete, and search for books.

## Features

- **Book Management**: Easily add, update, delete, and search for books in the library's collection.
- **Pagination**: View books with pagination for better browsing.
- **Validation**: Ensures required fields are filled when adding or editing books.
- **Search Functionality**: Search for books by title, author, genre, or year.
- **Error Handling**: User-friendly error messages for invalid input or server issues.

## Technologies Used

- **Database**: SQLite, Sequelize ORM
- **Templating**: Pug
- **Frontend**: HTML, CSS, JavaScript
- **Server**: Express.js
- **Version Control**: Git
- **Package Manager**: npm

## Project Structure

```bash
sql-library-manager/
├── bin/
│   └── www                   # HTTP server setup
├── config/
│   └── config.example.json   # Example config for setup
├── migrations/
│   └── <timestamp>-create-book.js   # Database migration file for books table
├── models/
│   ├── book.js               # Book model definition
│   └── index.js              # Sequelize model and instance setup
├── node_modules/             # Project dependencies
├── public/
│   └── stylesheets/
│       └── style.css         # Styles for the application
├── routes/
│   ├── index.js              # Routes for book management
│   └── users.js              # Routes for user management
├── views/
│    ├── index.pug             # Main page displaying list of books
│    ├── new-book.pug          # Form to add a new book
│    ├── form-error.pug        # Error page for form validation
│    └── layout.pug            # Layout template for the app
├── app.js                     # Main app entry point
├── your-database-name.db      # SQLite database file
├── package.json               # NPM dependencies and scripts
├── .gitignore                 
└── README.md
```

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/dmcote1991/sql-library-manager.git
   ```

2. **Navigate to the project directory:**
   ```sh
   cd sql-library-manager
   ```

3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Set up the configuration file:**
   Copy the example configuration file and adjust settings as needed.
   ```sh
   cp config/config.example.json config/config.json
   ```

5. **Set up the database:** 
Run the migrations to set up the SQLite database and create the necessary tables.
   ```sh
   npx sequelize-cli db:migrate
   ```

6. **Start the server:**
   ```sh
   npm start
   ```
   The application will run on `http://localhost:3000`.

## Usage

- **View all books:**  
  Navigate to the root URL (`http://localhost:3000`) to view the list of books.

- **Add a new book:**  
  Click the "Add New Book" button, fill in the book details, and submit the form.

- **Edit or delete a book:**  
  Each book entry has options to update or delete the book.

- **Search for books:**  
  Use the search form at the top to find books by title, author, genre, or year.

## Additional Information

- **Database Configuration:** 
Modify the `config/config.json` file to specify your database settings.

- **Project Showcase:**
This project is designed as a demonstration of CRUD functionality and database management. For production usage, additional security and optimization would be recommended.
