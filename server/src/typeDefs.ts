import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID
    email: String
  }

  type Error {
    message: String
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type RegisterResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    errors: [Error!]
  }

  type LoginResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    errors: [Error!]
    me: User
  }

  type Query {
    me: User
  }

  type Mutation {
    register(email: String!, password: String!): RegisterResponse
    login(email: String!, password: String!): LoginResponse
  }
`;
