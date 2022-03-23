import { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Puff } from 'react-loading-icons';

import IProduct from '../../../interfaces/product.interface';

function TabElement(args : { Product: IProduct }) {
  const [key, setKey] = useState<any>('overview');
  
  const [changelogLoaded, setChangelogLoaded] = useState<boolean>(false);
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
      case 'discussion': { 
        if(!discussionLoaded){
          console.log("discussions")

          setTimeout(() => setDiscussionLoaded(true), 2000);
        }
        break; 
      }
   } 
  }, [key]);

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-2">
      <Tab eventKey="overview" title="Overview">
        {args.Product.Description}
      </Tab>
      <Tab eventKey="changelogs" title="Changelogs">
        {!changelogLoaded && <div className="text-center mt-5">
          <Puff stroke="#000" height="4rem" width="4rem" /><br />
          Loading . . .
        </div>}
      </Tab>
      <Tab eventKey="discussion" title="Discussion">
        {!discussionLoaded && <div className="text-center mt-5">
          <Puff stroke="#000" height="4rem" width="4rem" /><br />
          Loading . . .
        </div>}
      </Tab>
    </Tabs>
  )
}

export default TabElement;