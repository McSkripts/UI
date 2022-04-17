import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { ThreeDots } from 'react-loading-icons';
import axios from "axios";

import { useAuth } from "../../../../methods/auth";

import IRating from '../../../../interfaces/rating.interface';
import IRatingReply from '../../../../interfaces/rating.reply.interface';

function RatingReplyForm(args : { Rating: IRating, Replies : IRatingReply[] | undefined, setReplies : React.Dispatch<React.SetStateAction<IRatingReply[] | undefined>>, setVisibility: React.Dispatch<React.SetStateAction<boolean>> }) {
  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);

  let navigate = useNavigate();
  let location = useLocation();

  const [replyText, setReplyText] = useState("");
  const [replyError, setReplyError] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const handleRatingSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!tokenObj.Token)
      return navigate('/signin', {
        replace: true,
        state: {
          from: location
        }
      });
    
    setReplyLoading(true);

    let formData = new FormData(event.currentTarget);

    formData.append('reply', replyText);

    axios.post(`http://localhost/rating/${args.Rating.Id}/replies`, formData, {
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then((res) => {
      args.setVisibility(false);

      let tempArr = args.Replies ? args.Replies.slice() : []; 
      tempArr?.unshift(res.data);
      args.setReplies(tempArr);
    }).catch(err => {
      setReplyLoading(false)
      
      setReplyError(err.response.data);
    });
  }

  return (
    <blockquote className="blockquote mt-2 mb-0">
      <form onSubmit={handleRatingSubmit}>
        <Form.Group className="mb-2">
          <Form.Control value={replyText} onChange={ e => setReplyText(e.target.value) } as="textarea" rows={2} required disabled={replyLoading} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={replyLoading}>
          {replyLoading ? <ThreeDots fill="#fff" width="2rem" /> : 'Reply'}
        </Button>
      </form>
    </blockquote>
  )
}

export default RatingReplyForm;