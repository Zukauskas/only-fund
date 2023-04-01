import { useContext, useEffect } from 'react';
import { Global } from './Global';
import Login from './Login';

function Auth({ children }) {
  const {
    setAuthName,
    logged,
    setLogged,
    setRoute,
    setAuthRole,
    authRole,
    route,
  } = useContext(Global);

  useEffect(() => {
    const fetchAuth = async () => {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'GET',
        credentials: 'include',
      });
      const responseText = await res.text();

      try {
        const data = JSON.parse(responseText);
        if (data.status === 'ok') {
          setAuthRole(data.role);
          setLogged(true);
          setAuthName(data.name);
        } else {
          setLogged(false);
          setAuthName(null);
          setRoute('login');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    fetchAuth();
  }, [setAuthName, setLogged, setRoute, setAuthRole, authRole, route]);

  if (logged === null) {
    return (
      <p
        style={{
          fontWeight: 'bold',
          fontSize: '2rem',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
        Loading....
      </p>
    );
  }
  if (logged === true) {
    return <>{children}</>;
  }
  if (logged === false) {
    return <Login />;
  }
}

export default Auth;
