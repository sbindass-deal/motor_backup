import axios from "axios";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";

import { toast } from "react-toastify";
import MyAccountLeftNav from "./MyAccountLeftNav";


const EditUserBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogDataById, setBlogDataById] = useState([]);
  const [file, setFile] = useState([]);
  const [blogContent, setBlogContent] = useState(EditorState.createEmpty());
  const [blogData, setBlogData] = useState({
    title: "",
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

  const notify = (val) =>
    toast.success(val, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });


  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };
  const handleContent = (e) => {
    setBlogContent(e);
    // console.log(111, convertToRaw(blogContent.getCurrentContent()));
  };
  //   fetch blog api
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}getblogsBYId/${id}`
        );
        if (res.data.status === 200 && res.data.data) {
          setBlogData({
            title: res.data.data.title,
            desc: res.data.data.description,
          });
          setBlogDataById(res.data.data);
          setBlogContent(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(res.data.data.description)
              )
            )
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlog();
  }, []);
  const handleApi = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_URL}updateblogs/${id}`;
    let formData = new FormData();
    formData.append("image", file[0]);
    formData.append("title", blogData.title);
    formData.append(
      "description",
      draftToHtml(convertToRaw(blogContent.getCurrentContent()))
    );
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios
      .post(url, formData, config)
      .then((response) => {
        if (response.status === 200) {
          notify("Saved successfully !");
          navigate("/user-blog");
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
        <div className="col-12 col-md-4 col-lg-3">
          <div className="card_Gray mb-5 mb-md-0">
            <h5>My Account</h5>
            <hr />
            <MyAccountLeftNav />
          </div>
        </div>
        <div className="col-12 col-md-8 col-lg-9">
          <h3>Edit Blogs</h3>
          <hr />
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
                    placeholder="Enter Blog"
                    required
                  />
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
                    }}
                    editorState={blogContent}
                    value="dlsjfkljf"
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={handleContent}
                    placeholder="Please enter description"
                  />
                  {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(blogContent.getCurrentContent()))}
        ></textarea> */}
                </div>
              </div>
              <div className="col-12 col-md-12">
                <label>Upload Photos</label>
                <div className="row">
                  {blogDataById.image && file.length <= 0 && (
                    <img
                      loading="lazy"
                      width="200px"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        padding: "15px",
                      }}
                      src={
                        blogDataById?.image &&
                        `${process.env.REACT_APP_URL}upload/blogs/${blogDataById?.image}`
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onError = null;
                        currentTarget.src =
                          "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                      }}
                      alt="Maskgroup1"
                    />
                  )}
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
    </div>
  );
};

export default EditUserBlog;
