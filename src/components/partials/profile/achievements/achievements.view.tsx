import { useEffect, useState } from 'react';
import Loading from '../../loading.element';
import axios from 'axios';

import { useAuth } from "../../../../methods/auth";

function AchievementsView(){
  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);

  const [achievements, setAchievements] = useState(null);
  useEffect(() => {
    axios.get(`https://b01api.mcskri.pt/user/@me/achievements`, {
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then((res) => {
      setAchievements(res.data);
    });
  }, []);

  if(!achievements)
    return <Loading className="m-2" />;
  
  return (
    <div>
      {JSON.stringify(achievements)}
    </div>
  );
}
 
export default AchievementsView;