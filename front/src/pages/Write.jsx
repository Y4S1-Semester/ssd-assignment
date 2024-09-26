import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { createPost, updatePost, uploadImage } from "../service/post.service";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [errors, setErrors] = useState({}); // For validation errors

  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    const newErrors = {};
    
    // Validate title
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 3 || title.length > 255) {
      newErrors.title = "Title must be between 3 and 255 characters";
    }

    // Validate description (using the value state for the description body)
    if (!value.trim()) {
      newErrors.desc = "Description is required";
    } else if (value.length < 10) {
      newErrors.desc = "Description must be at least 10 characters long";
    }

    // Validate category
    if (!cat.trim()) {
      newErrors.cat = "Category is required";
    }

    // Validate image file (optional validation)
    if (file && !/\.(jpeg|jpg|png|gif)$/i.test(file.name)) {
      newErrors.img = "Only image files (jpeg, jpg, png, gif) are allowed";
    }

    return newErrors;
  };

  // Handle the click for uploading and submitting
  const handleClick = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let imgUrl = "";

    try {
      // Upload the image if available
      if (file) {
        imgUrl = await uploadImage(file);
      }

      const postData = {
        title,
        desc: value,
        cat,
        img: imgUrl,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      };

      if (state) {
        // If editing a post, update it
        await updatePost(state.id, postData);
      } else {
        // If creating a new post, create it
        await createPost(postData);
      }

      // Redirect back to the home page after success
      navigate("/");
    } catch (err) {
      console.error("Error handling post:", err);
      alert("Failed to publish the post.");
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="error">{errors.title}</p>} {/* Title validation message */}
        
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
          {errors.desc && <p className="error">{errors.desc}</p>} {/* Description validation message */}
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          {errors.img && <p className="error">{errors.img}</p>} {/* Image validation message */}
          
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>

        <div className="item">
          <h1>Category</h1>

          {["art", "science", "technology", "cinema", "design", "food"].map((category) => (
            <div className="cat" key={category}>
              <input
                type="radio"
                checked={cat === category}
                name="cat"
                value={category}
                id={category}
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
            </div>
          ))}
          {errors.cat && <p className="error">{errors.cat}</p>} {/* Category validation message */}
        </div>
      </div>
    </div>
  );
};

export default Write;
