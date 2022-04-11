import { useState } from 'react';
import { Button, Row, Col, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { useAuth } from "../../../methods/auth";

import IProduct from '../../../interfaces/product.interface';

function ActionButton(args : { Product: IProduct }) {
  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);

  const [showFormattingModal, setShowFormattingModal] = useState<boolean>(false);

  const downloadProduct = () => {
    window.location.href = `http://localhost/product/${args.Product.Id}/download`;
  }

  if(args.Product.Price.Amount == 0 || args.Product.Transaction?.Status == 'complete')
    return (
      <div className="d-grid gap-2">
        <Button variant="success" onClick={() => downloadProduct()} className="mb-2">Download</Button>
      </div>
    )
  
  if(!tokenObj.Token)
    return (
      <div className="d-grid gap-2">
        {/* @ts-ignore */}
        <Button as={Link} to="/signin" className="mb-2">Sign in</Button>
      </div>
    )

  return (
    <div className="d-grid gap-2">
      <Button variant="danger" onClick={() => setShowFormattingModal(true)} className="mb-2">{args.Product.Price.Amount} {args.Product.Price.Currency}</Button>
      <Modal size="lg" show={showFormattingModal} onHide={() => setShowFormattingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">Are you sure you want to purchase this product?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="text-center mb-3">{args.Product.Title}</h3>
          <Row>
            <Col className="d-grid gap-2 text-center">
              <Button variant="secondary" onClick={() => setShowFormattingModal(false)}>Cancel</Button>
            </Col>
            <Col className="d-grid gap-2 text-center">
              <Button variant="danger">Purchase</Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ActionButton;