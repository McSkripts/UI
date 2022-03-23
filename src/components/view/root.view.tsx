import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';
import Loading from '../partials/loading.element';
import axios from 'axios';

import Script from './script.view';
import Plugin from './plugin.view';

import IProduct from '../../interfaces/product.interface';

function RootView() {
  let params = useParams();
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  useEffect(() => {
    axios.get(`http://localhost/product/${params.id}`).then((res) => {
      setProduct(res.data);
      
      document.title = res.data.Title + ' - McSkripts';
    });
  }, []);

  if(!product)
    return <Loading />;

  return (
    <Container className="mt-3">
      {product?.Type == 'scripts' && <Script Product={product} />}
      {product?.Type == 'plugins' && <Plugin />}
    </Container>
  );
}

export default RootView;