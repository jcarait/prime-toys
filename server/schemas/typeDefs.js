const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }
  type Condition {
    _id: ID
    name: String
  }
  type Toy {
    _id: ID
    name: String
    description: String
    image: String
    category: Category
    condition: Condition
    createdAt: String
    isFree: Boolean
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    listings: [Toy]
  }
  type Auth {
    token: ID
    user: User
  }
  input addToy {
    name: String
    description: String
    image: String
    category: updateCategory
    isFree: Boolean
    condition: newCondition
  }
  input updateCategory {
    _id: ID
  }
  input newCondition {
    _id: ID
  }
  input addUser {
    username: String!
    email: String!
    password: String!
  }
  type Query {
    categories: [Category]
    toys: [Toy]
    user: User
    conditions: [Condition]
    toy(_id: String!): Toy
  }
  type Mutation {
    addUser(input: addUser): Auth
    updateUser(username: String, email: String, password: String): User
    login(username: String!, password: String!): Auth
    addToy(input: addToy): Toy
    updateToy(
      _id: ID!
      name: String!
      description: String!
      image: String!
    ): Toy
    removeToy(_id: ID): Toy
  }
`;

module.exports = typeDefs;
