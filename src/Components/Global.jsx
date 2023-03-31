import { createContext, useEffect, useState } from 'react';

export const Global = createContext();

export const GlobalProvider = ({ children }) => {
  const [route, setRoute] = useState('home');
  const [logged, setLogged] = useState(null);
  const [authName, setAuthName] = useState(null);
  const [authRole, setAuthRole] = useState(null);
  const [stories, setStories] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [project, setProject] = useState(null);
  const [deleteStory, setDeleteStory] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [transfers, setTransfers] = useState(null);

  // server
  const URL = 'http://localhost:3000/api/stories';

  // Check if logged on page load in next.js
  useEffect(() => {
    const fetchAuth = async () => {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();

      console.log(data);

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
    /* fetch('http://localhost:3000/api/login', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setAuthRole(data.role);
          setLogged(true);
          setAuthName(data.name);
        } else {
          setLogged(false);
          setAuthName(null);
          setRoute('login');
        }
      }); */
  }, []);

  // -------------GET Stories (Home.jsx)----------
  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        setStories(data);
      });
  }, [lastUpdate]);

  // -------------CREATE new story (NewProjects.jsx)---------
  useEffect(() => {
    if (null === project) {
      return;
    }
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setLastUpdate(Date.now());
      });
  }, [project]);

  // ---------------PUT donor list NewProject.jsx-----------
  useEffect(() => {
    if (null === transfers) {
      return;
    }
    fetch(URL + '/transfer/' + transfers.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transfers),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setLastUpdate(Date.now());
      });
  }, [transfers]);
  // ---------------PUT confirm AdminDash.jsx-----------
  useEffect(() => {
    if (null === confirm) {
      return;
    }
    fetch(URL + '/confirm/' + confirm.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(confirm),
    })
      .then(res => res.json())
      .then(data => {
        setLastUpdate(Date.now());
      });
  }, [confirm]);

  //-----------DELETE from AdminDash.jsx-----------
  useEffect(() => {
    if (null === deleteStory) {
      return;
    }
    fetch(URL + '/' + deleteStory.id, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        setLastUpdate(Date.now());
      });
  }, [deleteStory]);

  //LOGOUT
  const logOut = () => {
    fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setRoute('login');
        setLogged(false);
        setAuthName(false);
        setRoute('home');
        setAuthRole(null);
      });

    /*  axios
      .post('http://localhost:3000/api/logout', {}, { withCredentials: true })
      .then(res => {
        setRoute('login');
        setLogged(false);
        setAuthName(false);
        setRoute('home');
        setAuthRole(null);
      }); */
  };

  return (
    <Global.Provider
      value={{
        confirm,
        setConfirm,
        authRole,
        setAuthRole,
        project,
        setProject,
        stories,
        setStories,
        lastUpdate,
        setLastUpdate,
        deleteStory,
        setDeleteStory,
        transfers,
        setTransfers,
        //route
        route,
        setRoute,
        // auth
        authName,
        setAuthName,
        logOut,
        logged,
        setLogged,
      }}>
      {children}
    </Global.Provider>
  );
};
