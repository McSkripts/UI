
import { Link } from "react-router-dom";

import IRatingRepliy from "../../../../interfaces/rating.reply.interface";

function RatingReplyElement(args : { Reply : IRatingRepliy }) {
  const uploadDate = new Date(args.Reply.Timestamp.Upload);
  const uploadTime = (
    "0" + uploadDate.getDate()).slice(-2) + "-" + ("0"+(uploadDate.getMonth()+1)).slice(-2) + "-" + uploadDate.getFullYear() + " " + 
    ("0" + uploadDate.getHours()).slice(-2) + ":" + ("0" + uploadDate.getMinutes()).slice(-2);

  return (
    <blockquote className="blockquote mt-2 mb-0">
      <p className="overflow-hidden">
        {args.Reply.Reply}
      </p>
      <footer className="blockquote-footer comment-footer">
        Skrevet af:{' '}
        <Link className="text-decoration-none" to={`/member/${args.Reply.User?.Id}`}>
          <cite className="bold">{args.Reply.User?.DisplayName}</cite>
        </Link> den {' '}
        <cite className="bold">{uploadTime}</cite>
      </footer>
    </blockquote>
  )
}

export default RatingReplyElement;