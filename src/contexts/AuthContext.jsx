import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(null);
  const [authName, setAuthName] = useState(null);
  const [authRole, setAuthRole] = useState(null);
  const [route, setRoute] = useState('home');

  // Check if logged on page load in next.js
  useEffect(() => {
    const fetchAuth = async () => {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setAuthRole(data.role);
        setLogged(true);
        setAuthName(data.name);
      } else {
        setLogged(false);
        setAuthName(null);
        setRoute('login');
      }
    };
    fetchAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        logged,
        setLogged,
        authName,
        setAuthName,
        authRole,
        setAuthRole,
        route,
        setRoute,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
