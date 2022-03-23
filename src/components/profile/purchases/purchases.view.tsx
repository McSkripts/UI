import { Container, Table, OverlayTrigger, Tooltip, Badge, Dropdown, ButtonGroup, Button } from "react-bootstrap";
import './purchases.style.css';

function PurchasesView(){
  return (
    <Container className="mt-3 mb-3">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Type</th>
            <th>Product</th>
            <th>Billig Cycle</th>
            <th>Price</th>
            <th>Purchase date</th>
            <th>Next billig date</th>
            <th className="text-center">Status</th>
            <th className="no-width"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Script</td>
            <td>Auto spawn cats when chrouching</td>
            <td>One-time</td>
            <td>200 DKK</td>
            <td>10. Jan 2020 12:00</td>
            <td>None</td>
            <td className="text-center">
              <OverlayTrigger overlay={<Tooltip>Tooltip!</Tooltip>}>
                <Badge bg="success">Y</Badge>
              </OverlayTrigger>
            </td>
            <td className="text-center">
            <Dropdown as={ButtonGroup}>
              <Button variant="primary" className="table-button">Download</Button>

              <Dropdown.Toggle split variant="primary" className="table-button" />

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default PurchasesView;