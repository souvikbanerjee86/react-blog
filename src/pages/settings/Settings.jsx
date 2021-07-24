import React, { useContext, useState } from "react";
import axios from "axios";
import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
const Settings = () => {
  const { user } = useContext(Context);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState(user?.password);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.put(`/users/${user._id}`, {
        email,
        username,
        password,
        userId: user._id,
      });
      if (response.data) {
        setSuccess("Profile Updated Successfully ....");
      }
    } catch (e) {
      setError("Some Error Occured, please try again");
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {user?.profilePicture && <img src={user.profilePicture} alt="" />}

            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={username}
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={email}
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder={password}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>

          {success && (
            <span style={{ color: "green", marginTop: "10px" }}>{success}</span>
          )}
          {error && (
            <span style={{ color: "red", marginTop: "10px" }}>{error}</span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
