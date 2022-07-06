import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import axios from "axios";

import RatingReplyForm from './reply.form';
import RatingReplyElement from './reply.element';

import { useAuth } from "../../../../methods/auth";

import IRating from '../../../../interfaces/rating.interface';
import IRatingReply from '../../../../interfaces/rating.reply.interface';

function RatingElement(args : { Rating : IRating }) {
  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);

  const [ratingReplyFormVisible, setRatingReplyFormVisible] = useState<boolean>(false);
  const [ratingReplies, setRatingReplies] = useState<IRatingReply[] | undefined>(undefined);
  useEffect(() => {
    if(args.Rating.HasReplies){
      axios.get(`https://b01api.mcskri.pt/rating/${args.Rating.Id}/replies`, tokenObj.Token ? {
        headers: {
          Authorization: `Bearer ${tokenObj.Token}` 
        }
      } : undefined).then((res) => {
        setRatingReplies(res.data.Replies);
      });
    }
  }, []);

  const uploadDate = new Date(args.Rating.Timestamp.Upload);
  const uploadTime = (
    "0" + uploadDate.getDate()).slice(-2) + "-" + ("0"+(uploadDate.getMonth()+1)).slice(-2) + "-" + uploadDate.getFullYear() + " " + 
    ("0" + uploadDate.getHours()).slice(-2) + ":" + ("0" + uploadDate.getMinutes()).slice(-2);

  return (
    <blockquote className="blockquote">
      <span className="float-right h6">
        {[...Array(5)].map((x, i) => 
          <span key={i}>
            <i className={args.Rating.Rating > i ? (args.Rating.Rating > i + 0.50 ? 'fa-solid fa-star' : 'fa-regular fa-star-half-stroke') : 'fa-regular fa-star'}></i>{' '}
          </span>
        )}
      </span>
      <p className="overflow-hidden">
        {args.Rating.Comment}
      </p>
      <footer className="blockquote-footer comment-footer">
        Skrevet af:{' '}
        <Link className="text-decoration-none" to={`/member/${args.Rating.User?.Id}`}>
          <cite className="bold">{args.Rating.User?.DisplayName}</cite>
        </Link> den {' '}
        <cite className="bold">{uploadTime}</cite>
      </footer>
      <div className="comment-manage">
        <Button variant="link" onClick={(e) => setRatingReplyFormVisible(!ratingReplyFormVisible)}><i className="fa-solid fa-reply"></i> Reply</Button>
        {/*<Button variant="link"><i className="fa-solid fa-pencil"></i> Edit</Button>
        <Button variant="link"><i className="fa-solid fa-trash-can"></i> Delete</Button>*/}
      </div>
      {ratingReplyFormVisible && <RatingReplyForm Rating={args.Rating} Replies={ratingReplies} setReplies={setRatingReplies} setVisibility={setRatingReplyFormVisible} />}
      {ratingReplies?.map((reply, index) => <RatingReplyElement Reply={reply} key={index} />)}
    </blockquote>
  )
}

export default RatingElement;