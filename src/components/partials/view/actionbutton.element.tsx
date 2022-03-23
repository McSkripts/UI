import { Button } from 'react-bootstrap';
import axios from 'axios';

import IProduct from '../../../interfaces/product.interface';

function ActionButton(args : { Id: IProduct["Id"], Price : IProduct["Price"] }) {
  const downloadProduct = () => {
    axios.get(`http://localhost/product/${args.Id}/download`);
  }

  if(args.Price.Amount == 0)
    return (
      <div className="d-grid gap-2">
        <Button variant="success" onClick={() => downloadProduct()} className="mb-2">Download</Button>
      </div>
    )

  return (
    <div className="d-grid gap-2">
      <Button variant="danger" onClick={() => {}} className="mb-2">{args.Price.Amount} {args.Price.Currency}</Button>
    </div>
  )
}

export default ActionButton;