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
    books: [ID!]
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
    removeBook(id: ID!): Book
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
      let _book = books.find((book) => book.id === id);
      let author = authors.find((author) => author.books.includes(_book.id));
      return {
        ..._book,
        author,
      };
    },
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = {
        id: String(books.length),
        title,
        author,
      };
      books.push(newBook);
      return newBook;
    },
    removeBook: (_, { id }) => {
      const deletedBook = books.find((book) => book.id === id);
      books = books.filter((book) => book.id !== id);
      return deletedBook;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
