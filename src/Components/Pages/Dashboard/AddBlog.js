import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const AddBlog = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [blogContent, setBlogContent] = useState(EditorState.createEmpty());
  const [blogData, setBlogData] = useState({
    title: "",
    titleError: false,
    desc: "",
  });
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile((prevState) => [...event.dataTransfer.files]);
  };

  const handleChange = (e) => {
    if (e.target.value.length > 49) {
      setBlogData({
        ...blogData,
        titleError: true,
      });
    } else {
      setBlogData({
        ...blogData,
        [e.target.name]: e.target.value,
        titleError: false,
      });
    }
  };

  const handleContent = (e) => {
    setBlogContent(e);
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text/plain");
    if (text.length > 100) {
      e.preventDefault();
    }
  };

  const handleApi = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_URL}addblogs`;
    let formdata = new FormData();
    formdata.append("image", file[0]);
    formdata.append("title", blogData.title);
    formdata.append(
      "description",
      draftToHtml(convertToRaw(blogContent.getCurrentContent()))
    );
    formdata.append("likes", null);
    formdata.append("view", null);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios
      .post(url, formdata, config)
      .then((response) => {
        if (response.status === 200) {
          navigate("/blog");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setBlogData({ title: "", desc: "", img: "" });
  };
  // console.log(draftToHtml(convertToRaw(blogContent.getCurrentContent())));

  return (
    <div className="container py-5 px-md-5" style={{ minHeight: "100vh" }}>
      <div className="row">
        <form>
          <div className="row row_gap_5">
            <div className="col-12 ">
              <label>Blog Title</label>
              <div className="form-group">
                <input
                  type="text"
                  value={blogData.title}
                  name="title"
                  onChange={handleChange}
                  className="field"
                  placeholder="Product Name"
                  maxLength={"50"}
                  minLength={"3"}
                  required
                />
                {blogData.titleError && (
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    {
                      "Name should be 3-50 characters and shouldn't include any special character or number!"
                    }
                  </p>
                )}
              </div>
            </div>
            {/* <div className="col-12 ">
              <label>Image</label>
              <div className="form-group">
                <input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  className="field"
                  placeholder="Product imge"
                />
              </div>
            </div> */}

            <div className="col-12 mb-3">
              <label>Blog Description</label>
              {/* <div className="form-group">
                <textarea
                  className="field"
                  value={blogData.desc}
                  onChange={handleChange}
                  name="desc"
                  placeholder="Description here"
                  required
                  rows={11}
                ></textarea>
              </div> */}
              <div className="border border-2 border-dark">
                <Editor
                  editorStyle={{
                    background: "white",
                    padding: "15px",
                    minHeight: "30vh",
                    color: "black",
                  }}
                  editorState={blogContent}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={handleContent}
                  onPaste={handlePaste}
                  placeholder="Please enter description"
                />
              </div>
            </div>
            <div className="col-12 col-md-12">
              <label>Upload Photos</label>
              <div className="row">
                {Array.from(file).map((items) => {
                  return (
                    <span>
                      <img
                        src={items ? URL.createObjectURL(items) : null}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          padding: "15px",
                        }}
                      />
                    </span>
                  );
                })}
              </div>
              <div
                className="dropzone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <h3>Drag and Drop Files to Upload</h3>
                <h3>Or</h3>
                <input
                  onChange={(e) => {
                    return setFile((prevState) => [...e.target.files]);
                  }}
                  name="file"
                  type="file"
                  accept="image/gif, image/jpeg, image/png, image/jpg"
                  ref={inputRef}
                  required
                  hidden
                />
                <button
                  className="orange_btn"
                  type="button"
                  onClick={() => inputRef.current.click()}
                >
                  Select Files
                </button>
              </div>
            </div>
          </div>
          <div className="form-group text-center my-4 mt-5">
            <button onClick={handleApi} className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
