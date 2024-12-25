import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../api";
import { useNavigate } from "react-router-dom";
import "./GoogleLogin.css"; // Import the CSS file

function GoogleLogin() {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        const { email, name, profilePicture } = result.data.user;
        const token = result.data.token;
        const obj = { email, name, profilePicture, token };
        localStorage.setItem("user-info", JSON.stringify(obj));
        navigate("/dashboard");
        console.log(result.data.user);
      }
      console.log(authResult);
    } catch (error) {
      console.log(error.message);
      console.log("Error while google login", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => responseGoogle(response),
    onError: (error) => responseGoogle(error),
    flow: "auth-code",
  });

  return (
    <div className="google-login-container">
      <button className="google-login-button" onClick={googleLogin}>
        <img
          className="google-icon"
          src="https://w7.pngwing.com/pngs/989/129/png-transparent-google-logo-google-search-meng-meng-company-text-logo-thumbnail.png"
          alt="Google Logo"
        />
        Login with Google
      </button>
    </div>
  );
}

export default GoogleLogin;
