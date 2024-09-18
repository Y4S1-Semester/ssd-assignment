import React, { useEffect, useState } from "react";
import { sanitizeHTML, sanitizeURL } from "../utils/sanitize";
import {fetchPostsByCategory} from "../service/post.service";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await fetchPostsByCategory(cat);
        setPosts(fetchedPosts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData().then(r => console.log("Data fetched successfully!"));
  }, [cat]);

  return (
      <div className="menu">
        <h1>Other posts you may like 😉</h1>
        {posts.map((post) => (
            <div className="post" key={post.id}>
              <img src={sanitizeURL(`../upload/${post.img}`)} alt={sanitizeHTML(post.title)} />
              <h2>{sanitizeHTML(post.title)}</h2>
              <button>Read More</button>
            </div>
        ))}
      </div>
  );
};

export default Menu;
