let { books } = require("./../data/books");
let { authors } = require("./../data/authors");

// Query resolvers
exports.authors = () => authors;

exports.author = (_, { id }) => authors.find((author) => author.id === id);

// Mutation reslovers
exports.addAuthor = (_, { name }) => {
  const newAuthor = {
    id: String(Number(authors[authors.length - 1].id) + 1),
    name,
    books: [],
  };

  authors.push(newAuthor);

  return newAuthor;
};

exports.removeAuthor = (_, { id }) => {
  let author = authors.find((_author) => _author.id === id);

  if (!author) {
    throw new Error("Author does not Exist");
  }

  if (author.books.length > 0) {
    books = books.filter((book) => !author.books.includes(book.id));
  }

  authors = authors.filter((_author) => _author.id !== id);

  return author;
};
