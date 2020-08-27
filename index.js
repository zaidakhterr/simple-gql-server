const { ApolloServer, gql } = require("apollo-server");

let books = [
  {
    id: "1",
    title: "Harry Potter and the Philosopher's Stone",
  },
  {
    id: "2",
    title: "Harry Potter and the Chamber of Secrets",
  },
  {
    id: "3",
    title: "Revive you Heart",
  },
  {
    id: "4",
    title: "Tuesdays with Morrie",
  },
];

let authors = [
  {
    id: "1",
    name: "J.K. Rowling",
    books: ["1", "2"],
  },
  {
    id: "2",
    name: "Nauman Ali",
    books: ["3"],
  },
  {
    id: "3",
    name: "Mitch Albom",
    books: ["4"],
  },
];

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
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
