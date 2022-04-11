import * as React from 'react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Row, Col, Card, Accordion, ListGroup, useAccordionButton, InputGroup, FormControl, Button, Badge } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import './search.style.css';

import Loading from '../partials/loading.element';

import Products from '../partials/products/products.view';

import IProduct from '../../interfaces/product.interface';

/*interface IProducts {
  Meta?: Array<{}>;
  Products?: Array<IProduct>;
}*/

function SearchView() {
  let params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Array<IProduct> | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(false);
  
  let URLPreferences = location.hash.replace("#", "").split("::");
  const [sortingVal, setSortingVal] = useState<string | undefined>(URLPreferences[0] || 'newest');
  const [directionVal, setDirectionVal] = useState<string | undefined>(URLPreferences[1] || 'desc');

  const queryStr = params.query || '';
  const [query, setQuery] = useState<string>(queryStr);
  useEffect(() => {
    document.title = 'McSkripts - 1000 forskellige scripts';

    axios.get(`http://localhost/products/${params.type}?searchterm=${query}`).then((res) => {
      setProducts(res.data.Products);

      if(res.data.Meta.Pagination.TotalPages > res.data.Meta.Pagination.CurrentPage)
        setHasMore(true);
    });
  }, []);

  const fetchMore = () => {
    let nextPage = Math.ceil((products?.length || 0) / 25) + 1;
    axios.get(`http://localhost/products/${params.type}?page=${nextPage}&searchterm=${query}`).then((res) => {
      let tempArr = products?.concat(res.data.Products);
      setProducts(tempArr);

      if(res.data.Meta.Pagination.TotalPages == res.data.Meta.Pagination.CurrentPage)
        setHasMore(false);
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(query ? `/search/${params.type}/${encodeURIComponent(query)}#${sortingVal}::${directionVal}` : `/search/${params.type}#${sortingVal}::${directionVal}`);

    setHasMore(false);
    axios.get(`http://localhost/products/${params.type}?searchterm=${query}`).then((res) => {
      setProducts(res.data.Products);

      if(res.data.Meta.Pagination.TotalPages > res.data.Meta.Pagination.CurrentPage)
        setHasMore(true);
    });
  }

  const sortingClicked = (e: React.MouseEvent<Element, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    
    setSortingVal(target.dataset.value);

    navigate(query ? `/search/${params.type}/${encodeURIComponent(query)}#${target.dataset.value}::${directionVal}` : `/search/${params.type}#${target.dataset.value}::${directionVal}`);
  };

  const directionClicked = (e: React.MouseEvent<Element, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    
    setDirectionVal(target.dataset.value);
    navigate(query ? `/search/${params.type}/${encodeURIComponent(query)}#${sortingVal}::${target.dataset.value}` : `/search/${params.type}#${sortingVal}::${target.dataset.value}`);
  };

  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col md={{ span: 3 }}>
          <Accordion defaultActiveKey={sortingVal != 'newest' ? '0' : undefined} className="mb-3">
            <Card>
              <Card.Header>
                <CollapseButton title="Sorting" activeItem={sortingVal} eventKey="0"></CollapseButton>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <ListGroup variant="flush">
                  <ListGroup.Item action data-value="newest" className={sortingVal == 'newest' ? 'active' : ''} onClick={sortingClicked}>Newest</ListGroup.Item>
                  <ListGroup.Item action data-value="updated" className={sortingVal == 'updated' ? 'active' : ''} onClick={sortingClicked}>Updated</ListGroup.Item>
                  <ListGroup.Item action data-value="title" className={sortingVal == 'title' ? 'active' : ''} onClick={sortingClicked}>Title</ListGroup.Item>
                  <ListGroup.Item action data-value="popularity" className={sortingVal == 'popularity' ? 'active' : ''} onClick={sortingClicked}>Popularity</ListGroup.Item>
                </ListGroup>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Accordion defaultActiveKey={directionVal != 'desc' ? '0' : undefined} className="mb-3">
            <Card>
              <Card.Header>
                <CollapseButton title="Direction" activeItem={directionVal} eventKey="1"></CollapseButton>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <ListGroup variant="flush">
                  <ListGroup.Item action data-value="asc" className={directionVal == 'asc' ? 'active' : ''} onClick={directionClicked}>Ascending</ListGroup.Item>
                  <ListGroup.Item action data-value="desc" className={directionVal == 'desc' ? 'active' : ''} onClick={directionClicked}>Descending</ListGroup.Item>
                </ListGroup>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <div className="hide-small-screen">AD</div>
        </Col>
        <Col md={{ span: 9 }}>
          <form onSubmit={handleSubmit} className="mb-3">
            <InputGroup>
              <FormControl value={query} onChange={ e => setQuery(e.target.value) } placeholder="keywords..." />
              <Button type="submit" variant="primary">Search</Button>
            </InputGroup>
          </form>
          <InfiniteScroll
            dataLength={products?.length || 0}
            next={fetchMore}
            hasMore={hasMore}
            loader={<Loading className="mt-2 h5" size={3} />}>
            <Products Products={products} />
          </InfiniteScroll>
        </Col>
      </Row>
    </Container>
  );
}

function CollapseButton({ title, activeItem, eventKey }: { title: string, activeItem: string | undefined, eventKey: string }) {
  const [isCollapsed, setCollapsed] = useState(true);

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setCollapsed(!isCollapsed);
  });

  return (
    <button type="button" onClick={decoratedOnClick} className="custom-accordion-button w-100 text-left">
      {title}
      <Badge className="text-capitalize mt-0 mb-0 m-1">{activeItem}</Badge>
      {isCollapsed ? <i className="fa-solid fa-angle-down float-right mt-1"></i> : <i className="fa-solid fa-angle-up float-right mt-1"></i>}
    </button>
  );
}

export default SearchView;