const { ApolloServer, gql } = require("apollo-server");
let { books } = require("./data/books");
let { authors } = require("./data/authors");

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    books: [ID]
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book!
    authors: [Author]
    author(id: ID!): Author!
  }

  type Mutation {
    addBook(title: String!, authorId: ID!): Book
    removeBook(id: ID!): Book
    addAuthor(name: String!): Author
    removeAuthor(id: ID!): Author
  }
`;

const resolvers = {
  Query: {
    books: () =>
      books.map((book) => {
        let author = authors.find((author) => author.books.includes(book.id));

        return {
          ...book,
          author,
        };
      }),
    book: (_, { id }) => {
      let book = books.find((_book) => _book.id === id);

      if (!book) {
        throw new Error("Book does not Exist");
      }

      let author = authors.find((author) => author.books.includes(book.id));

      return {
        ...book,
        author,
      };
    },
    authors: () => authors,
    author: (_, { id }) => authors.find((author) => author.id === id),
  },
  Mutation: {
    addBook: (_, { title, authorId }) => {
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
    },
    removeBook: (_, { id }) => {
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
    },
    addAuthor: (_, { name }) => {
      const newAuthor = {
        id: String(Number(authors[authors.length - 1].id) + 1),
        name,
        books: [],
      };

      authors.push(newAuthor);

      return newAuthor;
    },
    removeAuthor: (_, { id }) => {
      let author = authors.find((_author) => _author.id === id);

      if (!author) {
        throw new Error("Author does not Exist");
      }

      if (author.books.length > 0) {
        books = books.filter((book) => !author.books.includes(book.id));
      }

      authors = authors.filter((_author) => _author.id !== id);

      return author;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
