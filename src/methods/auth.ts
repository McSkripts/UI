import React from 'react';
import axios from 'axios';

const AuthProviderFunc = {
  isAuthenticated: false,
  async signin(email: string, password: string) {
    return await axios.post("http://localhost/signin", {
      email: email,
      password: password
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
  signin: (email: string, password: string) => Promise<void>;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthProviderFunc, AuthContext, useAuth };