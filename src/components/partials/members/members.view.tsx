import { Row, Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Puff } from 'react-loading-icons';
import './members.style.css';

import IUser from '../../../interfaces/user.interface';

interface Args {
  Users?: Array<IUser>
}

function MemberView(args? : Args) {
  if(!args?.Users)
    return (
      <div className="text-center mt-5">
        <Puff stroke="#000" height="4rem" width="4rem" /><br />
        Loading . . .
      </div>
    );

  return (
    <Row>
      {args?.Users && args?.Users.map((user, index) => (
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