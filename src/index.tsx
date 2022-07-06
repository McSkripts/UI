import React, { useEffect, useRef } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

import './index.style.css';

import { AuthProviderFunc, AuthContext, useAuth } from "./methods/auth";

import Navbar from './components/partials/navbar/navbar.view';
import Breadcrumbs from './components/partials/breadcrumb/breadcrumb.view';
import Footer from './components/partials/footer/footer.view';

import Index from './components/index/index.view';
import SignIn from './components/signin/signin.view';
import SignUp from './components/signup/signup.view';

import SearchTypes from './components/search/types.view';
import Search from './components/search/search.view';
import View from './components/view/root.view';

import Members from './components/members/members.view';

import Profile from './components/profile/profile.view';
import Purchases from './components/profile/purchases/purchases.view';
import Products from './components/profile/products/products.view';
import NewProduct from './components/profile/products/new/root.view';
import PreviewProduct from './components/profile/products/preview.view';

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [token, setToken] = React.useState<any>(localStorage.getItem('token') || "{}");
  let [user, setUser] = React.useState<any>(localStorage.getItem('user') || "{}");

  let signin = async (token: string, email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      AuthProviderFunc.signin(token, email, password).then(tokenRes => {
        axios.get('https://b01api.mcskri.pt/user/@me', {
          headers: {
            Authorization: `Bearer ${tokenRes.data.Token}` 
          }
        }).then(userRes => {
          setToken(JSON.stringify(tokenRes.data));
          localStorage.setItem('token', JSON.stringify(tokenRes.data));

          setUser(JSON.stringify(userRes.data));
          localStorage.setItem('user', JSON.stringify(userRes.data));

          resolve();
        }).catch(err => reject(err.response.data))
      }).catch(err => reject(err.response.data));
    });
  };

  let signup = (token: string, firstname: string, lastname: string, displayname: string, email: string, password: string, repeatPassword: string, currency: string, language: string) => {
    return new Promise<void>((resolve, reject) => {
      AuthProviderFunc.signup(token, firstname, lastname, displayname, email, password, repeatPassword, currency, language).then(tokenRes => {
        axios.get('https://b01api.mcskri.pt/user/@me', {
          headers: {
            Authorization: `Bearer ${tokenRes.data.Token}` 
          }
        }).then(userRes => {
          setToken(JSON.stringify(tokenRes.data));
          localStorage.setItem('token', JSON.stringify(tokenRes.data));

          setUser(JSON.stringify(userRes.data));
          localStorage.setItem('user', JSON.stringify(userRes.data));

          resolve();
        }).catch(err => reject(err.response.data))
      }).catch(err => reject(err.response.data));
    });
  }

  let signout = (callback: VoidFunction) => {
    return AuthProviderFunc.signout(() => {
      setToken('{}');
      setUser('{}');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      callback();
    });
  };

  let value = { token, user, signin, signup, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  let tokenObj = JSON.parse(auth.token);

  if (!tokenObj.Token) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

function App(){
  const captchaKey = "6Lc9gFcaAAAAANYKT_VSjXaeo39GYHgBhtGcexz-";

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <Breadcrumbs/>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<GoogleReCaptchaProvider reCaptchaKey={captchaKey}><SignIn /></GoogleReCaptchaProvider>} />
          <Route path="/signup" element={<GoogleReCaptchaProvider reCaptchaKey={captchaKey}><SignUp /></GoogleReCaptchaProvider>} />
          
          <Route path="/search" element={<SearchTypes />} />
          <Route path="/search/:type" element={<Search />} />
          <Route path="/search/:type/:query" element={<Search />} />

          <Route path="/view/:id" element={<View />} />
          <Route path="/view/:id/:seo" element={<View />} />
          {/*<Route path="/search/:type/:page(\d+)" element={<div>TYPE/PAGE</div>} />
          <Route path="/search/:type/:query(/[a-zA-Z0-9-_]+/g)?" element={<div>TYPE/QUERY/PAGE</div>} />
          <Route path="/search/:type/:query/:page" element={<div>TYPE/QUERY/PAGE</div>} />*/}

          <Route path="/members" element={<Members />} />

          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/purchases"
            element={
              <RequireAuth>
                <Purchases />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/products"
            element={
              <RequireAuth>
                <Products />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/product/new"
            element={
              <RequireAuth>
                <NewProduct />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/product/:id"
            element={
              <RequireAuth>
                <PreviewProduct />
              </RequireAuth>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

reportWebVitals();
