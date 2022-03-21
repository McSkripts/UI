import { ListGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Puff } from 'react-loading-icons';
import './products.style.css';

interface Product {
  Products?: Array<{
    map(arg0: (product: any, index: any) => JSX.Element): import("react").ReactNode;
    Id: Number;
  }>
}

function ProductView(args? : Product) {
  if(!args?.Products)
    return (
      <div className="text-center mt-5">
        <Puff stroke="#000" height="4rem" width="4rem" /><br />
        Loading . . .
      </div>
    );

  return (
    <ListGroup>
      {args?.Products && args?.Products.map((product, index) => (
        <ListGroup.Item as={Link} to={`/view/${product?.Id}`} key={index}>{JSON.stringify(product)}</ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default ProductView;