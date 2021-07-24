import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../context/Context";
import "./register.css";
import axios from "axios";

export default function Register() {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const { user } = useContext(Context);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    setError(false);
    e.preventDefault();
    try {
      const response = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      if (response.data) history.push("/login");
    } catch (e) {
      setError(true);
    }
  };
  if (user) {
    return <div></div>;
  }
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          value={username}
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          value={email}
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          value={password}
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton">Register</button>
      </form>
      <button className="registerLoginButton">
        <Link to="/login" className="link">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went Wrong! Try again
        </span>
      )}
    </div>
  );
}
