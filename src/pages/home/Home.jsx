import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
const Home = () => {
  const [posts, setPosts] = useState([]);

  const { search } = useLocation();
  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`/posts${search}`);
      setPosts(response.data);
    };
    fetchPost();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
