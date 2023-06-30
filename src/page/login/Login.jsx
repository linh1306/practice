import React, { useState, useEffect, useContext } from "react";
import { signInWithGoogle } from "../../firebase/login";
import { AuthContext } from "../../context/AuthContext";
import "./style.css";
import { useNavigate } from "react-router-dom";
function Login() {
  const { user, setUser } = useContext(AuthContext);
  const [status, setStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    if (user!== 0) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
    console.table('user', user);
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleClickGoogle = () => {
    signInWithGoogle();
  };
  return (
    <div className="z-0">
      <div className={status ? "containerLogin" : "containerLogin right-panel-active"}>
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <div className="social">
                <i className="fab fa-facebook-f"></i>
              </div>
              <div className="social" onClick={() => handleClickGoogle()}>
                <i className="fab fa-google-plus-g"></i>
              </div>
              <div className="social">
                <i className="fab fa-linkedin-in"></i>
              </div>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <div className="social">
                <i className="fab fa-facebook-f"></i>
              </div>
              <div className="social" onClick={() => handleClickGoogle()}>
                <i className="fab fa-google-plus-g"></i>
              </div>
              <div className="social">
                <i className="fab fa-linkedin-in"></i>
              </div>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setStatus(!status)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setStatus(!status)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
