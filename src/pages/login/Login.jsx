import "./login.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useHistory } from "react-router";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { dispatch, isFetching, isError, user } = useContext(Context);
  const history = useHistory();
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGIN_START" });
      const response = await axios.post("/auth/login", { username, password });
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      history.push("/");
    } catch (e) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError("Some Error Occured! Please Try again");
    }
  };
  if (user) {
    return <div></div>;
  }
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          value={username}
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          value={password}
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          {isFetching ? "Loading...." : "Login"}
        </button>
        {isError ? (
          <span style={{ color: "red", marginTop: "10px" }}>{error}</span>
        ) : (
          ""
        )}
      </form>
      <button className="loginRegisterButton">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
}
