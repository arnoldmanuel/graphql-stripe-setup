import ApolloClient from "apollo-boost";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  credentials: "include"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
