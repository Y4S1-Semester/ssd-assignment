import React, { useContext, useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import moment from "moment";
import { AuthContext } from "../context/auth.context";
import { sanitizeHTML, getTextFromHTML, sanitizeURL } from "../utils/sanitize";
import {deletePostById, fetchPostById} from "../service/post.service";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPost = await fetchPostById(postId);
        setPost(fetchedPost);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData().then(r => console.log("Data fetched successfully!"));
  }, [postId]);

  const handleDelete = async () => {
    try {
      await deletePostById(postId);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <div className="single">
        <div className="content">
          <img src={sanitizeURL(`../upload/${post?.img}`)} alt={sanitizeHTML(post.title)} />
          <div className="user">
            {post.userImg && <img src={sanitizeURL(post.userImg)} alt={sanitizeHTML(post.username)} />}
            <div className="info">
              <span>{sanitizeHTML(post.username)}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser.username === post.username && (
                <div className="edit">
                  <Link to={`/write?edit=2`} state={post}>
                    <img src={Edit} alt="" />
                  </Link>
                  <img onClick={handleDelete} src={Delete} alt="" />
                </div>
            )}
          </div>
          <h1>{sanitizeHTML(post.title)}</h1>
          <p>{getTextFromHTML(post.desc)}</p>
        </div>
        <Menu cat={post.cat} />
      </div>
  );
};

export default Single;
