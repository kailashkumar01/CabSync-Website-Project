import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  React.useEffect(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  return null;
};

export default LoginPage;
