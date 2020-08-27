let { books } = require("./../data/books");
let { authors } = require("./../data/authors");

// Query resolvers
exports.books = () =>
  books.map((book) => {
    let author = authors.find((author) => author.books.includes(book.id));

    return {
      ...book,
      author,
    };
  });

exports.book = (_, { id }) => {
  let book = books.find((_book) => _book.id === id);

  if (!book) {
    throw new Error("Book does not Exist");
  }

  let author = authors.find((author) => author.books.includes(book.id));

  return {
    ...book,
    author,
  };
};

// Mutation resolvers
exports.addBook = (_, { title, authorId }) => {
  let author = authors.find((_author) => _author.id === authorId);

  if (!author) {
    throw new Error("Author does not Exist");
  }

  const newBook = {
    id: String(Number(books[books.length - 1].id) + 1),
    title,
  };

  authors.forEach((_author) => {
    if (_author.id === author.id) {
      _author.books = [..._author.books, newBook.id];
    }
  });

  books.push(newBook);

  return {
    ...newBook,
    author,
  };
};

exports.removeBook = (_, { id }) => {
  const book = books.find((_book) => _book.id === id);

  if (!book) {
    throw new Error("Book does not Exist");
  }

  let author = authors.find((author) => author.books.includes(book.id));

  authors.forEach((_author) => {
    if (_author.id === author.id) {
      let bookIndex = _author.books.findIndex((_book) => _book === book.id);
      _author.books.splice(bookIndex, 1);
    }
  });

  books = books.filter((_book) => _book.id !== book.id);

  return {
    ...book,
    author,
  };
};
