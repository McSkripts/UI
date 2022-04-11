import { Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Loading from '../partials/loading.element';

import BackButton from '../partials/view/backbutton.element';
import ActionButton from '../partials/view/actionbutton.element';
import Tab from '../partials/view/tab.element';

import IProduct from '../../interfaces/product.interface';

function ScriptView(args : { Product: IProduct }) {
  return (
    <Row>
      <Col lg={{ span: 3 }}>
        <BackButton />
        {/*<Card>
          <Card.Header>Addons</Card.Header>
          <Card.Body>
            <Loading className="mt-1" />
          </Card.Body>
        </Card>*/}
      </Col>
      <Col lg={{ span: 7 }}>
        <h1 className="mb-2 overflow-hidden">
          {args.Product.Version.Release != 'stable' ? <Badge bg="danger">{`${args.Product.Version.Release} ${args.Product.Version.Number}`}</Badge> : <Badge>{args.Product.Version.Number}</Badge>}{' '}
          {args.Product.Title}
          </h1>
        <Tab Product={args.Product} />
      </Col>
      <Col lg={{ span: 2 }}>
        <ActionButton Product={args.Product} />
        <div className="rect-img-container">
          <img className="rect-img" src={`https://mcskri.pt${args.Product.User?.Avatar.File.Location}${args.Product.User?.Avatar.File.Name}.${args.Product.User?.Avatar.File.Type}`} />
        </div>
        <p className="text-center overflow-hidden">{args.Product.User?.DisplayName}</p>
      </Col>
    </Row>
  );
}

export default ScriptView;