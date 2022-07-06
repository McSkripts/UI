import React, {useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { ThreeDots } from 'react-loading-icons';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { useAuth } from "../../methods/auth";

function SignInView() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const { executeRecaptcha } = useGoogleReCaptcha();

  //@ts-ignore
  let from = location.state?.from?.pathname;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    let formData = new FormData(event.currentTarget);

    if (!executeRecaptcha) {
      setError('reCaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha('SignUp');

    let email = formData.get("email") as string;
    let password = formData.get("password") as string;

    auth.signin(token, email, password).then(() => {
      navigate(from || "/profile", { replace: true });
    }).catch(err => {
      setLoading(false);
      setError(err);
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
              <Form.Control type="text" name="email" placeholder="example@mcskripts.net" disabled={loading} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="•••••••••••••" disabled={loading} />
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