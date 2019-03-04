import gql from "graphql-tag";

export const meQuery = gql`
  query MeQuery {
    me {
      email
      fullName
      type
    }
  }
`;
