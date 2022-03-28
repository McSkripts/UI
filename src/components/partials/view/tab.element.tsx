import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Rating } from 'react-simple-star-rating';
import { Tabs, Tab, Form, Button, Alert } from 'react-bootstrap';
import { ThreeDots } from 'react-loading-icons';
import axios from "axios";
import Loading from '../loading.element';

import { useAuth } from "../../../methods/auth";

import IProduct from '../../../interfaces/product.interface';
import IRating from '../../../interfaces/rating.interface';

function TabElement(args : { Product: IProduct }) {
  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);

  const [key, setKey] = useState<any>('overview');
  
  const [changelogLoaded, setChangelogLoaded] = useState<boolean>(false);
  const [ratings, setRatings] = useState<Array<IRating> | undefined>(undefined);
  const [discussionLoaded, setDiscussionLoaded] = useState<boolean>(false);
  useEffect(() => {
    switch(key) { 
      case 'changelogs': { 
        if(!changelogLoaded){
          console.log("changelogs")

          setTimeout(() => setChangelogLoaded(true), 2000);
        }
        break; 
      }
      case 'ratings': { 
        if(!ratings){
          axios.get(`http://localhost/product/${args.Product.Id}/ratings`, {
            headers: {
              Authorization: `Bearer ${tokenObj.Token}` 
            }
          }).then((res) => {
            setRatings(res.data.Ratings);
          });
        }
        break; 
      }
      case 'discussion': { 
        if(!discussionLoaded){
          console.log("discussions")

          setTimeout(() => setDiscussionLoaded(true), 2000);
        }
        break; 
      }
   } 
  }, [key]);
  
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [ratingLoading, setRatingLoading] = useState(false);
  const handleRatingSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setRatingLoading(true);

    event.preventDefault();

    let formData = new FormData(event.currentTarget);

    formData.append('rating', (rating / 20).toString());
    formData.append('comment', ratingComment);

    axios.post(`http://localhost/product/${args.Product.Id}/ratings`, formData, {
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then((res) => {
      setRatingLoading(false);

      setRating(0);
      setRatingComment("");
      setRatingError("");

      let tempArr = ratings?.slice(); 
      tempArr?.unshift(res.data);
      setRatings(tempArr);
    }).catch(err => {
      setRatingLoading(false)
      
      setRatingError(err.response.data);
    });
  }

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-2">
      <Tab eventKey="overview" title="Overview">
        {args.Product.Description}
      </Tab>
      <Tab eventKey="changelogs" title={`Changelogs (0)`}>
        {!changelogLoaded && <Loading className="mt-5" />}
      </Tab>
      <Tab eventKey="ratings" title={`Ratings (${args.Product.Meta?.Ratings.Total})`}>
        {ratingError && (<>
          <Alert variant="danger" onClose={() => setRatingError("")} dismissible>
            {ratingError}
          </Alert>
        </>)}
        <form onSubmit={handleRatingSubmit}>
          <Form.Group className="mb-3">
            <Rating onClick={(r)=>setRating(r)} allowHalfIcon={true} ratingValue={rating} fullIcon={<i className="fa-solid fa-star"></i>} emptyIcon={<i className="fa-regular fa-star"></i>} className="h2" emptyColor="var(--bs-gray-dark)" fillColor="var(--bs-gray-dark)" readonly={!ratings || ratingLoading} />
            <Form.Control value={ratingComment} onChange={ e => setRatingComment(e.target.value) } as="textarea" rows={3} required disabled={!ratings || ratingLoading} />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!ratings || ratingLoading}>
            {!ratings || ratingLoading ? <ThreeDots fill="#fff" width="2rem" /> : 'Submit'}
          </Button>
        </form>
        <hr />
        {!ratings && <Loading className="mt-3 mb-3" />}
        {ratings?.map((rating, index) => {
          const uploadDate = new Date(rating.Timestamp.Upload);
          const uploadTime = (
            "0" + uploadDate.getDate()).slice(-2) + "-" + ("0"+(uploadDate.getMonth()+1)).slice(-2) + "-" + uploadDate.getFullYear() + " " + 
            ("0" + uploadDate.getHours()).slice(-2) + ":" + ("0" + uploadDate.getMinutes()).slice(-2);

          return (
            <blockquote className="blockquote" key={index}>
              <span className="float-right h6">
                {[...Array(5)].map((x, i) => 
                  <span key={i}><i className={rating.Rating > i ? (rating.Rating > i + 0.50 ? 'fa-solid fa-star' : 'fa-regular fa-star-half-stroke') : 'fa-regular fa-star'}></i>{' '}</span>
                )}
              </span>
              <p className="overflow-hidden">
                {rating.Comment}
              </p>
              <footer className="blockquote-footer comments-footer">
                Skrevet af:{' '}
                <Link className="text-decoration-none"  to="/">
                  <cite className="bold">User</cite>
                </Link> den {' '}
                <cite className="bold">{uploadTime}</cite>
              </footer>
            </blockquote>
          )
        })}
        {ratings?.length == 0 && <p className="text-center">There are no comments, be the first to write one</p>}
      </Tab>
      <Tab eventKey="discussion" title={`Discussion (0)`}>
        {!discussionLoaded && <Loading className="mt-5" />}
      </Tab>
    </Tabs>
  )
}

export default TabElement;