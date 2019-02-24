import gql from "graphql-tag";

export const registerMutation = gql`
  mutation RegisterMutation(
    $fullName: String!
    $email: String!
    $password: String!
  ) {
    register(fullName: $fullName, email: $email, password: $password) {
      code
    }
  }
`;
