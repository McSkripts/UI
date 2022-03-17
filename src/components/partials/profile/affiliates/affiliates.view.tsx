import { useEffect, useState } from 'react';
import { Puff } from 'react-loading-icons';
import axios from 'axios';

import { useAuth } from "../../../../methods/auth";

function AffiliatesView(){
  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);

  const [affiliates, setAffiliates] = useState(null);
  useEffect(() => {
    /*axios.get(`http://localhost/user/@me/affiliates`, {
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then((res) => {
      //setAchievements(res.data);
    });*/
  }, []);

  if(!affiliates)
    return (
      <div className="text-center">
        <Puff stroke="#000" height="2rem" width="2rem" /><br />
        Loading . . .
      </div>
    );
  
  return (
    <div>
      {JSON.stringify(affiliates)}
    </div>
  );
}
 
export default AffiliatesView;