const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 1
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Task 2
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Task 3
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const bookKeys = Object.keys(books);
  const matchedBooks = [];

  bookKeys.forEach(key => {
    if (books[key].author === author) {
      matchedBooks.push(books[key]);
    }
  });

  if (matchedBooks.length > 0) {
    return res.status(200).json(matchedBooks);
  } else {
    return res.status(404).json({ message: "No books found for this author" });
  }
});
  
// Task 4
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const bookKeys = Object.keys(books);
  const matchedBooks = [];

  bookKeys.forEach(key => {
    if (books[key].title === title) {
      matchedBooks.push(books[key]);
    }
  });

  if (matchedBooks.length > 0) {
    return res.status(200).json(matchedBooks);
  } else {
    return res.status(404).json({ message: "No books found with this title" });
  }
});

//  Task 5
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Task 6
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if username already exists
  if (!isValid(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  // Add new user
  users.push({ username: username, password: password });

  return res.status(200).json({ message: "User successfully registered. Now you can login" });
});

module.exports.general = public_users;
