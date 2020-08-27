const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
  },
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K. Rowling",
  },
  {
    title: "Harry Potter and the Goblet of Fire",
    author: "J.K. Rowling",
  },
  {
    title: "Harry Potter and the Order of the Phoenix",
    author: "J.K. Rowling",
  },
  {
    title: "Harry Potter and the Half-Blood Prince",
    author: "J.K. Rowling",
  },
  {
    title: "Harry Potter and the Deathly Hallows",
    author: "J.K. Rowling",
  },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
