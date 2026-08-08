const express = require("express");

const app = express();
app.use(express.json());

let books = [];
let nextId = 1;

// Home
app.get("/", (req, res) => {
  res.json({
    message: "Library Management API is running!"
  });
});

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Get one book
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  res.json(book);
});

// Create book
app.post("/books", (req, res) => {
  const { title, author, category, year } = req.body;

  if (!title || !author || !category) {
    return res.status(400).json({
      message: "Title, author and category are required"
    });
  }

  const book = {
    id: nextId++,
    title,
    author,
    category,
    year: year || ""
  };

  books.push(book);

  res.status(201).json({
    message: "Book added successfully",
    book
  });
});

// Update book
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  const { title, author, category, year } = req.body;

  book.title = title || book.title;
  book.author = author || book.author;
  book.category = category || book.category;
  book.year = year || book.year;

  res.json({
    message: "Book updated successfully",
    book
  });
});

// Delete book
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  books.splice(index, 1);

  res.json({
    message: "Book deleted successfully"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
