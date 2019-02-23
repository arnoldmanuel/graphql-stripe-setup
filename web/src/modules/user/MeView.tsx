import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import { MeQuery } from "../../schemaTypes";

const meQuery = gql`
  query MeQuery {
    me {
      email
      fullName
    }
  }
`;

export const MeView = () => {
  return (
    <Query<MeQuery> query={meQuery}>
      {({ data, loading, error }) => {
        if (error) {
          return <div>There was an error</div>;
        }
        if (loading) {
          return <div>loading...</div>;
        }
        if (!data) {
          return <div>Something went wrong</div>;
        }
        if (!data.me) {
          return <div>Something went wrong</div>;
        }
        return <div>Welcome back, {data.me.fullName}</div>;
      }}
    </Query>
  );
};
