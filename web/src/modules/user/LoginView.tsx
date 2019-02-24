import * as React from "react";
import { useState } from "react";
import { Mutation } from "react-apollo";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Link, RouteComponentProps } from "react-router-dom";
import { loginMutation } from "../../graphql/mutations/loginMutation";
import { LoginMutation, LoginMutationVariables } from "../../schemaTypes";

export const LoginView: React.FunctionComponent<
  RouteComponentProps<{}>
> = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    console.log("Form was submitted");
    console.log(email, password);
  };

  return (
    <Mutation<LoginMutation, LoginMutationVariables> mutation={loginMutation}>
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
                  Welcome back!
                </h4>
              </div>
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
                    variables: { email, password }
                  });
                  console.log(response);
                  props.history.push("/me");
                }}
              >
                Sign in to your account
              </Button>
              <Form.Text
                className="text-muted"
                style={{ textAlign: "center", paddingTop: ".25rem" }}
              >
                Don't have an account?
                <Link to={"/register"}>Sign up</Link>.
              </Form.Text>
            </Form>
          </Card>
        </div>
      )}
    </Mutation>
  );
};
