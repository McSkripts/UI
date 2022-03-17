import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Container, InputGroup, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import './index.style.css';

import Products from '../partials/products/products.view';

function IndexView() {
  const [products, setProducts] = useState({});
  useEffect(() => {
    document.title = 'McSkripts - 1000 forskellige scripts';

    axios.get('http://localhost/auction/products').then((res) => {
      setProducts(res.data);
    });
  }, []);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const [serach, setSearch] = useState("");
  useEffect(() => {
    if(serach){
      let data = JSON.parse(serach);
      navigate(data.query ? `/search/${data.type}/${encodeURIComponent(data.query)}/1` : `/search/${data.type}/1`);
    }
  }, [serach]);

  return (
    <Container className="mt-3 mb-3">
      <div className="mt-2 text-center">
        <img className="logo" src="https://mcskri.pt/img/logo/default_dark.png" alt="McSkripts" />
      </div>
      <form onSubmit={handleSubmit((form) => setSearch(JSON.stringify(form)))} className="search-form">
        <InputGroup>
          <Form.Select {...register("type")} className="">
            <option value="scripts">Scripts</option>
            <option value="plugins">Plugins</option>
          </Form.Select>
          <FormControl {...register("query")} placeholder="keywords..." />
        </InputGroup>
        <Button type="submit" variant="primary">Søg</Button>
      </form>
      <Products {...products} />
    </Container>
  );
}

export default IndexView;
