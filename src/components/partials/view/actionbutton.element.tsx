import { useState } from 'react';
import { Button, Row, Col, Modal, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { ThreeDots } from 'react-loading-icons';
import FileDownload from "js-file-download";
import axios from "axios";

import { useAuth } from "../../../methods/auth";

import IProduct from '../../../interfaces/product.interface';

function ActionButton(args : { Product: IProduct }) {
  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);

  const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);
  const [purchaseError, setPurchaseError] = useState<string>("");

  const downloadProduct = () => {
    axios({
      url: `http://localhost/product/${args.Product.Id}/download`,
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then((response) => {
      FileDownload(
        response.data,
        `[${args.Product.Version.Number} ${args.Product.Version.Release}] ${args.Product.Id}--${args.Product.Title.replace(/ /g, '-').replace(/[^a-zA-Z0-9-_]/g, '')}.zip`
      );
    });
  }

  const purchaseProduct = () => {
    setPurchaseLoading(true);
    
    axios.post(`http://localhost/product/${args.Product.Id}/purchase`, {}, {
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then((res) => {
      args.Product.Transaction = res.data;

      setPurchaseLoading(false);
    }).catch(err => {
      setPurchaseLoading(false);
      setPurchaseError(err.response.data);
    });
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
      <Button variant="danger" onClick={() => setShowPurchaseModal(true)} className="mb-2">{args.Product.Price.Amount} {args.Product.Price.Currency}</Button>
      <Modal size="lg" show={showPurchaseModal} onHide={() => setShowPurchaseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">Are you sure you want to purchase this product?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="text-center mb-3">{args.Product.Title}</h3>
          {purchaseError && <Alert variant="danger" className="text-center">
            {purchaseError}
          </Alert>}
          {!purchaseError ? <Row>
            <Col className="d-grid gap-2 text-center">
              <Button variant="secondary" onClick={() => setShowPurchaseModal(false)} disabled={purchaseLoading}>Cancel</Button>
            </Col>
            <Col className="d-grid gap-2 text-center">
              <Button variant="danger" onClick={() => purchaseProduct()} disabled={purchaseLoading}>
                {purchaseLoading ? <ThreeDots fill="#fff" width="2rem" /> : 'Purchase'}
              </Button>
            </Col>
          </Row> : <div className="d-grid gap-2 text-center">
            <Button variant="success" onClick={() => downloadProduct()}>Download</Button>
          </div> }
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ActionButton;