import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

function TypeView() {
  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <Card body as={Link} to="/search/scripts">
            Scripts
          </Card>
        </Col>
        <Col>
          <Card body as={Link} to="/search/plugins">
            Plugins
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TypeView;