import * as React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export const RegisterView = () => {
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
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
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
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" block>
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
  );
};
