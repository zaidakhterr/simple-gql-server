const { books, book, addBook, removeBook } = require("./book");
const { authors, author, addAuthor, removeAuthor } = require("./author");

exports.resolvers = {
  Query: {
    books,
    book,
    authors,
    author,
  },
  Mutation: {
    addBook,
    removeBook,
    addAuthor,
    removeAuthor,
  },
};
