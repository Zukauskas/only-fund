import { createContext, useEffect, useState } from 'react';

export const Global = createContext();

export const GlobalProvider = ({ children }) => {
  const [stories, setStories] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [project, setProject] = useState(null);
  const [deleteStory, setDeleteStory] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [transfers, setTransfers] = useState(null);

  // server
  const URL = 'http://localhost:3000/api/stories';

  // ---------------GET Projects/Stories----------
  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        setStories(data);
      });
  }, [lastUpdate]);

  // ---------------POST New Project/Story----------
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
        setLastUpdate(Date.now());
      });
  }, [project]);

  // ---------------UPDATE Donation Amount----------
  useEffect(() => {
    if (null === transfers) {
      return;
    }
    fetch(URL + '?isTransfer=true&id=' + transfers.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transfers),
    })
      .then(res => res.json())
      .then(data => {
        setLastUpdate(Date.now());
      });
  }, [transfers]);
  // ------------------UPDATE Confirm Status----------
  useEffect(() => {
    if (null === confirm) {
      return;
    }
    fetch(URL + '?confirm=true&id=' + confirm.id, {
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

  //-----------DELETE Project/Story----------
  useEffect(() => {
    if (null === deleteStory) {
      return;
    }
    fetch(URL + '?id=' + deleteStory.id, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        setLastUpdate(Date.now());
      });
  }, [deleteStory]);

  return (
    <Global.Provider
      value={{
        confirm,
        setConfirm,
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
      }}>
      {children}
    </Global.Provider>
  );
};
