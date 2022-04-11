import { useEffect, useState } from 'react';
import { Row, Col, Badge, Button } from 'react-bootstrap';
import { ThreeDots } from 'react-loading-icons';
import Loading from '../../loading.element';
import axios from 'axios';

import { useAuth } from "../../../../methods/auth";

import IDailyReward from '../../../../interfaces/dailyreward.interface';

function DailyRewardsView(){
  let interval: NodeJS.Timer;

  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);

  const [dailyReward, setDailyReward] = useState<IDailyReward | null>(null);
  const [badgeText, setBadgeText] = useState<string>("You'r daily reward is ready");
  const [loading, setLoading] = useState(false);

  const startCountDown = (reward: IDailyReward) => {
    if(reward.Collected){
      let d = new Date(reward.Timestamp);
      d.setDate(d.getDate() + 1);
      interval = setInterval(() => {
        let now = new Date();
        
        let timeLeft = Math.abs(d.getTime() - now.getTime()) / 1000;
    
        const days = Math.floor(timeLeft / 86400);
        timeLeft -= days * 86400;
    
        const hours = Math.floor(timeLeft / 3600) % 24;
        timeLeft -= hours * 3600;
    
        const minutes = Math.floor(timeLeft / 60) % 60;
        timeLeft -= minutes * 60;
    
        const seconds = Math.floor(timeLeft % 60);
    
        let tempBadgeText = 'Collect next reward in ';
        if(days + 1 > 1)
          tempBadgeText += `${days + 1} days`;
        else if(hours + 1 > 1)
          tempBadgeText += `${hours + 1} hours`;
        else if(minutes + 1 > 1)
          tempBadgeText += `${minutes + 1} minutes`;
        else if(seconds + 1 > 1)
          tempBadgeText += `${seconds + 1} seconds`;
        else if(seconds == 0){
          clearInterval(interval);
          
          setTimeout(() => {
            axios.get(`http://localhost/user/@me/dailyreward`, {
              headers: {
                Authorization: `Bearer ${tokenObj.Token}` 
              }
            }).then((res) => {
              setBadgeText("You'r daily reward is ready");
              setDailyReward(res.data);
            });
          }, 1000);
        }
        
        setBadgeText(tempBadgeText);
      }, 1000);
    }
  }

  const collectReward = () => {
    if(!isCollected){
      setLoading(true);
      axios.put(`http://localhost/user/@me/dailyreward`, undefined, {
        headers: {
          Authorization: `Bearer ${tokenObj.Token}` 
        }
      }).then((res) => {
        setLoading(false);
        setDailyReward(res.data);
      
        startCountDown(res.data);
      });
    }
  }

  useEffect(() => {
    axios.get(`http://localhost/user/@me/dailyreward`, {
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then((res) => {
      setDailyReward(res.data);
      
      startCountDown(res.data);
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  if(!dailyReward)
    return <Loading className="m-2" />;

  const isCollected = dailyReward ? dailyReward.Collected : false;
  return (
    <Row className="m-0">
      <Col className="p-1" sm={{ span: 2 }}>
        <img className="img-fluid" src={`https://mcskri.pt${dailyReward.Image.File.Location}${dailyReward.Image.File.Name}.${dailyReward.Image.File.Type}`} />
      </Col>
      <Col style={{display: "flex", alignItems: "center"}} className="p-1" sm={{ span: 7 }}>
        <span>
          <b>{dailyReward.Value.toFixed(2)} {dailyReward.Currency}</b>
          <Badge className="w-100" pill bg="danger">{badgeText}</Badge>
        </span>
      </Col>
      <Col className="p-1" sm={{ span: 3 }}>
        <div className="d-grid gap-2 h-100">
          <Button variant="danger" onClick={collectReward} disabled={loading || isCollected}>{loading ? <ThreeDots fill="#fff" width="2rem" /> : 'Submit'}</Button>
        </div>
      </Col>
    </Row>
  );
}
 
export default DailyRewardsView;