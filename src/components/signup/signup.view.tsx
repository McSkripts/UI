import React, {useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ThreeDots } from 'react-loading-icons';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { useAuth } from "../../methods/auth";

function SignUpView() {
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

    let firstname = formData.get("firstname") as string;
    let lastname = formData.get("lastname") as string;
    let displayname = formData.get("displayname") as string;
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;
    let repeatPassword = formData.get("repeat_password") as string;

    auth.signup(token, firstname, lastname, displayname, email, password, repeatPassword, 'EUR', 'EN').then(() => {
      //navigate(from || "/profile", { replace: true });
    }).catch(err => {
      setLoading(false);
      setError(err);
    });
  }

  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="mt-5 text-center">Sign up</h1>
          <h2 className="text-center">Create a account :O</h2>
          <hr />
          {error && (<>
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          </>)}
          <form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Firstname</Form.Label>
                  <Form.Control type="text" name="firstname" placeholder="Mikkel" disabled={loading} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control type="text" name="lastname" placeholder="Scriptsen" disabled={loading} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>
                Displayname
                <span className="m-1">
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip>
                        Tooltip on <strong>top</strong>.
                      </Tooltip>
                    }
                  >
                    <i className="fa-solid fa-circle-info"></i>
                  </OverlayTrigger>
                </span>
              </Form.Label>
              <Form.Control type="text" name="displayname" placeholder="McsIsTheBest" disabled={loading} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="text" name="email" placeholder="example@mcskripts.net" disabled={loading} />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="•••••••••••••" disabled={loading} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Repeat password</Form.Label>
                  <Form.Control type="password" name="repeat_password" placeholder="•••••••••••••" disabled={loading} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="text-center">
              <Button variant="primary" type="submit" disabled={loading}>{loading ? <ThreeDots fill="#fff" width="2rem" /> : 'Submit'}</Button>
            </Form.Group>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpView;