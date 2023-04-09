import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(null);
  const [authName, setAuthName] = useState(null);
  const [authRole, setAuthRole] = useState(null);
  const router = useRouter();

  // Check if logged on page load in next.js
  useEffect(() => {
    const fetchAuth = async () => {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setAuthRole(data.role);
        setLogged(true);
        setAuthName(data.name);
        router.push('/');
      } else {
        setLogged(false);
        setAuthName(null);
        router.push('/login');
      }
    };
    fetchAuth();
  }, []);

  //LOGOUT
  const logOut = () => {
    fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setLogged(false);
        setAuthName(false);
        setAuthRole(null);
        router.push('/');
      });
  };

  return (
    <AuthContext.Provider
      value={{
        logged,
        setLogged,
        logOut,
        authName,
        setAuthName,
        authRole,
        setAuthRole,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
