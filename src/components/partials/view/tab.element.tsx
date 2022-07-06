import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Tabs, Tab, Form, Button, Alert, Badge } from 'react-bootstrap';
import reactStringReplace from 'react-string-replace';
import FileDownload from "js-file-download";
import axios from "axios";
import Loading from '../loading.element';

import RatingElement from './rating/rating.element';
import RatingForm from './rating/rating.form';

import { useAuth } from "../../../methods/auth";

import IProduct from '../../../interfaces/product.interface';
import IChangelog from '../../../interfaces/changelog.interface';
import IRating from '../../../interfaces/rating.interface';

function TabElement(args : { Product: IProduct }) {
  let auth = useAuth();
  let tokenObj = JSON.parse(auth.token);

  const [key, setKey] = useState<any>('overview');
  
  const [changelogs, setChangelogs] = useState<IChangelog[] | undefined>(undefined);
  const [ratings, setRatings] = useState<IRating[] | undefined>(undefined);
  const [discussionLoaded, setDiscussionLoaded] = useState<boolean>(false);
  useEffect(() => {
    switch(key) { 
      case 'changelogs': { 
        if(!changelogs){
          axios.get(`https://b01api.mcskri.pt/product/${args.Product.Id}/changelogs`, tokenObj.Token ? {
            headers: {
              Authorization: `Bearer ${tokenObj.Token}` 
            }
          } : undefined).then((res) => {
            setChangelogs(res.data.Changelogs);
          });
        }
        break; 
      }
      case 'ratings': { 
        if(!ratings){
          axios.get(`https://b01api.mcskri.pt/product/${args.Product.Id}/ratings`, tokenObj.Token ? {
            headers: {
              Authorization: `Bearer ${tokenObj.Token}` 
            }
          } : undefined).then((res) => {
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

  const downloadProduct = () => {
    axios({
      url: `https://b01api.mcskri.pt/product/${args.Product.Id}/download`,
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${tokenObj.Token}` 
      }
    }).then((response) => {
      FileDownload(
        response.data,
        `[${args.Product.Version.Number} ${args.Product.Version.Release}] ${args.Product.Id}--${args.Product.Title.replace(/ /g, '-').replace(/[^a-zA-Z0-9-_]/g, '')}.zip`
      );
    });
  }

  /*const addRatingReply = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, rating: IRating) => {
    if(!tokenObj.Token)
      return navigate('/signin', {
        replace: true,
        state: {
          from: location
        }
      });
    
    const ratingElement = event.currentTarget.parentElement?.parentElement;
    if(ratingElement?.lastElementChild?.nodeName == "BLOCKQUOTE")
      ratingElement?.lastElementChild.remove();
    else{
      let replyElement = document.createElement("blockquote");
      replyElement.className = "blockquote mt-2";

      let replyForm = document.createElement("form");

      let replyTextArea = document.createElement("textarea");
      replyTextArea.className = "form-control mb-1";
      replyTextArea.required = true;

      let replyButton = document.createElement("button");
      replyButton.className = "btn btn-primary";
      replyButton.innerHTML = "Reply";

      replyForm.onsubmit = (event) => {
        event.preventDefault();
        replyTextArea.disabled = true;
        replyButton.disabled = true;

        axios.post(`http://localhost/rating/${rating.Id}/replies`, {
          reply: replyTextArea.value
        }, {
          headers: {
            Authorization: `Bearer ${tokenObj.Token}` 
          }
        }).then(res => {
          console.log(res.data);
        }).catch(err => {
          console.log(err.response.data);
        });

        setTimeout(() => ratingElement?.lastElementChild?.remove(), 2000);
      }
      replyElement.append(replyForm);
      replyForm.append(replyTextArea);
      replyForm.append(replyButton);

      ratingElement?.append(replyElement);
    }
  }*/

  let desc;

  // Basic formatting
  desc = reactStringReplace(args.Product.Description, /\[b\](.+?)\[\/b\]/g, (s, i) => <b key={`b-${i}`}>{s}</b>)
  desc = reactStringReplace(desc, /\[u\](.+?)\[\/u\]/g, (s, i) => <u key={`u-${i}`}>{s}</u>)
  desc = reactStringReplace(desc, /\[i\](.+?)\[\/i\]/g, (s, i) => <i key={`i-${i}`}>{s}</i>)

  // Predefined colors
  desc = reactStringReplace(desc, /\[darkred\](.+?)\[\/darkred\]/g, (s, i) => <span style={{color: '#AA0000', fontWeight: 500}} key={`darkred-${i}`}>{s}</span>)
  desc = reactStringReplace(desc, /\[red\](.+?)\[\/red\]/g, (s, i) => <span style={{color: '#FF5555', fontWeight: 500}} key={`red-${i}`}>{s}</span>)
  desc = reactStringReplace(desc, /\[gold\](.+?)\[\/gold\]/g, (s, i) => <span style={{color: '#FFAA00', fontWeight: 500}} key={`gold-${i}`}>{s}</span>)
  desc = reactStringReplace(desc, /\[yellow\](.+?)\[\/yellow\]/g, (s, i) => <span style={{color: '#FFFF55', fontWeight: 500}} key={`yellow-${i}`}>{s}</span>)
  desc = reactStringReplace(desc, /\[darkgreen\](.+?)\[\/darkgreen\]/g, (s, i) => <span style={{color: '#00AA00', fontWeight: 500}} key={`darkgreen-${i}`}>{s}</span>)
  desc = reactStringReplace(desc, /\[green\](.+?)\[\/green\]/g, (s, i) => <span style={{color: '#55FF55', fontWeight: 500}} key={`green-${i}`}>{s}</span>)
  desc = reactStringReplace(desc, /\[aqua\](.+?)\[\/aqua\]/g, (s, i) => <span style={{color: '#55FFFF', fontWeight: 500}} key={`aqua-${i}`}>{s}</span>)
  desc = reactStringReplace(desc, /\[darkaqua\](.+?)\[\/darkaqua\]/g, (s, i) => <span style={{color: '#00AAAA', fontWeight: 500}} key={`darkaqua-${i}`}>{s}</span>)
  desc = reactStringReplace(desc, /\[darkblue\](.+?)\[\/darkblue\]/g, (s, i) => <span style={{color: '#0000AA', fontWeight: 500}} key={`darkblue-${i}`}>{s}</span>)
  desc = reactStringReplace(desc, /\[blue\](.+?)\[\/blue\]/g, (s, i) => <span style={{color: '#5555FF', fontWeight: 500}} key={`blue-${i}`}>{s}</span>)
  desc = reactStringReplace(desc, /\[lightpurple\](.+?)\[\/lightpurple\]/g, (s, i) => <span style={{color: '#FF55FF', fontWeight: 500}} key={`lightpurple-${i}`}>{s}</span>)
  desc = reactStringReplace(desc, /\[darkpurple\](.+?)\[\/darkpurple\]/g, (s, i) => <span style={{color: '#AA00AA', fontWeight: 500}} key={`darkpurple-${i}`}>{s}</span>)

  // Custom color
  desc = reactStringReplace(desc, /\[color:#(.+?)\[\/color\]/g, (s, i) => {
    let colorCode = s.replace(/\].*/g, '')
    let text = s.replace(/.*\]/g, '');
    if(!colorCode.match(/^[a-f0-9]{6}$/i))
      return s
    
    return (<span style={{color: `#${colorCode}`, fontWeight: 500}} key={`custom-${i}`}>{text}</span>)
  });

  // Videos
  desc = reactStringReplace(desc, /\[video\](.+?)\[\/video\]/g, (s, i, o) => {
    const videoURL = new URL(s);

    if(['www.youtube.com', 'youtu.be'].includes(videoURL.host)){
      let videoId = videoURL.pathname == '/watch' ? videoURL.search.replace('?v=', '') : videoURL.pathname.replace('/', '');

      return (
        <div className="youtube-box" key={`youtube-${i}-${o}`}>
          <iframe className="youtube" width="100%" src={`https://www.youtube-nocookie.com/embed/${videoId}`} frameBorder={0} allow="picture-in-picture" allowFullScreen />
        </div>
      )
    }

    return s
  });

  // Makes links
  desc = reactStringReplace(desc, /(https?:\/\/\S+)/g, (s, i, o) => {
    // Background check stuff
    return (<a key={`link-${i}-${o}`} href={s} target="_blank">{s}</a>)
  });

  // Tags other users
  desc = reactStringReplace(desc, /@(\w+)/g, (s, i) => {
    // Background check stuff
    return (<Link key={`tag-${i}`} to={`/member/${s.replace('@', '')}`}>@{s}</Link>)
  });

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-2">
      <Tab eventKey="overview" title="Overview" style={{whiteSpace: "pre-wrap"}}>
        {desc}
      </Tab>
      <Tab eventKey="changelogs" title={`Changelogs (0)`}>
        {!changelogs && <Loading className="mt-5" />}
        {changelogs?.map((changelog, index) => {
          const uploadTime = new Date(changelog.Timestamp.Upload);
          const uploadDate = (
            "0" + uploadTime.getDate()).slice(-2) + "-" + ("0"+(uploadTime.getMonth()+1)).slice(-2) + "-" + uploadTime.getFullYear() + " " + 
            ("0" + uploadTime.getHours()).slice(-2) + ":" + ("0" + uploadTime.getMinutes()).slice(-2);

          return (
            <div key={index}>
              <h5 className="mb-0">
                {changelog.Version.Release != 'stable' ? <Badge bg="danger" className="text-uppercase">{`${changelog.Version.Release} ${changelog.Version.Number}`}</Badge> : <Badge>{changelog.Version.Number}</Badge>}{' '}
                {changelog.Title || 'Initial version'}
                {changelogs.length !== index + 1 && <Button variant="success" onClick={() => downloadProduct()} className="float-right" disabled={args.Product.Price.Amount > 0 && args.Product.Transaction?.Status != 'complete'}>Download</Button>}
              </h5>
              <small>{uploadDate}</small>
              <hr className="m-0" />
              <p>{changelog.Description || 'Initial version'}</p>
            </div>
          )
        })}
      </Tab>
      <Tab eventKey="ratings" title={`Ratings (${args.Product.Meta?.Ratings.Total})`}>
        <RatingForm Ratings={ratings} setRatings={setRatings} Product={args.Product} />
        <hr />
        {!ratings && <Loading className="mt-3 mb-3" />}
        {ratings?.map((rating, index) => <RatingElement Rating={rating} key={index} />)}
        {tokenObj.Token && (args.Product.Price.Amount == 0 || args.Product.Transaction?.Status == 'complete') ? (ratings?.length == 0 && <p className="text-center">There are no comments, be the first to write one</p>) : (ratings?.length == 0 && <p className="text-center">There are no comments</p>)}
      </Tab>
      <Tab eventKey="discussion" title={`Discussion (0)`}>
        {!discussionLoaded && <Loading className="mt-5" />}
      </Tab>
    </Tabs>
  )
}

export default TabElement;