import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Table, OverlayTrigger, Tooltip, Badge, Dropdown, ButtonGroup, Button } from "react-bootstrap";
import Loading from '../../partials/loading.element';
import axios from 'axios';
import './products.style.css';

import { useAuth } from "../../../methods/auth";

import IProduct from '../../../interfaces/product.interface';

function ProductsView(){
  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);

  const [products, setProducts] = useState<Array<IProduct> | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(false);
  useEffect(() => {
    axios.get(`http://localhost/user/@me/products`, {
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then((res) => {
      setProducts(res.data.Products);

      if(res.data.Meta.Pagination.TotalPages > res.data.Meta.Pagination.CurrentPage)
        setHasMore(true);
    });
  }, []);

  const fetchMore = () => {
    let nextPage = Math.ceil((products?.length || 0) / 25) + 1;
    axios.get(`http://localhost/user/@me/products?page=${nextPage}`, {
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then((res) => {
      let tempArr = products?.concat(res.data.Products);
      setProducts(tempArr);

      if(res.data.Meta.Pagination.TotalPages == res.data.Meta.Pagination.CurrentPage)
        setHasMore(false);
    });
  }

  return (
    <Container className="mt-3 mb-3">
      {/* @ts-ignore */}
      <Button as={Link} to="/profile/product/new" variant="success">Upload a new product</Button>
      <hr />
      <InfiniteScroll
        dataLength={products?.length || 0}
        next={fetchMore}
        hasMore={hasMore}
        loader={<Loading />}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="no-width">Type</th>
              <th>Title</th>
              <th className="no-width">Price</th>
              <th className="no-width">Uploaded</th>
              <th className="no-width text-center">Visibility</th>
              <th className="no-width text-center">
                <OverlayTrigger overlay={<Tooltip>Status</Tooltip>}>
                  <i className="fa-solid fa-signal"></i>
                </OverlayTrigger>
              </th>
              <th className="no-width text-center">
                <OverlayTrigger overlay={<Tooltip>Views</Tooltip>}>
                  <i className="fa-solid fa-eye"></i>
                </OverlayTrigger>
              </th>
              <th className="no-width text-center">
                <OverlayTrigger overlay={<Tooltip>Downloads</Tooltip>}>
                  <i className="fa-solid fa-download"></i>
                </OverlayTrigger>
              </th>
              <th className="no-width text-center">
                <OverlayTrigger overlay={<Tooltip>Purchases</Tooltip>}>
                  <i className="fa-solid fa-basket-shopping"></i>
                </OverlayTrigger>
              </th>
              <th className="no-width">Anmeldelser</th>
              <th className="no-width"></th>
            </tr>
          </thead>
          <tbody>
            {products && products?.map((product : IProduct, index) => {
              const uploadDate = new Date(product.Timestamp.Upload);
              const uploadTime = (
                "0" + uploadDate.getDate()).slice(-2) + "-" + ("0"+(uploadDate.getMonth()+1)).slice(-2) + "-" + uploadDate.getFullYear() + " " + 
                ("0" + uploadDate.getHours()).slice(-2) + ":" + ("0" + uploadDate.getMinutes()).slice(-2);
              
              const starRating = product.Meta?.Ratings ? product.Meta?.Ratings.Stars : 0;
              return (
              <tr key={index}>
                <td><Badge bg="secondary">{product.Type}</Badge></td>
                <td>{product.Title}</td>
                <td className="text-center text-nowrap">{product.Price.Amount > 0 ? <Badge bg="danger">{product.Price.Amount} {product.Price.Currency}</Badge> : <Badge bg="success">Free</Badge>}</td>
                <td className="text-center text-nowrap">{uploadTime}</td>
                <td className="text-center">
                  <Badge>Public</Badge>
                </td>
                <td className="text-center">
                  <OverlayTrigger overlay={<Tooltip>Tooltip!</Tooltip>}>
                    <Badge bg="success">Y</Badge>
                  </OverlayTrigger>
                </td>
                <td className="text-center">{product.Meta?.Views}</td>
                <td className="text-center">{product.Meta?.Downloads}</td>
                <td className="text-center">0</td>
                <td className="text-nowrap">
                  {[...Array(5)].map((x, i) => 
                    <><i key={i} className={starRating > i ? (starRating > i + 0.50 ? 'fa-solid fa-star' : 'fa-regular fa-star-half-stroke') : 'fa-regular fa-star'}></i>{' '}</>
                  )} - {starRating.toFixed(2)}
                </td>
                <td className="text-center">
                  {/* @ts-ignore */}
                  <Button as={Link} to={`/profile/product/${product.Id}`} variant="primary" className="table-button">Show More</Button>
                </td>
              </tr>
            )})}
          </tbody>
        </Table>
        {!products && <Loading />}
      </InfiniteScroll>
    </Container>
  );
}

export default ProductsView;