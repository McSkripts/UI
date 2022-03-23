import { useEffect, useState } from 'react';
import Loading from '../../loading.element';
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
    return <Loading />;
  
  return (
    <div>
      {JSON.stringify(affiliates)}
    </div>
  );
}
 
export default AffiliatesView;