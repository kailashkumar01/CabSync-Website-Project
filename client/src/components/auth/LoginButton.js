import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/authenticate");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <button
      onClick={() => loginWithRedirect({ authorizationParams: { prompt: "select_account" } })}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Log In"}
    </button>
  );
};

export default LoginButton;
