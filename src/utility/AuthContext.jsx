import React, { createContext, useState, useEffect } from 'react';
import api, { authapi } from './api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [finished, setFinished] = useState(false);
  const [reloadUser, setReloadUser] = useState(0);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setFinished(false);
    const fetchUser = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        try {
          const response = await authapi.get(`account/lists/${userId}/`);
          setUser(response.data);
          setFinished(true);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          setFinished(true);
          window.location.href = '/account/login';
        }
      }else{
        setFinished(true);
      }
    };
    fetchUser();
  }, [reloadUser]);

  //login
  const login = async (credentials) => {
    try {
      const response = await api.post('account/login/', credentials);
      if(response.data.error){
        return 'error'
      }
      const { token, user_id } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id);
      const userResponse = await api.get(`account/lists/${user_id}/`);
      setUser(userResponse.data);
      return 'success'
    } catch (error) {
      return 'error'
    }
  };

  //logout
  const logout = async () => {
    await authapi.post('account/logout/');
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setUser(null);
    window.location.href = '/account/login';
  };

  return (
    <AuthContext.Provider value={{ user, logout,login,setReloadUser,reloadUser,finished }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
