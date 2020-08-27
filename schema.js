const { gql } = require("apollo-server");

exports.typeDefs = gql`
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
