import { Row, Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

import BackButton from '../partials/view/backbutton.element';
import ActionButton from '../partials/view/actionbutton.element';
import Tab from '../partials/view/tab.element';

import IProduct from '../../interfaces/product.interface';

function ScriptView(args : { Product: IProduct }) {
  return (
    <Row>
      <Col lg={{ span: 3 }}>
        <BackButton />
        Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le 
      </Col>
      <Col lg={{ span: 7 }}>
        <h1 className="mb-2">{args.Product.Title}</h1>
        <Tab Product={args.Product} />
      </Col>
      <Col lg={{ span: 2 }}>
        <ActionButton Id={args.Product.Id} Price={args.Product.Price} />
        Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le Le 
      </Col>
    </Row>
  );
}

export default ScriptView;