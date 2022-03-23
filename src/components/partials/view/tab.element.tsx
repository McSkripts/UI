import { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Loading from '../loading.element';

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
        {!changelogLoaded && <div className="mt-5"><Loading /></div>}
      </Tab>
      <Tab eventKey="discussion" title="Discussion">
        {!discussionLoaded && <div className="mt-5"><Loading /></div>}
      </Tab>
    </Tabs>
  )
}

export default TabElement;