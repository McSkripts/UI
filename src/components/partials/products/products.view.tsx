import { ListGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Puff } from 'react-loading-icons';
import './products.style.css';

//@ts-ignore
function ProductView(list) {
  if(!list.Products)
    return (
      <div className="text-center mt-5">
        <Puff stroke="#000" height="4rem" width="4rem" /><br />
        Loading . . .
      </div>
    );

  return (
    <ListGroup>
      {//@ts-ignore
      list.Products && list.Products.map((product, index) => (
        <ListGroup.Item as={Link} to={`/view/${product.Id}`} key={index}>{JSON.stringify(product)}</ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default ProductView;