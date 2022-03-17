import { Link, useLocation } from "react-router-dom";

import { Navbar, Container, Breadcrumb } from 'react-bootstrap';
import './breadcrumb.style.css';
import lang from '../../../methods/language.js';

function BreadcrumbView() {
  const location = useLocation();

  interface Url{};

  interface Paths {
    active: boolean;
    url: Array<Url>;
    path: string;
  }
  let items : Array<Paths> = [];

  let paths = location.pathname.split('/').slice(1);
  paths.forEach((p, i, arr) => {
    //@ts-ignore
    if(p != "" && isNaN(p)){
      let tempUrlArr: Array<Url> = [];

      for (let i1 = 0; i1 < i; i1++) {
        if(arr[i1] != "")
        tempUrlArr.push(arr[i1])
      }
      tempUrlArr.push(p || 'index');

      items.push({
        active: paths.length - 1 == i,
        url: tempUrlArr,
        path: p
      });
    }
  });

  items.unshift({
    active: items.length == 0,
    url: [''],
    path: ''
  });

  return (
    <Navbar className="breadcrumb-navbar" bg="dark">
      <Container>
        <Breadcrumb>
          {items.map(({active, url, path}, index) => (
            
            <li className={active ? "breadcrumb-item active" : "breadcrumb-item"} key={index}>
              {active ? path || 'index' : <Link to={'/' + url.join('/')}>{path || 'index'}</Link>}
            </li>
          ))}
        </Breadcrumb>
      </Container>
    </Navbar>
  )
}

export default BreadcrumbView;

// {active ? (path ? lang.breadcrumb[path].default : lang.breadcrumb.index) : <Link to={'/' + langArr.join('/')}>{langArr[0] ? lang.breadcrumb[langArr[0].toString()].default : lang.breadcrumb.index}</Link>}