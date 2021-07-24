import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Context } from "../../context/Context";
import axios from "axios";
import "./write.css";
const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const { user } = useContext(Context);
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newPost = {
      title,
      desc,
      username: user.username,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      console.log(data);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (e) {}
    }
    try {
      const response = await axios.post("/posts", newPost);
      history.push(`/post/${response.data._id}`);
    } catch (e) {}
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            value={title}
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            value={desc}
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
