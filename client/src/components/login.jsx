import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

function Login() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=5fedd1a79b974668a0f3e998d458d84b&redirect_uri=http://localhost:3000&response_type=code&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

  const [accessToken, setAccessToken] = useState();
  const [refresh_token, setRefreshToken] = useState();
  const authCode = window.location.search.substring(6);

  useEffect(() => {
    // let auth = window.localStorage.getItem("auth");
    // if (!auth && assessAuth) {
    //   auth = assessAuth;
    //   window.localStorage.setItem("auth", auth);
    //   setAuth(auth);
    // }
   getToken();
  }, [authCode]);

  const logout = () => {
    setAccessToken();
    window.localStorage.removeItem("token");
  };

  const getToken = () => {
    axios.post("/login", { authCode }).then((res) => {
      setAccessToken(res.data.access_token);
      window.localStorage.setItem("token", res.data.access_token);
      setRefreshToken(res.data.refresh_token);
    });
  };

  return (
    <div>
      { accessToken ? (
        <Button variant="secondary" size="lg" onClick={logout}>
          Log out
        </Button>
      ) : (
        <Button variant="secondary" size="lg">
          <a style={{ textDecoration: "none", color: "white" }} href={authUrl}>
            Login
          </a>
        </Button>
      )}
    </div>
  );
}

export default Login;
