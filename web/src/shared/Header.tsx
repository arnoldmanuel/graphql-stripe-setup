import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { meQuery } from "../graphql/queries/meQuery";
import { MeQuery } from "../schemaTypes";

export const Header = () => {
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
          return (
            <div>
              <div>
                <Link to="/login">Sign In</Link>
              </div>
              <div>
                <Link to="/register">Sign Up</Link>
              </div>
            </div>
          );
        }

        // user is logged in
        return (
          <div>
            <Link to="/account">Account</Link>
          </div>
        );
      }}
    </Query>
  );
};
