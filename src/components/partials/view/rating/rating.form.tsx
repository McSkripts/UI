import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import { ThreeDots } from 'react-loading-icons';
import axios from "axios";

import { useAuth } from "../../../../methods/auth";

import IProduct from '../../../../interfaces/product.interface';
import IRating from '../../../../interfaces/rating.interface';

function RatingForm(args : { Product : IProduct, Ratings : IRating[] | undefined, setRatings : React.Dispatch<React.SetStateAction<IRating[] | undefined>> }) {
  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);
  
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

    axios.post(`https://b01api.mcskri.pt/product/${args.Product.Id}/ratings`, formData, {
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then((res) => {
      setRatingLoading(false);

      setRating(0);
      setRatingComment("");
      setRatingError("");

      let tempArr = args.Ratings?.slice(); 
      tempArr?.unshift(res.data);
      args.setRatings(tempArr);
    }).catch(err => {
      setRatingLoading(false)
      
      setRatingError(err.response.data);
    });
  }

  return (
  <>
    {ratingError && 
    <Alert variant="danger" onClose={() => setRatingError("")} dismissible>
      {ratingError}
    </Alert>}
    {tokenObj.Token ? 
      (args.Product.Price.Amount == 0 || (args.Product.Price.Amount > 0 && args.Product.Transaction?.Status == 'complete') ? 
        <form onSubmit={handleRatingSubmit}>
          <Form.Group className="mb-3">
            <Rating onClick={(r)=>setRating(r)} allowHalfIcon={true} ratingValue={rating} fullIcon={<i className="fa-solid fa-star"></i>} emptyIcon={<i className="fa-regular fa-star"></i>} className="h2" emptyColor="var(--bs-gray-dark)" fillColor="var(--bs-gray-dark)" readonly={!args.Ratings || ratingLoading} />
            <Form.Control value={ratingComment} onChange={ e => setRatingComment(e.target.value) } as="textarea" rows={3} required disabled={!args.Ratings || ratingLoading} />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!args.Ratings || ratingLoading}>
            {ratingLoading ? <ThreeDots fill="#fff" width="2rem" /> : 'Submit'}
          </Button>
        </form> 
      : <p className="text-center mt-3">You need to purchase this product before you can write a review</p>) 
    : <p className="text-center mt-3">You need to be signed in to write a review</p>}
  </>
  )
}

export default RatingForm;