import { useEffect, useState } from 'react';
import { Puff } from 'react-loading-icons';
import axios from 'axios';

import { useAuth } from "../../../../methods/auth";

function AchievementsView(){
  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);

  const [achievements, setAchievements] = useState(null);
  useEffect(() => {
    /*axios.get(`http://localhost/user/@me/achievements`, {
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then((res) => {
      //setAchievements(res.data);
    });*/
  }, []);

  if(!achievements)
    return (
      <div className="text-center">
        <Puff stroke="#000" height="2rem" width="2rem" /><br />
        Loading . . .
      </div>
    );
  
  return (
    <div>
      {JSON.stringify(achievements)}
    </div>
  );
}
 
export default AchievementsView;