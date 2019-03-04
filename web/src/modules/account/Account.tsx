import * as React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import { meQuery } from "../../graphql/queries/meQuery";
import { MeQuery } from "../../schemaTypes";
import SubscripeUser from "./SubscripeUser";

export const Account = () => {
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
          return <Redirect to="/login" />;
        }

        if (data.me.type === "free-trial") {
          return <SubscripeUser />;
        }

        return (
          <div>
            <div>Welcome back {data.me.fullName}</div>
            <div>Thanks for buying</div>
          </div>
        );
      }}
    </Query>
  );
};
