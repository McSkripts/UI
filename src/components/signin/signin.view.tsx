import React, {useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { ThreeDots } from 'react-loading-icons';

import { useAuth } from "../../methods/auth";

function SignInView() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  //@ts-ignore
  let from = location.state?.from?.pathname;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;

    setLoading(true);
    auth.signin(email, password).then(() => {
      navigate(from || "/profile", { replace: true });
    }).catch(err => {
      setLoading(false);
      setError(err.response.data);
    });
  }

  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="mt-5 text-center">Sign in</h1>
          <h2 className="text-center">{from ? `Access to ${from} is restricted, please sign in` : "Sign in text..."}</h2>
          <hr />
          {error && (<>
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          </>)}
          <form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="text" name="email" placeholder="example@mcskripts.net" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="•••••••••••••" />
            </Form.Group>
            
            <Form.Group className="text-center">
              <Button variant="primary" type="submit" disabled={loading}>{loading ? <ThreeDots fill="#fff" width="2rem" /> : 'Submit'}</Button>
            </Form.Group>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInView;