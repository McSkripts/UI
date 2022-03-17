import { Row, Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Puff } from 'react-loading-icons';
import './members.style.css';

//@ts-ignore
function MemberView(list) {
  if(!list.Users)
    return (
      <div className="text-center mt-5">
        <Puff stroke="#000" height="4rem" width="4rem" /><br />
        Loading . . .
      </div>
    );

  return (
    <Row>
      {//@ts-ignore
      list.Users && list.Users.map((user, index) => (
        <Col as={Link} to={`/member/${user.Id}`} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 3 }} key={index} className="text-decoration-none">
          <Card body className="mb-3">
            {JSON.stringify(user)}
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default MemberView;