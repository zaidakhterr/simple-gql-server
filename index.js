const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    id: "1",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
  },
  {
    id: "2",
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    id: "3",
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K. Rowling",
  },
  {
    id: "4",
    title: "Harry Potter and the Goblet of Fire",
    author: "J.K. Rowling",
  },
  {
    id: "5",
    title: "Harry Potter and the Order of the Phoenix",
    author: "J.K. Rowling",
  },
  {
    id: "6",
    title: "Harry Potter and the Half-Blood Prince",
    author: "J.K. Rowling",
  },
  {
    id: "7",
    title: "Harry Potter and the Deathly Hallows",
    author: "J.K. Rowling",
  },
];

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find((book) => book.id === id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
