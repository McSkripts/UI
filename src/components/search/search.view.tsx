import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Accordion, ListGroup, useAccordionButton } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './search.style.css';

import Products from '../partials/products/products.view';

export interface IProducts {
  Meta?: Array<{

  }>;
  Products?: Array<{
    map(arg0: (product: any, index: any) => JSX.Element): import("react").ReactNode;
    Id: Number;
    Type: String;
    Title: String;
    Description: String;
    Version: Array<{
      Number: String;
      Release: String;
    }>;
    Price: Array<{
      Amount: String;
      Currency: String;
    }>;
    Timestamp: Array<{
      Upload: String;
      Update: String;
    }>;
    Uri: String;
    Meta: Array<{
      Views: Number;
      Downloads: Number;
      Ratings: Array<{
        Total: Number;
        Stars: Number;
      }>;
    }>;
    // Add user... maybe create some models
  }>;
}

function SearchView() {
  let params = useParams();
  const [products, setProducts] = useState<IProducts>({});
  useEffect(() => {
    document.title = 'McSkripts - 1000 forskellige scripts';

    axios.get(`http://localhost/products/${params.type}`).then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col md={{ span: 3 }}>
          <Accordion className="mb-3">
            <Card>
              <Card.Header>
                AAAA
                <CollapseButton eventKey="0"></CollapseButton>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <ListGroup variant="flush">
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Accordion className="mb-3">
            <Card>
              <Card.Header>
                AAAA
                <CollapseButton eventKey="1"></CollapseButton>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <ListGroup variant="flush">
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <div className="hide-small-screen">AD</div>
        </Col>
        <Col md={{ span: 9 }}>
          {products?.Meta && JSON.stringify(products?.Meta)}
          <Products Products={products?.Products} />
        </Col>
      </Row>
    </Container>
  );
}

function CollapseButton({ eventKey }: { eventKey: string }) {
  const [isCollapsed, setCollapsed] = useState(true);

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setCollapsed(!isCollapsed);
  });

  return (
    <button type="button" onClick={decoratedOnClick} className="float-right">
      {isCollapsed ? 'X' : 'Y'}
    </button>
  );
}

export default SearchView;