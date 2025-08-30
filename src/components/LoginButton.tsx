import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const LoginButton = () => {
  const { loginWithRedirect, getIdTokenClaims, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect(); // takes user to Auth0 login page
  };

  const sendTokenToBackend = async () => {
    try {
      const claims = await getIdTokenClaims();
      const idToken = claims?.__raw;
      console.log(idToken);
      

      if (!idToken) {
        console.error("No ID token found");
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/auth/google-login`,
        { idToken },
        { withCredentials: true } // important so cookies are stored
      );
      console.log(response.data);
      
      console.log("Sent ID token to backend!");
    } catch (err) {
      console.error("Error sending token:", err);
    }
  };

  // If already logged in, send token to backend
  if (isAuthenticated) {
    sendTokenToBackend();
  }

  return <button onClick={handleLogin}>Log In with Google</button>;
};

export default LoginButton;
