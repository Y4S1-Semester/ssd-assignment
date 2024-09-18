import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { sanitizeHTML, getTextFromHTML, sanitizeURL } from "../utils/sanitize";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData().then(r => console.log("Data fetched successfully!"));
  }, [cat]);

  return (
      <div className="home">
        <div className="posts">
          {posts.map((post) => (
              <div className="post" key={post.id}>
                <div className="img">
                  <img src={sanitizeURL(`../upload/${post.img}`)} alt={sanitizeHTML(post.title)} />
                </div>
                <div className="content">
                  <Link className="link" to={`/post/${post.id}`}>
                    <h1>{sanitizeHTML(post.title)}</h1>
                  </Link>
                  <p>{getTextFromHTML(post.desc)}</p>
                  <Link to={`/post/${post.id}`}>
                    <button>Read More</button>
                  </Link>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default Home;
