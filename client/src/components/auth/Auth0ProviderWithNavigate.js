import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();
  const domain="dev-wckou6gjlgdqjec1.us.auth0.com"
  const clientId="2C9AQypAkKfxLPi2sE5cTTKCvdHK1LJj"
  const audience = "LvShYXkd6s27PgeorbWtSJpkQt5LtkESMS96D08nyAQAU8iDuefM6BkxnTYXHoat";

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
