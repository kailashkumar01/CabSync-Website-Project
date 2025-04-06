import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const LoginPage = () => {
  const { loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    const createProfile = async () => {
      try {
        await axios.post('YOUR_API_ENDPOINT_HERE', {
          name: user.name,
          email: user.email,
        });
        // Handle success or any additional logic here
      } catch (error) {
        // Handle error here
        console.error('Error creating profile:', error);
      }
    };

    if (user) {
      createProfile();
    }
  }, [user]);

  useEffect(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  return null;
};

export default LoginPage;
