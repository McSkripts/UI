import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Accordion, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from "../../methods/auth";
import './profile.style.css';

import DailyRewards from '../partials/profile/dailyrewards/dailyrewards.view';
import Affiliates from '../partials/profile/affiliates/affiliates.view';
import Achivements from '../partials/profile/achievements/achievements.view';

function ProfileView(){
  let auth = useAuth();

  let userObj = JSON.parse(auth.user);

  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col lg={{ span: 3 }} className="mb-3">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Details</Accordion.Header>
              <Accordion.Body>
                <small>Displayname:</small><br />
                <b>{userObj.DisplayName}</b><br />
                <small>Full name:</small><br />
                <b>{userObj.FirstName} {userObj.LastName}</b><br />
                <small>Email:</small><br />
                <b>{userObj.Email}</b><br />
                <br />
                <small>Roles:</small><br />
                . . .
              </Accordion.Body>
              <Card.Footer>
                <div className="d-grid gap-2">
                  {/*@ts-ignore */}
                  <Button as={Link} to="/profile/details" variant="primary">Edit details</Button>
                </div>
              </Card.Footer>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col lg={{ span: 9 }}>
          <Row>
            <Col md={{ span: 6 }} lg={{ span: 3 }} className="mb-1">
              <Alert variant="info">
                Alert
              </Alert> 
            </Col>
            <Col md={{ span: 6 }} lg={{ span: 3 }} className="mb-1">
              <Alert variant="success">
                Alert
              </Alert> 
            </Col>
            <Col md={{ span: 6 }} lg={{ span: 3 }} className="mb-1">
              <Alert variant="danger">
                Alert
              </Alert> 
            </Col>
            <Col md={{ span: 6 }} lg={{ span: 3 }} className="mb-1">
              <Alert variant="warning">
                Alert
              </Alert> 
            </Col>
          </Row>
          <Row>
            <Col lg={{ span: 6 }} className="mb-3">
              <Card border="danger" className="mb-3">
                <Card.Header>Daily rewards</Card.Header>
                <Card.Body className="">
                  <DailyRewards />
                </Card.Body>
              </Card>
              <Card border="success">
                <Card.Header>Affiliates</Card.Header>
                <Card.Body className="">
                  <Affiliates />
                </Card.Body>
              </Card>
            </Col>
            <Col lg={{ span: 6 }}>
              <Card border="info">
                <Card.Header>Achievements</Card.Header>
                <Card.Body className="">
                  <Achivements />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileView;