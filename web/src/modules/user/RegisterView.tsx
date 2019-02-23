import { gql } from "apollo-boost";
import * as React from "react";
import { useState } from "react";
import { Mutation } from "react-apollo";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Link, RouteComponentProps } from "react-router-dom";
import { RegisterMutation, RegisterMutationVariables } from "../../schemaTypes";

const registerMutation = gql`
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

export const RegisterView: React.FunctionComponent<
  RouteComponentProps<{}>
> = props => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Mutation<RegisterMutation, RegisterMutationVariables>
      mutation={registerMutation}
    >
      {mutate => (
        <div
          style={{
            display: "flex",
            displayDirection: "column",
            justifyContent: "center",
            paddingTop: "200px"
          }}
        >
          <Card style={{ padding: "2rem", backgroundColor: "#F7F7F7" }}>
            <Form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleSubmit(e)
              }
            >
              <div>
                <h4
                  style={{
                    textAlign: "center",
                    paddingBottom: "1rem",
                    fontWeight: "bolder"
                  }}
                >
                  Register
                </h4>
              </div>
              <Form.Group controlId="formBasicName">
                <Form.Control
                  type="name"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e: any) => setFullName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
                block
                onClick={async () => {
                  const response = await mutate({
                    variables: { fullName, email, password }
                  });
                  console.log(response);
                  props.history.push("/login");
                }}
              >
                Create your Account
              </Button>
              <Form.Text
                className="text-muted"
                style={{ textAlign: "center", paddingTop: ".25rem" }}
              >
                Already have an account?<Link to={"/login"}> Sign in</Link>.
              </Form.Text>
            </Form>
          </Card>
        </div>
      )}
    </Mutation>
  );
};
