import { Row, Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Loading from '../loading.element';
import './members.style.css';

import IUser from '../../../interfaces/user.interface';

interface Args {
  Users?: Array<IUser>
}

function MemberView(args? : Args) {
  if(!args?.Users)
    return <Loading className="mt-2 h5" size={3} />;

  return (
    <Row>
      {args?.Users && args?.Users.map((user, index) => (
        <Col as={Link} to={`/member/${user.Id}`} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 3 }} key={index} className="text-decoration-none">
          <Card className="mb-3">
            <Card.Body className="p-0">
              <div className="member-banner" style={{backgroundImage: `url("https://mcskri.pt${user.Banner.File.Location}${user.Banner.File.Name}.${user.Banner.File.Type}")`}} />
              <div className="rect-img-container member-avatar">
                <img className="rect-img" src={`https://mcskri.pt${user.Avatar.File.Location}${user.Avatar.File.Name}.${user.Avatar.File.Type}`} />
              </div>
              <p className="mt-3 h5 text-center">{user.DisplayName}</p>
              Stats
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default MemberView;