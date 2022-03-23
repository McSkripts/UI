import { useEffect, useState } from 'react';
import Loading from '../../loading.element';
import axios from 'axios';

import { useAuth } from "../../../../methods/auth";

function AchievementsView(){
  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);

  const [achievements, setAchievements] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost/user/@me/achievements`, {
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then((res) => {
      setAchievements(res.data);
    });
  }, []);

  if(!achievements)
    return <Loading />;
  
  return (
    <div>
      {JSON.stringify(achievements)}
    </div>
  );
}
 
export default AchievementsView;