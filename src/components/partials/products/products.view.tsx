import { ListGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Loading from '../loading.element';
import './products.style.css';

import IProduct from '../../../interfaces/product.interface';

interface Product {
  Products?: Array<IProduct>
}

function ProductView(args? : Product) {
  if(!args?.Products)
    return <Loading />;

  return (
    <ListGroup>
      {args?.Products && args?.Products.map((product, index) => (
        <ListGroup.Item as={Link} to={`/view/${product?.Id}`} key={index}>{JSON.stringify(product)}</ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default ProductView;