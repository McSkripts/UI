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
      <Col lg={{ span: 2 }}>
        <BackButton />
        <Card className="mb-2">
          <Card.Header>Stats</Card.Header>
          <Card.Body className="p-2">
            <Row>
              <Col className="col-5 p-0 text-center">
                <i className="fa-solid fa-eye" style={{fontSize: '250%'}}></i>
              </Col>
              <Col className="col-7 p-0">
                <b style={{fontSize: '26px', lineHeight: '21px'}}>{args.Product.Meta?.Views}</b><br />
                <small style={{marginTop: '-7px', float: 'left'}}>Views</small>
              </Col>
            </Row>
            <hr className="mt-2 mb-2" />
            <Row>
              <Col className="col-5 p-0 text-center">
                <i className="fa-solid fa-download" style={{fontSize: '250%'}}></i>
              </Col>
              <Col className="col-7 p-0">
                <b style={{fontSize: '26px', lineHeight: '21px'}}>{args.Product.Meta?.Downloads}</b><br />
                <small style={{marginTop: '-7px', float: 'left'}}>Downloads</small>
              </Col>
            </Row>
            <hr className="mt-2 mb-2" />
            <Row>
              <Col className="col-5 p-0 text-center">
                <i className="fa-solid fa-floppy-disk" style={{fontSize: '250%'}}></i>
              </Col>
              <Col className="col-7 p-0">
                <b style={{fontSize: '26px', lineHeight: '21px'}}>0<small style={{fontSize: '45%'}}> KB</small></b><br />
                <small style={{marginTop: '-7px', float: 'left'}}>Size</small>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Addons</Card.Header>
          <Card.Body>
            <Loading className="mt-1" />
          </Card.Body>
        </Card>
      </Col>
      <Col lg={{ span: 8 }}>
        <h1 className="mb-2 overflow-hidden">
          {args.Product.Version.Release != 'stable' ? <Badge bg="danger" className="text-uppercase">{`${args.Product.Version.Release} ${args.Product.Version.Number}`}</Badge> : <Badge>{args.Product.Version.Number}</Badge>}{' '}
          {args.Product.Title}
          </h1>
        <Tab Product={args.Product} />
      </Col>
      <Col lg={{ span: 2 }}>
        <ActionButton Product={args.Product} />
        <Link to={`/member/${args.Product.User?.Id}`}>
          <div className="rect-img-container">
            <img className="rect-img" src={`https://mcskri.pt${args.Product.User?.Avatar.File.Location}${args.Product.User?.Avatar.File.Name}.${args.Product.User?.Avatar.File.Type}`} />
          </div>
        </Link>
        <p className="text-center overflow-hidden">{args.Product.User?.DisplayName}</p>
        User stats....
      </Col>
    </Row>
  );
}

export default ScriptView;