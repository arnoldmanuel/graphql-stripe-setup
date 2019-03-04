import gql from "graphql-tag";

export const createSubscriptionMutation = gql`
  mutation CreateSubscriptionMutation($source: String!) {
    createSubscription(source: $source) {
      id
      email
      type
    }
  }
`;
