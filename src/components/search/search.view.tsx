import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Row, Col, Card, Accordion, ListGroup, useAccordionButton } from 'react-bootstrap';
import { useParams } from "react-router-dom";
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
  const [products, setProducts] = useState<Array<IProduct> | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(false);
  useEffect(() => {
    document.title = 'McSkripts - 1000 forskellige scripts';

    axios.get(`http://localhost/products/${params.type}`).then((res) => {
      setProducts(res.data.Products);

      if(res.data.Meta.Pagination.TotalPages > res.data.Meta.Pagination.CurrentPage)
        setHasMore(true);
    });
  }, []);

  const fetchMore = () => {
    let nextPage = Math.ceil((products?.length || 0) / 25) + 1;
    axios.get(`http://localhost/products/${params.type}?page=${nextPage}`).then((res) => {
      let tempArr = products?.concat(res.data.Products);
      setProducts(tempArr);

      if(res.data.Meta.Pagination.TotalPages == res.data.Meta.Pagination.CurrentPage)
        setHasMore(false);
    });
  }

  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col md={{ span: 3 }}>
          <Accordion className="mb-3">
            <Card>
              <Card.Header>
                AAAA
                <CollapseButton eventKey="0"></CollapseButton>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <ListGroup variant="flush">
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Accordion className="mb-3">
            <Card>
              <Card.Header>
                AAAA
                <CollapseButton eventKey="1"></CollapseButton>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <ListGroup variant="flush">
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <div className="hide-small-screen">AD</div>
        </Col>
        <Col md={{ span: 9 }}>
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

function CollapseButton({ eventKey }: { eventKey: string }) {
  const [isCollapsed, setCollapsed] = useState(true);

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setCollapsed(!isCollapsed);
  });

  return (
    <button type="button" onClick={decoratedOnClick} className="float-right">
      {isCollapsed ? 'X' : 'Y'}
    </button>
  );
}

export default SearchView;