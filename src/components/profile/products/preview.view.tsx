import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { Container, Table, OverlayTrigger, Tooltip, Badge, Dropdown, ButtonGroup, Button } from "react-bootstrap";
import axios from 'axios';
import './products.style.css';

import { useAuth } from "../../../methods/auth";

import IProduct from '../../../interfaces/product.interface';


function PreviewProductView(){
  let params = useParams();
  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);

  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  useEffect(() => {
    axios.get(`http://localhost/product/${params.id}`, {
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then((res) => {
      setProduct(res.data);
    });
  }, []);

  return (
    <Container className="mt-3 mb-3">
      {JSON.stringify(product)}
    </Container>
  );
}

export default PreviewProductView;