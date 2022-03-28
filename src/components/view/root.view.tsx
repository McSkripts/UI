import { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useParams } from "react-router-dom";
import { Container, Form } from 'react-bootstrap';
import Loading from '../partials/loading.element';
import axios from 'axios';
import './view.style.css';

import Script from './script.view';
import Plugin from './plugin.view';

import IProduct from '../../interfaces/product.interface';

function RootView() {
  const watchtime_start = new Date();
  let watchtime_timer: NodeJS.Timer,
   watchtime_focus: boolean = true,
   watchtime: number = 0;

  let params = useParams();
  const [product, setProduct] = useState<IProduct | undefined>();
  useEffect(() => {
    axios.get(`http://localhost/product/${params.id}`).then((res) => {
      setProduct(res.data);
      
      document.title = res.data.Title + ' - McSkripts';
    });

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    watchtime_timer = setInterval(() => {
      if(watchtime_focus)
        watchtime++;
    }, 100);
    
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      
      console.log(watchtime_start.toISOString());
      console.log(watchtime / 10);
    }
  }, []);

  const onFocus = () => {
    watchtime_focus = true;
  };

  const onBlur = () => {
    watchtime_focus = false;
  };

  if(!product)
    return <Loading className="mt-3" />;
  
  return (
    <Container className="mt-3">
      {product?.Type == 'scripts' && <Script Product={product} />}
      {product?.Type == 'plugins' && <Plugin />}
    </Container>
  );
}

export default RootView;