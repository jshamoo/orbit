import React, { useState, createContext } from 'react';
import {useHistory} from 'react-router-dom'

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const userInfo = localStorage.getItem('userInfo');
  const expiresAt = localStorage.getItem('expiresAt');

  const [authState, setAuthState] = useState({
    token: null,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {}
  });
  
  const setAuthInfo = ({token, expiresAt, userInfo}) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    localStorage.setItem('expiresAt', expiresAt)

    setAuthState({
      token,
      expiresAt,
      userInfo
    });
  }

  const logout = () => {
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('userInfo');

    setAuthState({
      token: null,
      expiresAt: null,
      userInfo: {}
    });

    history.push('/login')
  }

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < authState.expiresAt;
  }

  const isAdmin = () => {
    return authState.userInfo.role === 'admin';
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        isAuthenticated,
        isAdmin,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
