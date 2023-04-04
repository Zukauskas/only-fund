// withAuth.js
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';

const withAuth = WrappedComponent => {
  const WithAuthComponent = props => {
    const { logged } = useContext(AuthContext);
    const router = useRouter();

    if (logged === null) {
      // Loading state, you can render a loading component here
      return <div>Loading...</div>;
    }

    if (!logged) {
      // If not logged in, redirect to the login page
      router.push('/login');
      return null;
    }

    // If logged in, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${getDisplayName(
    WrappedComponent,
  )})`;

  return WithAuthComponent;
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;
