import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

import Members from '../partials/members/members.view';

import IUser from '../../interfaces/user.interface';

interface IMembers {
  Meta?: Array<{}>;
  Users?: Array<IUser>;
}

function MembersView() {
  const [members, setMembers] = useState<IMembers>({});
  useEffect(() => {
    document.title = 'McSkripts - 1000 forskellige scripts';

    axios.get('https://b01api.mcskri.pt/users').then((res) => {
      setMembers(res.data);
    });
  }, []);
  
  return (
    <Container className="mt-3">
      <Members Users={members.Users} />
    </Container>
  );
}

export default MembersView;
