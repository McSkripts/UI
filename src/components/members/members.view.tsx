import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

import Members from '../partials/members/members.view';

function MembersView() {
  const [members, setMembers] = useState({});
  useEffect(() => {
    document.title = 'McSkripts - 1000 forskellige scripts';

    axios.get('http://localhost/users').then((res) => {
      setMembers(res.data);
    });
  }, []);
  
  return (
    <Container className="mt-3">
      <Members {...members} />
    </Container>
  );
}

export default MembersView;
