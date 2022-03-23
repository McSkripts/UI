import { useEffect, useState } from 'react';
import Loading from '../../loading.element';
import axios from 'axios';

import { useAuth } from "../../../../methods/auth";

function DailyRewardsView(){
  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);

  const [dailyReward, setDailyReward] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost/user/@me/dailyreward`, {
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then((res) => {
      setDailyReward(res.data);
    });
  }, []);

  if(!dailyReward)
    return <Loading />;
  
  return (
    <div>
      {JSON.stringify(dailyReward)}
    </div>
  );
}
 
export default DailyRewardsView;