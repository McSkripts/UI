import { ListGroup, Row, Col, Badge } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Loading from '../loading.element';
import './products.style.css';

import IProduct from '../../../interfaces/product.interface';

interface Product {
  Products?: Array<IProduct>
}

function ProductView(args? : Product) {
  if(!args?.Products)
    return <Loading className="mt-2 h5" size={3} />;

  return (
    <ListGroup>
      {args?.Products && args?.Products.map((product, index) => {
        const uploadTime = new Date(product.Timestamp.Upload);
        const uploadDate = (
          "0" + uploadTime.getDate()).slice(-2) + "-" + ("0"+(uploadTime.getMonth()+1)).slice(-2) + "-" + uploadTime.getFullYear() + " " + 
          ("0" + uploadTime.getHours()).slice(-2) + ":" + ("0" + uploadTime.getMinutes()).slice(-2);

        const starRating = product.Meta?.Ratings ? product.Meta?.Ratings.Stars : 0;

        return (
        <ListGroup.Item as={Link} to={product?.Uri || `/view/${product?.Id}`} key={index}>
          <Row>
            <Col lg={{ span: 9 }}>
              <h5 className="mt-2">
                <Badge bg="secondary" className="text-uppercase">{product.Type}</Badge>{' '}
                {product.Title}
              </h5>
            </Col>
            <Col lg={{ span: 3 }}>
              <span className="float-right">
                <h5>
                  {product.Price.Amount > 0 && <>
                    <Badge bg="danger" className="float-right">{`${product.Price.Amount} ${product.Price.Currency}`}</Badge>
                  </>}
                  {product.Price.Amount == 0 && <Badge bg="success" className="float-right text-uppercase">Free</Badge>}
                </h5>
                <Badge className="float-right mt-1">
                  {[...Array(5)].map((x, i) => 
                    <span key={i}><i className={starRating > i ? (starRating > i + 0.50 ? 'fa-solid fa-star' : 'fa-regular fa-star-half-stroke') : 'fa-regular fa-star'}></i>{' '}</span>
                  )}
                </Badge>
              </span>
            </Col>
          </Row>
          <p className="mb-0">{product.Description}</p>
          <small className="text-muted">
            {product.User?.DisplayName} | {uploadDate}
            <span className="float-right">
              <i className="fa-solid fa-eye"></i> {product.Meta?.Views} |{' '}
              <i className="fa-solid fa-download"></i> {product.Meta?.Downloads} |{' '}
              <i className="fa-solid fa-comment"></i> {product.Meta?.Ratings.Total}
            </span>
          </small>
        </ListGroup.Item>
      )})}
    </ListGroup>
  )
}

export default ProductView;