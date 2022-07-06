import React from 'react';
import axios from 'axios';

const AuthProviderFunc = {
  isAuthenticated: false,
  async signin(token: string, email: string, password: string) {
    return await axios.post("https://b01api.mcskri.pt/signin", {
      recaptcha_response: token,
      email: email,
      password: password
    });
  },
  async signup(token: string, firstname: string, lastname: string, displayname: string, email: string, password: string, repeatPassword: string, currency: string, language: string) {
    return await axios.post("https://b01api.mcskri.pt/signup", {
      recaptcha_response: token,
      firstname: firstname,
      lastname: lastname,
      displayname: displayname,
      email: email,
      password: password,
      repeat_password: repeatPassword,
      currency: currency,
      language: language
    });
  },
  signout(callback: VoidFunction) {
    AuthProviderFunc.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

interface AuthContextType {
  token: string;
  user: string;
  signin: (token: string, email: string, password: string) => Promise<void>;
  signup: (token: string, firstname: string, lastname: string, displayname: string, email: string, password: string, repeatPassword: string, currency: string, language: string) => Promise<void>;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthProviderFunc, AuthContext, useAuth };