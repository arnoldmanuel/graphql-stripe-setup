import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID
    email: String
  }

  type Error {
    message: String
  }

  type RegisterResponse {
    errors: [Error]
    didWork: Boolean
  }

  type LoginResponse {
    errors: [Error]!
    me: User
  }

  type Query {
    hello: String!
  }

  type Mutation {
    register(email: String!, password: String!): RegisterResponse
    login(email: String!, password: String!): LoginResponse
  }
`;
