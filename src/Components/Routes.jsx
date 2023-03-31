import { useContext } from 'react';
import Home from './Home';
import { Global } from './Global';
import Login from './Login';
import Register from './Register';
import NewProjects from './NewProjects';
import AdminDashboard from './AdminDashboard';
import Auth from './Auth';

function Routes() {
  const { route } = useContext(Global);

  switch (route) {
    case 'login':
      return <Login />;
    case 'register':
      return <Register />;

    case 'projects':
      return (
        <Auth>
          <NewProjects />
        </Auth>
      );
    case 'dashboard':
      return (
        <Auth>
          <AdminDashboard />
        </Auth>
      );
    case 'home':
      return <Home />;
    default:
      return null;
  }
}
export default Routes;
